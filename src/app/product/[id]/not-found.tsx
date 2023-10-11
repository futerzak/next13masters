import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<h2>Not Found 2</h2>
			<p>Product not found.</p>
			<p>
				<Link href="/">Go back</Link>
			</p>
		</div>
	);
}
