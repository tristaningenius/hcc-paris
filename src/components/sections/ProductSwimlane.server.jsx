import {Suspense, useMemo} from 'react';
import {
  gql,
  useShopQuery,
  useLocalization,
  CacheLong,
  useSession,
} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Slider} from '~/components';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({data = mockProducts, count = 12, ...props}) {
  const {customerAccessToken} = useSession();
  const isLogged = !!customerAccessToken;
  let isPro;
  if (isLogged) {
    const {data: customerData} = useShopQuery({
      query: CUSTOMER_QUERY,
      variables: {
        customerAccessToken,
      },
      cache: CacheLong(),
    });
    if (customerData?.customer?.metafield?.value !== undefined) {
      isPro = JSON.parse(customerData.customer.metafield.value);
    }
  }

  if (!isPro) {
    const productCardsMarkup = useMemo(() => {
      if (typeof data === 'object') {
        return <Slider title="Notre sélection" data={data} />;
      }
      if (typeof data === 'string') {
        return (
          <Suspense>
            <RecommendedProducts productId={data} count={count} />
          </Suspense>
        );
      }
      return <TopProducts count={count} />;
    }, [count, data]);

    return <>{productCardsMarkup}</>;
  }
}

function RecommendedProducts({productId, count}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data: products} = useShopQuery({
    query: RECOMMENDED_PRODUCTS_QUERY,
    variables: {
      count,
      productId,
      languageCode,
      countryCode,
    },
  });

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return <Slider title="Vous aimerez aussi" data={mergedProducts} />;
}

function TopProducts({count}) {
  const {
    data: {products},
  } = useShopQuery({
    query: TOP_PRODUCTS_QUERY,
    variables: {
      count,
    },
  });

  return <Slider title="Vos produits préférés" data={products.nodes} />;
}

const RECOMMENDED_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

const TOP_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query topProducts(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
const CUSTOMER_QUERY = gql`
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      metafield(namespace: "custom", key: "ce_client_est_il_pro_") {
        value
      }
    }
  }
`;
