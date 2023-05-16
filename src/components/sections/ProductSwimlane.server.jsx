// import { Suspense, useMemo } from 'react';
// import { gql, useShopQuery, useLocalization, CacheLong, useSession } from '@shopify/hydrogen';
// import { Slider } from 'components/elements';

// const mockProducts = new Array(12).fill('');

// export function ProductSwimlane({ data = mockProducts, count = 12, ...props }) {
export function ProductSwimlane() {
  // const { customerAccessToken } = useSession();
  // const isLogged = !!customerAccessToken;
  // let isPro;
  // if (isLogged) {
  //   const { data: customerData } = useShopQuery({
  //     query: CUSTOMER_QUERY,
  //     variables: {
  //       customerAccessToken,
  //     },
  //     cache: CacheLong(),
  //   });
  //   if (customerData?.customer?.metafield?.value !== undefined) {
  //     isPro = JSON.parse(customerData.customer.metafield.value);
  //   }
  // }
  //
  // if (!isPro) {
  //   const productCardsMarkup = useMemo(() => {
  //     if (typeof data === 'object') {
  //       return <Slider title="Notre sélection" data={data} />;
  //     }
  //     if (typeof data === 'string') {
  //       return (
  //         <Suspense>
  //           <RecommendedProducts productId={data} count={count} />
  //         </Suspense>
  //       );
  //     }
  //     return <TopProducts count={count} />;
  //   }, [count, data]);

  // return <>{productCardsMarkup}</>;
  return <div></div>;
  // }
}

function RecommendedProducts({ productId, count }) {
  //   const {
  //     language: { isoCode: languageCode },
  //     country: { isoCode: countryCode },
  //   } = useLocalization();
  //
  //   const { data: products } = useShopQuery({
  //     query: RECOMMENDED_PRODUCTS_QUERY,
  //     variables: {
  //       count,
  //       productId,
  //       languageCode,
  //       countryCode,
  //     },
  //   });
  //
  //   const mergedProducts = products.recommended
  //     .concat(products.additional.nodes)
  //     .filter((value, index, array) => array.findIndex((value2) => value2.id === value.id) === index);
  //
  //   const originalProduct = mergedProducts.map((item) => item.id).indexOf(productId);
  //
  //   mergedProducts.splice(originalProduct, 1);
  //
  //   return <Slider title="Vous aimerez aussi" data={mergedProducts} />;
  // }
  //
  // function TopProducts({ count }) {
  //   const {
  //     data: { products },
  //   } = useShopQuery({
  //     query: TOP_PRODUCTS_QUERY,
  //     variables: {
  //       count,
  //     },
  //   });

  // return <Slider title="Vos produits préférés" data={products.nodes} />;
  return <div></div>;
}
