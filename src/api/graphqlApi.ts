import { type TypedDocumentString } from "@/gql/graphql";
import { sleep } from "@/utils/sleep";

type GraphQLResponse<TData> =
	| {
			data: TData;
			errors?: undefined;
	  }
	| { data?: undefined; errors: { message: string }[] };

type ExecuteGraphqlConfig = {
	mutation?: boolean;
	throttle?: number;
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
	headers?: HeadersInit;
};

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
	config?: ExecuteGraphqlConfig,
): Promise<TResult> => {
	const mutationHeaders = config?.mutation
		? {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		  }
		: { Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}` };

	const callFetch = async () => {
		if (!process.env.GRAPHQL_URL) {
			throw TypeError("GRAPHQL_URL is not defined");
		}

		if (config?.throttle) {
			await sleep(config.throttle);
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
				...mutationHeaders,
				"Content-Type": "application/json",
			},
		});
		return res;
	};

	const res = await callFetch();
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
