import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { ChangeQuantityButtons } from "@/ui/atoms/ChangeQuantityButtons";
import { getCartFromCookies } from "@/api/cart";

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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}