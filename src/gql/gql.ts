/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetListDocument,
    "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}": types.CategoriesGetByCategorySlugDocument,
    "query CollectionsGetList {\n  collections {\n    id\n    name\n    description\n    slug\n  }\n}": types.CollectionsGetListDocument,
    "query CollectionsGetCollectionBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}": types.CollectionsGetCollectionBySlugDocument,
    "query ProductByCategorySlug($slug: String!, $limit: Int!, $offset: Int!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $limit\n    skip: $offset\n  ) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}": types.ProductByCategorySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductItem on Product {\n  id\n  name\n  price\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n}": types.ProductItemFragmentDoc,
    "query ProductsCounts {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery ProductsCountsByCategorySlug($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsCountsDocument,
    "query ProductGetList($limit: Int!, $offset: Int!) {\n  productsConnection(first: $limit, skip: $offset) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n  }\n}": types.ProductGetListDocument,
    "query ProductsGetListByCollectionSlag($slug: String!) {\n  products(where: {collections_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n}": types.ProductsGetListByCollectionSlagDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}"): typeof import('./graphql').CategoriesGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    id\n    name\n    description\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetCollectionBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}"): typeof import('./graphql').CollectionsGetCollectionBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductByCategorySlug($slug: String!, $limit: Int!, $offset: Int!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $limit\n    skip: $offset\n  ) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}"): typeof import('./graphql').ProductByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  price\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsCounts {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery ProductsCountsByCategorySlug($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsCountsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList($limit: Int!, $offset: Int!) {\n  productsConnection(first: $limit, skip: $offset) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCollectionSlag($slug: String!) {\n  products(where: {collections_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductsGetListByCollectionSlagDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
