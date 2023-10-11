import { redirect } from "next/navigation";

export default function CategorySlugPage({ params }: { params: { categorySlug: string } }) {
	redirect(`/categories/${params.categorySlug}/1`);
}
