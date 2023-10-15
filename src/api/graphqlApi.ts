import { type TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<TData> =
	| {
			data: TData;
			errors?: undefined;
	  }
	| { data?: undefined; errors: { message: string }[] };

type ExecuteGraphqlConfig = {
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
	headers?: HeadersInit;
};

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
	config?: ExecuteGraphqlConfig,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		cache: config?.cache,
		next: config?.next,
		headers: {
			...config?.headers,
			"Content-Type": "application/json",
		},
	});
	const graphqlResponse =
		(await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		console.error(graphqlResponse.errors);
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
};
