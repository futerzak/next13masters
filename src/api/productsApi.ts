// import { type ProductType } from "@/ui/molecules/Product";

// const apiUrl = "https://naszsklep-api.vercel.app/api"; // move to env

// async function fetchWithErrorHandle(url: string) {
// 	try {
// 		const response = await fetch(url);
// 		if (!response.ok) {
// 			throw new Error("Network response was not ok");
// 		}
// 		return (await response.json()) as unknown;
// 	} catch (error) {
// 		console.error("Error fetching products:", error);
// 		return undefined;
// 	}
// }

// export const getProductById = async (id: string): Promise<ProductType> => {
// 	const data = (await fetchWithErrorHandle(`${apiUrl}/products/${id}`)) || {};
// 	return data as ProductType;
// };

// export async function fetchProductsWithLimit(limit: number = 10): Promise<ProductType[]> {
// 	const data = (await fetchWithErrorHandle(`${apiUrl}/products?take=${limit}`)) || [];
// 	return data as ProductType[];
// }

// export async function fetchProductsWithPagination(
// 	limit: number = 10,
// 	page = 1,
// ): Promise<ProductType[]> {
// 	const data = (await fetchWithErrorHandle(`${apiUrl}/products?take=${limit}&page=${page}`)) || [];
// 	return data as ProductType[];
// }
