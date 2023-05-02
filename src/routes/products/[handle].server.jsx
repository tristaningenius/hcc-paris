import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  useSession,
  CacheLong,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {
  Section,
  Heading,
  Text,
  ProductGallery,
  ProductReviews,
  ProductForm,
} from '~/components';
import {
  NotFound,
  Layout,
  ProductSwimlane,
  QuestionsProduits,
} from '~/components/index.server';
import AccordionLazy from '../../components/lazyGsap/AccordionLazy.client';

export default function Product() {
  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="produit" />;
  }

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
  const productNotAllowed = product.vendor === 'Grossiste HHC' && !isPro;
  if (productNotAllowed) {
    return <NotFound type="produit" />;
  }

  const {
    title,
    vendor,
    id,
    productType,
    collections: {nodes: collection},
    metaReviews,
  } = product;
  const {
    priceV2,
    id: variantId,
    sku,
    title: variantTitle,
  } = product.variants.nodes[0];

  const parsedReviews = metaReviews ? JSON.parse(metaReviews.value) : null;

  useServerAnalytics({
    shopify: {
      canonicalPath: `/products/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: id,
      products: [
        {
          product_gid: id,
          variant_gid: variantId,
          variant: variantTitle,
          name: title,
          brand: vendor,
          category: productType,
          price: priceV2.amount,
          sku,
        },
      ],
    },
  });

  const productId = product?.id?.split('/').pop();

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <Suspense>
        <ProductOptionsProvider data={product}>
          <Section
            className="lg:relative lg:flex-row lg:justify-start"
            noDivide
            gap="noGap"
          >
            <ProductGallery product={product} />
            <Section
              gap="large"
              noDivide
              className="lg:grow lg:py-10 lg:pl-10 lg:pr-6 xl:py-14 xl:pl-14 xl:pr-10 2xl:py-16 2xl:pl-16 2xl:pr-12"
            >
              <ProductForm product={product} reviews={parsedReviews} />
              <Section
                noDivide
                className="xl:flex-row xl:justify-between xl:gap-8"
              >
                <Heading size="section-s" className="shrink-0">
                  POURQUOI ON ADORE ?
                </Heading>
                {product.metaWelove && (
                  <Text
                    as="div"
                    className="styled-text_container"
                    dangerouslySetInnerHTML={{
                      __html: product.metaWelove?.value,
                    }}
                  />
                )}
              </Section>
              <AccordionLazy data={product.metaAccordion?.references.nodes} />
            </Section>
          </Section>
        </ProductOptionsProvider>
      </Suspense>
      <Section gap="large">
        <ProductSwimlane title="Related Products" data={id} />
      </Section>
      <Suspense>
        <ProductReviews reviews={parsedReviews} productId={productId} />
      </Suspense>
      <Suspense>
        <QuestionsProduits collectionName={collection[0]?.title} />
      </Suspense>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      availableForSale
      publishedAt
      tags
      productType
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      collections(first: 1) {
        nodes {
          title
          handle
        }
      }
      metaReviews: metafield(namespace: "reviews", key: "avisgarantis") {
        createdAt
        value
      }
      metaWelove: metafield(
        namespace: "description"
        key: "pourquoi_on_adore_"
      ) {
        value
      }
      metaAccordion: metafield(
        namespace: "accordion"
        key: "informations_suppl_mentaires"
      ) {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              fields {
                value
              }
            }
          }
        }
      }
      productType
      variants(first: 100) {
        nodes {
          weight
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
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
