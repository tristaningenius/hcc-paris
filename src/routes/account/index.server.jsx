import {Suspense} from 'react';
import {
  CacheNone,
  flattenConnection,
  gql,
  Seo,
  useSession,
  useLocalization,
  useShopQuery,
  useServerAnalytics,
} from '@shopify/hydrogen';

import {getApiErrorMessage} from '~/lib/utils';
import {Layout} from '~/components/index.server';
import {Heading, Section, LogoutButton} from '~/components';

import {
  AccountAddressBook,
  AccountOrderHistory,
  AccountDetails,
} from '~/components';
import LoyaltyCardLazy from '../../components/lazyGsap/LoyaltyCardLazy.client';

export default function Account({response}) {
  response.cache(CacheNone());

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();
  const {customerAccessToken} = useSession();

  if (!customerAccessToken) return response.redirect('/account/login');

  const {data} = useShopQuery({
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken,
      language: languageCode,
      country: countryCode,
    },
    cache: CacheNone(),
  });

  const {customer} = data;

  if (!customer) return response.redirect('/account/login');

  useServerAnalytics({
    shopify: {
      customerId: customer.id,
    },
  });

  let isPro;

  if (data?.customer?.metafield?.value !== undefined) {
    isPro = JSON.parse(data.customer.metafield.value);
  }

  const customerIdNum = customer.id.split('/').pop();

  const addresses = flattenConnection(customer.addresses).map((address) => ({
    ...address,
    id: address.id.substring(0, address.id.lastIndexOf('?')),
    originalId: address.id,
  }));

  const defaultAddress = customer?.defaultAddress?.id?.substring(
    0,
    customer.defaultAddress.id.lastIndexOf('?'),
  );

  return (
    <>
      <AuthenticatedAccount
        customer={customer}
        addresses={addresses}
        defaultAddress={defaultAddress}
        customerIdNum={customerIdNum}
        isPro={isPro}
      />
    </>
  );
}

function AuthenticatedAccount({
  customer,
  addresses,
  defaultAddress,
  customerIdNum,
  isPro,
}) {
  const orders = flattenConnection(customer?.orders) || [];

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Account details'}} />
      </Suspense>
      <Section noDivide gap="large">
        <Heading>
          Bienvenue
          {customer.firstName && (
            <>
              , &nbsp;
              <span className="font-semibold text-primary-600">
                {customer.firstName}
              </span>
            </>
          )}
        </Heading>
        {!isPro && (
          <div className="bottom-8 left-0 z-20 min-h-[3rem] w-full md:fixed">
            <div className="m-auto w-full max-w-xl">
              <LoyaltyCardLazy
                customerEmail={customer.email}
                customerIdNum={customerIdNum}
              />
            </div>
          </div>
        )}

        <Suspense>{orders && <AccountOrderHistory orders={orders} />}</Suspense>
        <Suspense>
          <AccountDetails
            firstName={customer.firstName}
            lastName={customer.lastName}
            phone={customer.phone}
            email={customer.email}
          />
        </Suspense>
        <Suspense>
          <AccountAddressBook
            defaultAddress={defaultAddress}
            addresses={addresses}
          />
        </Suspense>
        <div className="flex w-full justify-end">
          <LogoutButton className="max-sm:w-full">Se déconnecter</LogoutButton>
        </div>
      </Section>
    </Layout>
  );
}

export async function api(request, {session, queryShop}) {
  if (request.method !== 'PATCH' && request.method !== 'DELETE') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'PATCH,DELETE',
      },
    });
  }

  if (!session) {
    return new Response('Session storage not available.', {
      status: 400,
    });
  }

  const {customerAccessToken} = await session.get();

  if (!customerAccessToken) return new Response(null, {status: 401});

  const {email, phone, firstName, lastName, newPassword} = await request.json();

  const customer = {};

  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  if (firstName) customer.firstName = firstName;
  if (lastName) customer.lastName = lastName;
  if (newPassword) customer.password = newPassword;

  const {data, errors} = await queryShop({
    query: CUSTOMER_UPDATE_MUTATION,
    variables: {
      customer,
      customerAccessToken,
    },
    cache: CacheNone(),
  });

  const error = getApiErrorMessage('customerUpdate', data, errors);

  if (error) return new Response(JSON.stringify({error}), {status: 400});

  return new Response(null);
}

const CUSTOMER_QUERY = gql`
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
      }
      metafield(namespace: "custom", key: "ce_client_est_il_pro_") {
        value
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 2) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_UPDATE_MUTATION = gql`
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
