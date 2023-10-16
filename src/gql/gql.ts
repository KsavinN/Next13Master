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
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $itemId}\n    data: {quantity: $quantity, total: $total}\n  ) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "mutation CartUpsertItem($orderId: ID!, $productId: ID!, $price: Int!, $quantity: Int!) {\n  upsertOrderItem(\n    where: {id: $orderId}\n    upsert: {create: {quantity: 1, total: $price, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $price}}\n  ) {\n    id\n    product {\n      id\n      name\n      price\n    }\n  }\n}": types.CartUpsertItemDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveItem($orderId: ID!) {\n  deleteOrderItem(where: {id: $orderId}) {\n    id\n  }\n}": types.CartRemoveItemDocument,
    "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetListDocument,
    "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}": types.CategoriesGetByCategorySlugDocument,
    "query CollectionsGetList {\n  collections {\n    id\n    name\n    description\n    slug\n  }\n}": types.CollectionsGetListDocument,
    "query CollectionsGetCollectionBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}": types.CollectionsGetCollectionBySlugDocument,
    "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    product {\n      id\n      name\n      price\n      images {\n        url\n        fileName\n      }\n    }\n    quantity\n  }\n}": types.CartFragmentDoc,
    "fragment ProductItem on Product {\n  id\n  name\n  price\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n}": types.ProductItemFragmentDoc,
    "query ProductByCategorySlug($slug: String!, $limit: Int!, $offset: Int!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $limit\n    skip: $offset\n  ) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n  }\n}": types.ProductByCategorySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetReviewsRating($id: ID!) {\n  reviewsConnection(where: {product: {id: $id}}) {\n    edges {\n      node {\n        rating\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductGetReviewsRatingDocument,
    "query ProductGetVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductColorVariant {\n        id\n        name\n      }\n      ... on ProductSizeColorVariant {\n        id\n        name\n      }\n      ... on ProductSizeVariant {\n        id\n        name\n      }\n    }\n  }\n}": types.ProductGetVariantsListDocument,
    "query ProductsCounts {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery ProductsCountsByCategorySlug($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsCountsDocument,
    "query ProductGetList($limit: Int!, $offset: Int!) {\n  productsConnection(first: $limit, skip: $offset) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n  }\n}": types.ProductGetListDocument,
    "query ProductsGetListSearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductItem\n  }\n}": types.ProductsGetListSearchDocument,
    "query ProductsGetListByCollectionSlag($slug: String!) {\n  products(where: {collections_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n}": types.ProductsGetListByCollectionSlagDocument,
    "mutation ReviewCreate($id: ID!, $headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $id}}}\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
    "query ReviewGetByProductId($id: ID!) {\n  product(where: {id: $id}) {\n    reviews {\n      ...ReviewItem\n    }\n  }\n}": types.ReviewGetByProductIdDocument,
    "fragment ReviewItem on Review {\n  id\n  name\n  headline\n  email\n  content\n  rating\n}": types.ReviewItemFragmentDoc,
    "mutation ReviewPublish($id: ID!) {\n  publishReview(where: {id: $id}, to: PUBLISHED) {\n    ...ReviewItem\n  }\n}": types.ReviewPublishDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $itemId}\n    data: {quantity: $quantity, total: $total}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpsertItem($orderId: ID!, $productId: ID!, $price: Int!, $quantity: Int!) {\n  upsertOrderItem(\n    where: {id: $orderId}\n    upsert: {create: {quantity: 1, total: $price, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $price}}\n  ) {\n    id\n    product {\n      id\n      name\n      price\n    }\n  }\n}"): typeof import('./graphql').CartUpsertItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($orderId: ID!) {\n  deleteOrderItem(where: {id: $orderId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
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
export function graphql(source: "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    product {\n      id\n      name\n      price\n      images {\n        url\n        fileName\n      }\n    }\n    quantity\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  price\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductByCategorySlug($slug: String!, $limit: Int!, $offset: Int!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $limit\n    skip: $offset\n  ) {\n    products: edges {\n      node {\n        ...ProductItem\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetReviewsRating($id: ID!) {\n  reviewsConnection(where: {product: {id: $id}}) {\n    edges {\n      node {\n        rating\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductGetReviewsRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductColorVariant {\n        id\n        name\n      }\n      ... on ProductSizeColorVariant {\n        id\n        name\n      }\n      ... on ProductSizeVariant {\n        id\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetVariantsListDocument;
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
export function graphql(source: "query ProductsGetListSearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductsGetListSearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCollectionSlag($slug: String!) {\n  products(where: {collections_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductsGetListByCollectionSlagDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($id: ID!, $headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $id}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewGetByProductId($id: ID!) {\n  product(where: {id: $id}) {\n    reviews {\n      ...ReviewItem\n    }\n  }\n}"): typeof import('./graphql').ReviewGetByProductIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewItem on Review {\n  id\n  name\n  headline\n  email\n  content\n  rating\n}"): typeof import('./graphql').ReviewItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewPublish($id: ID!) {\n  publishReview(where: {id: $id}, to: PUBLISHED) {\n    ...ReviewItem\n  }\n}"): typeof import('./graphql').ReviewPublishDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
