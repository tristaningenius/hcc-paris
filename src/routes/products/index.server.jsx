import {Suspense} from 'react';
import {
  gql,
  useShopQuery,
  useLocalization,
  Seo,
  useSession,
  CacheLong,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib';
import {Layout, QuestionsProduits} from '~/components/index.server';
import {ProductsLayout, Section} from '~/components';

export default function AllProducts() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
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

  const products = data.products;

  return (
    <Layout>
      <Seo type="page" data={{title: 'Tous les produits'}} />
      <Suspense>
        <ProductsLayout isPro={isPro} data={products} />
      </Suspense>
      <Section noDivide>
        <QuestionsProduits questionsTitle="À propos de nos produits" />
      </Section>
    </Layout>
  );
}

const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 30) {
      nodes {
        ...ProductCard
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
