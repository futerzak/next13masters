import { type TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export async function executeGraphql<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers = {},
	isTokenNeeded,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	isTokenNeeded?: boolean;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const authHeader: { Authorization: string } | {} = isTokenNeeded
		? { Authorization: `Bearer ${process.env.GRAPHQL_MUTATION_TOKEN}` }
		: {};

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		cache,
		next,
		headers: {
			...authHeader,
			...headers,
			"Content-Type": "application/json",
		},
	});

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}
