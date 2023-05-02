import { Suspense } from 'react'
import { CacheNone, Seo, gql } from '@shopify/hydrogen'

import { AccountRecoverForm } from '~/components'
import { Layout } from '~/components/index.server'

export default function AccountRecover({ response }) {
  response.cache(CacheNone())

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{ title: 'Recover password' }} />
      </Suspense>
      <AccountRecoverForm />
    </Layout>
  )
}

export async function api(request, { queryShop }) {
  const jsonBody = await request.json()

  if (!jsonBody.email) {
    return new Response(JSON.stringify({ error: 'Email required' }), {
      status: 400,
    })
  }

  await queryShop({
    query: CUSTOMER_RECOVER_MUTATION,
    variables: {
      email: jsonBody.email,
    },
    cache: CacheNone(),
  })

  return new Response(null, {
    status: 200,
  })
}

const CUSTOMER_RECOVER_MUTATION = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
