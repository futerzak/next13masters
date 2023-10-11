import { ImageResponse } from "next/server";
import React from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument } from "@/gql/graphql";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
	width: 1200,
	height: 630,
};
export default async function OpengraphImage({ params }: { params: { id: string } }) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: params.id,
		},
	});
	if (!product) {
		return null;
	}
	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
					fontSize: 24,
					fontWeight: 600,
					textAlign: "left",
					padding: 70,
					color: "red",
					backgroundImage: "linear-gradient(to right, #334d50, #cbcaa5)",
					height: "100%",
					width: "100%",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "15px",
							color: "#fff",
						}}
					>
						{product.name}
					</div>
					<div
						style={{
							width: "50%",
							fontSize: "20px",
							display: "flex",
							flexDirection: "column",
							marginBottom: "15px",
							color: "#fff",
						}}
					>
						{product.description}
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "15px",
							color: "#ffffff70",
						}}
					>
						<img src={product.images[0].url} width={500} height={500} />
					</div>
				</div>
			</div>
		),
	);
}
