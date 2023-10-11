import NextImage from "next/image";
import Link from "next/link";
import { Overlay } from "@/ui/atoms/Overlay";
import { getCartFromCookies } from "@/api/cart";
import { formatPrice } from "@/utils/formatPrice";

export default async function ModalCart() {
	const cart = await getCartFromCookies();

	const totalCost = cart?.orderItems?.reduce(
		(acc, item) => acc + (item.product?.price || 0) * item.quantity,
		0,
	);

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
				<div className="p-4">
					<h2 className="mb-4 text-lg font-medium">Your Cart</h2>
					{cart && cart?.orderItems?.length > 0 ? (
						<>
							<ul className="divide-y divide-gray-200">
								{cart.orderItems.map(
									(item) =>
										item.product && (
											<li key={item.id} className="flex py-4">
												<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
													<NextImage
														src={item.product?.images[0].url}
														alt={item.product?.name}
														className="h-full w-full object-cover"
														width={96}
														height={96}
													/>
												</div>
												<div className="ml-4 flex flex-1 flex-col justify-between">
													<div>
														<Link href={`/product/${item.product.id}`}>
															<h3 className="text-sm font-medium text-gray-900">
																{item.product?.name}
															</h3>
														</Link>
													</div>
													<div className="mt-4 flex items-center justify-between">
														<p className="text-sm font-medium text-gray-900">
															{item.quantity} x {formatPrice(item.product?.price)}
														</p>
														<p className="text-sm text-gray-500">
															{formatPrice(item.quantity * item.product?.price)}
														</p>
													</div>
												</div>
											</li>
										),
								)}
							</ul>
							<div className="mt-4 flex items-center justify-between">
								<p className="text-sm font-medium text-gray-900">Total:</p>
								<p className="text-sm text-gray-500">{formatPrice(totalCost || 0)}</p>
							</div>
							<Link href="/cart" replace>
								<button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
									Finalize Transaction
								</button>
							</Link>
						</>
					) : (
						<p>Your cart is empty.</p>
					)}
				</div>
			</div>
		</>
	);
}
