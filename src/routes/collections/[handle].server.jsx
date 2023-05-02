import {Suspense} from 'react';
import {
  gql,
  useShopQuery,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  useLocalization,
  Seo,
  useSession,
  CacheLong,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Layout, NotFound, QuestionsProduits} from '~/components/index.server';
import {ProductsLayout, Section} from '~/components';

const pageBy = 48;

export default function Collection({params}) {
  const {handle} = params;

  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();

  const {
    data: {collection},
  } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      language,
      country,
      pageBy,
    },
    preload: true,
  });

  const {customerAccessToken} = useSession();
  const isLogged = !!customerAccessToken;
  let isPro;
  if (isLogged) {
    const {data} = useShopQuery({
      query: CUSTOMER_QUERY,
      variables: {
        customerAccessToken,
      },
      cache: CacheLong(),
      preload: true,
    });
    if (data?.customer?.metafield?.value !== undefined) {
      isPro = JSON.parse(data.customer.metafield.value);
    }
  }

  if (!collection) {
    return <NotFound type="collection" />;
  }

  useServerAnalytics({
    shopify: {
      canonicalPath: `/collections/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
      collectionHandle: handle,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <Suspense>
        <ProductsLayout isPro={isPro} data={collection} />
      </Suspense>
      <Section noDivide>
        <QuestionsProduits collectionName={collection.title} />
      </Section>
    </Layout>
  );
}

const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      handle
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const CUSTOMER_QUERY = gql`
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      metafield(namespace: "custom", key: "ce_client_est_il_pro_") {
        value
      }
    }
  }
`;
