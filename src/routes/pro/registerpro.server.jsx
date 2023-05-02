import {Suspense} from 'react';
import {CacheNone, Seo, gql} from '@shopify/hydrogen';

import {AccountCreateProForm, Section} from '~/components';
import {Layout, ProCard} from '~/components/index.server';
import {getApiErrorMessage} from '~/lib/utils';

export default function RegisterPro({response}) {
  response.cache(CacheNone());

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Register'}} />
      </Suspense>
      <Section
        row
        gap="large"
        noDivide
        className="mx-auto flex-wrap-reverse items-center"
      >
        <div className="mx-auto">
          <ProCard />
        </div>
        <AccountCreateProForm />
      </Section>
    </Layout>
  );
}

export async function api(request, {queryShop}) {
  const jsonBody = await request.json();

  if (!jsonBody.email || !jsonBody.password) {
    return new Response(
      JSON.stringify({error: 'Email and password are required'}),
      {status: 400},
    );
  }

  const {data, errors} = await queryShop({
    query: CUSTOMER_CREATE_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
        firstName: jsonBody.firstName,
        lastName: jsonBody.lastName,
        phone: jsonBody.phone,
      },
    },
    // @ts-expect-error `queryShop.cache` is not yet supported but soon will be.
    cache: CacheNone(),
  });

  const errorMessage = getApiErrorMessage('customerCreate', data, errors);

  if (
    !errorMessage &&
    data &&
    data.customerCreate &&
    data.customerCreate.customer &&
    data.customerCreate.customer.id
  ) {
    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: errorMessage ?? 'Unknown error',
      }),
      {status: 401},
    );
  }
}

const CUSTOMER_CREATE_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
