import { Suspense } from 'react'
import { useRouteParams, Seo } from '@shopify/hydrogen'

import { AccountActivateForm } from '~/components'
import { Layout } from '~/components/index.server'

export default function ActivateAccount() {
  const { id, activationToken } = useRouteParams()

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{ title: 'Activate account' }} />
      </Suspense>
      <AccountActivateForm id={id} activationToken={activationToken} />
    </Layout>
  )
}
