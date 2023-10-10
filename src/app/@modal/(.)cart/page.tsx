import NextImage from "next/image";
import { Overlay } from "@/ui/atoms/Overlay";
import { getCartFromCookies } from "@/api/cart";
import { formatPrice } from "@/utils/formatPrice";

export default async function ModalCart() {
    const cart = await getCartFromCookies();

    const totalCost = cart?.orderItems?.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

    return (
        <>
            <Overlay />
            <div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
                <div className="p-4">
                    <h2 className="text-lg font-medium mb-4">Your Cart</h2>
                    {cart && cart?.orderItems?.length > 0 ? (
                        <>
                            <ul className="divide-y divide-gray-200">
                                {cart.orderItems.map((item) => (item.product && (
                                    <li key={item.id} className="py-4 flex">
                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                            <NextImage src={item.product?.images[0].url} alt={item.product?.name} className="w-full h-full object-cover" width={96} height={96} />
                                        </div>
                                        <div className="ml-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">{item.product?.name}</h3>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">{item.quantity} x {formatPrice(item.product?.price)}</p>
                                                <p className="text-sm text-gray-500">{formatPrice(item.quantity * item.product?.price)}</p>
                                            </div>
                                        </div>
                                    </li>
                                )))}
                            </ul>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total:</p>
                                <p className="text-sm text-gray-500">{formatPrice(totalCost || 0)}</p>
                            </div>
                            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Finalize Transaction</button>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </>
    );
}

// <ul className="divide-y divide-gray-200">
//     {cart.orderItems.map((item) => (
//         <li key={item.id} className="py-4 flex">
//             <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
//                 <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
//             </div>
//             <div className="ml-4 flex-1 flex flex-col justify-between">
//                 <div>
//                     <h3 className="text-sm font-medium text-gray-900">{item.product?.name}</h3>
//                     <p className="mt-1 text-sm text-gray-500">{item.product?.description}</p>
//                 </div>
//                 <div className="mt-4 flex items-center justify-between">
//                     <p className="text-sm font-medium text-gray-900">{item.quantity} x {item.product?.price}</p>
//                     <p className="text-sm text-gray-500">{item.quantity * item.product?.price}</p>
//                 </div>
//             </div>
//         </li>
//     ))}
// </ul>
//                     ) : (
//     <p>Your cart is empty.</p>
// )}
//                 </div >
//             </div >
//         </>
//     );
// }