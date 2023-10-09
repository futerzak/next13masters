import Image from 'next/image';
import React from 'react'
import { executeGraphql } from '@/api/graphqlApi';
import { ProductGetByIdDocument } from '@/gql/graphql';

export default async function OpengraphImage({ params }: { params: { id: string } }) {
    const { product } = await executeGraphql(ProductGetByIdDocument, {
        id: params.id,
    });
    if (!product) {
        return null;
    }
    return (
        <div>
            <Image src={product?.images[0].url} alt={product?.name} className="w-full" width={1200} height={630} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
        </div>
    )
}
