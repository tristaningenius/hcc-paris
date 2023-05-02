import {Suspense} from 'react';
import {
  CacheNone,
  flattenConnection,
  gql,
  Image,
  Link,
  Money,
  Seo,
  useRouteParams,
  useSession,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';
import {Layout} from '~/components/index.server';
import {Label, IconLg, Section, Heading} from '~/components';
import {statusMessage} from '~/lib/utils';

export default function OrderDetails({response}) {
  const {id} = useRouteParams();

  response.cache(CacheNone());

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();
  const {customerAccessToken} = useSession();

  if (!customerAccessToken) return response.redirect('/account/login');
  if (!id) return response.redirect('/account/');

  const {data} = useShopQuery({
    query: ORDER_QUERY,
    variables: {
      customerAccessToken,
      orderId: `id:${id}`,
      language: languageCode,
      country: countryCode,
    },
    cache: CacheNone(),
  });

  const [order] = flattenConnection(data?.customer?.orders ?? {}) || [null];

  if (!order) return null;

  const lineItems = flattenConnection(order?.lineItems);

  const discountApplications = flattenConnection(order.discountApplications);

  const firstDiscount = discountApplications[0]?.value;
  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;
  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: `Order ${order.name}`}} />
      </Suspense>
      <Section gap="large" noDivide className="m-auto w-full max-w-2xl">
        <div>
          <div className="flex items-start justify-between border-b-2 py-3">
            <Link to="/account" className="flex flex-wrap items-center gap-2">
              <IconLg icon="arrow_back" />
              <Heading size="section-s">
                {new Date(order.processedAt).toLocaleDateString('fr-FR')}
              </Heading>
              <Heading size="section-s" className="text-trans-50">
                - {order.name}
              </Heading>
            </Link>
            <Label variant="neutral">
              {statusMessage(order.fulfillmentStatus)}
            </Label>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {lineItems?.map((lineItem) => (
              <div
                className="flex gap-2 border-b border-trans-20 py-3"
                key={lineItem.variant?.id}
              >
                <Link
                  className="w-[40%]"
                  to={`/products/${lineItem.variant?.product.handle}`}
                >
                  {lineItem?.variant?.image && (
                    <Image
                      width={168}
                      height={168}
                      widths={[168]}
                      alt={
                        lineItems[0].variant?.image?.altText ?? 'Order image'
                      }
                      src={lineItem.variant.image.src}
                      loaderOptions={{scale: 2, crop: 'center'}}
                      className=" rounded-2xl bg-tertiary-100 "
                    />
                  )}
                </Link>
                <div className="w-full">
                  <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                    {lineItem?.title}
                    <div className="h-6 w-px bg-trans-20" />
                    <span className="font-display text-2xl font-light text-neutral-600">
                      {lineItem.variant.title ?? null}
                    </span>
                  </h3>
                  <div className="flex justify-between">
                    <p className=" text-trans-50">
                      ( Qté : {lineItem?.quantity} )
                    </p>

                    <p className="flex flex-col text-right font-display text-2xl">
                      <Money
                        as="span"
                        className="text-trans-50"
                        data={lineItem.variant?.priceV2}
                      />
                      <Money as="span" data={lineItem.discountedTotalPrice} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <dl className="grid grid-cols-2 border-t py-6">
            {((discountValue && discountValue?.amount) ||
              discountPercentage) && (
              <>
                <dt className="font-display text-2xl text-trans-50">
                  Promotion
                </dt>
                <dd className="text-right font-display text-2xl text-trans-50">
                  {discountPercentage ? (
                    <span>-{discountPercentage}%</span>
                  ) : (
                    discountValue && <Money data={discountValue} />
                  )}
                </dd>
              </>
            )}
            <dt className="font-display text-2xl font-light text-trans-50">
              Sous-total
            </dt>
            <dd className="text-right font-display text-2xl text-trans-50">
              <Money data={order.subtotalPriceV2} />
            </dd>
            <dt className="font-display text-2xl text-trans-50">TVA</dt>
            <dd className="text-right font-display text-2xl text-trans-50">
              <Money data={order.totalTaxV2} />
            </dd>
            <dt className="font-display text-3xl ">TOTAL</dt>
            <dd className="text-right font-display text-3xl">
              <Money data={order.totalPriceV2} />
            </dd>
          </dl>
          <dl className="grid grid-cols-2 border-t py-6">
            <dt className="text-sm font-semibold text-neutral-500">Livré à</dt>
            <dd className="text-right text-neutral-500">
              {order?.shippingAddress ? (
                <ul>
                  <li>
                    {order.shippingAddress.firstName &&
                      order.shippingAddress.firstName + ' '}
                    {order.shippingAddress.lastName}
                  </li>
                  {order?.shippingAddress?.formatted ? (
                    order.shippingAddress.formatted.map((line) => (
                      <li key={line}>{line}</li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <p>No shipping address defined</p>
              )}
            </dd>
          </dl>
        </div>
      </Section>
    </Layout>
  );
}

// @see: https://shopify.dev/api/storefront/2022-07/objects/Order#fields
const ORDER_QUERY = gql`
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }

  fragment AddressFull on MailingAddress {
    address1
    address2
    city
    company
    country
    countryCodeV2
    firstName
    formatted
    id
    lastName
    name
    phone
    province
    provinceCode
    zip
  }

  fragment DiscountApplication on DiscountApplication {
    value {
      ... on MoneyV2 {
        amount
        currencyCode
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }

  fragment Image on Image {
    altText
    height
    src: url(transform: {crop: CENTER, maxHeight: 96, maxWidth: 96, scale: 2})
    id
    width
  }

  fragment ProductVariant on ProductVariant {
    image {
      ...Image
    }
    priceV2 {
      ...Money
    }
    product {
      handle
    }
    sku
    title
  }

  fragment LineItemFull on OrderLineItem {
    title
    quantity
    discountAllocations {
      allocatedAmount {
        ...Money
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    originalTotalPrice {
      ...Money
    }
    discountedTotalPrice {
      ...Money
    }
    variant {
      ...ProductVariant
    }
  }

  query orderById(
    $customerAccessToken: String!
    $orderId: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 1, query: $orderId) {
        nodes {
          id
          name
          orderNumber
          processedAt
          fulfillmentStatus
          totalTaxV2 {
            ...Money
          }
          totalPriceV2 {
            ...Money
          }
          subtotalPriceV2 {
            ...Money
          }
          shippingAddress {
            ...AddressFull
          }
          discountApplications(first: 100) {
            nodes {
              ...DiscountApplication
            }
          }
          lineItems(first: 100) {
            nodes {
              ...LineItemFull
            }
          }
        }
      }
    }
  }
`;
