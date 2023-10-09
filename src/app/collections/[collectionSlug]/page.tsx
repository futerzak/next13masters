import React from 'react'
import { executeGraphql } from '@/api/graphqlApi';
import { CollectionsGetListDocument } from '@/gql/graphql';

export default async function CollectionsPage({ params }: { params: { collectionSlug: string } }) {
    const { collections } = await executeGraphql({ query: CollectionsGetListDocument });

    const collection = collections.find((collection) => collection.slug === params.collectionSlug);

    return (
        <div>
            <h2>{collection?.name}</h2>
        </div>
    )
}
