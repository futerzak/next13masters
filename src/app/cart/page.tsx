import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { formatPrice } from "@/utils/formatPrice";
import { ChangeQuantityButtons } from "@/ui/atoms/ChangeQuantityButtons";
import { getCartFromCookies } from "@/api/cart";
import { RemoveButton } from "@/ui/atoms/RemoveButton";


export default async function CartPage() {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
        redirect("/");
    }

    const cart = await getCartFromCookies();

    if (!cart) {
        redirect("/");
    }

    return (
        <div>
            <h1>Order #{cart.id} summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.orderItems.map((item) => {
                        if (!item.product) {
                            return null;
                        }
                        return (
                            <tr key={item.product.id}>
                                <td>{item.product.name}</td>
                                <td><ChangeQuantityButtons itemId={item.id} quantity={item.quantity} /></td>
                                <td>{formatPrice(item.product.price)}</td>
                                <td>
                                    <RemoveButton itemId={item.id} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <form action={handleStripePaymentAction} className="ml-auto">
                <button
                    type="submit"
                    className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
                >
                    Pay
                </button>
            </form>
        </div>
    );
}

async function handleStripePaymentAction() {
    "use server";

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing STRIPE_SECRET_KEY env variable");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-08-16",
        typescript: true,
    });

    const cart = await getCartFromCookies();
    if (!cart) {
        return;
    }
    const session = await stripe.checkout.sessions.create({
        metadata: {
            cartId: cart.id,
        },
        line_items: cart.orderItems
            .filter((item) => item.product) // filter out items without product
            .map((item) => ({
                price_data: {
                    currency: "pln",
                    product_data: {
                        name: item.product!.name, // use non-null assertion operator
                        description: item.product!.description, // use non-null assertion operator
                        images: item.product!.images.map((i) => i.url), // use non-null assertion operator
                    },
                    unit_amount: item.product!.price, // use non-null assertion operator
                },
                quantity: item.quantity,
            })),
        mode: "payment",
        success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cart/canceled`,
    });
    if (session.url) {
        cookies().set("cartId", "");
        redirect(session.url);
    }
}