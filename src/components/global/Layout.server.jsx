import {Suspense} from 'react';
import {useSession, useShopQuery, CacheLong, gql} from '@shopify/hydrogen';

import {Loading, Footer} from '~/components/index.server';
import {Header, AgePopup} from '~/components';
import CookieConsentPopupLazy from '../lazyGsap/CookieConsentPopupLazy.client';

export function Layout({children}) {
  const {
    data: {collections, topBanner, bottomBanner},
  } = useShopQuery({
    query: LAYOUT_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  const {customerAccessToken} = useSession();

  const isLogged = !!customerAccessToken;

  let customerIdNum;
  let customerEmail;
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
    customerIdNum = data?.customer?.id?.split('/').pop();
    customerEmail = data?.customer?.email;
    if (data?.customer?.metafield?.value !== undefined) {
      isPro = JSON.parse(data.customer.metafield.value);
    }
  }

  return (
    <>
      <Suspense>
        <Header
          data={collections.nodes}
          isLogged={isLogged}
          promoMessage={topBanner}
          customerEmail={customerEmail}
          customerIdNum={customerIdNum}
          isPro={isPro}
        />
      </Suspense>
      <AgePopup />
      <CookieConsentPopupLazy />
      <main
        role="main"
        id="mainContent"
        className="flex min-h-screen flex-col gap-16 px-2 sm:px-4"
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Suspense>
        <Footer promoMessage={bottomBanner} />
      </Suspense>
    </>
  );
}

const LAYOUT_QUERY = gql`
  query FeaturedCollections {
    collections(first: 6) {
      nodes {
        id
        title
        handle
      }
    }
    bottomBanner: metaobject(id: "gid://shopify/Metaobject/34406668") {
      message: field(key: "message") {
        value
      }
      isActive: field(key: "activer_la_banniere") {
        value
      }
    }
    topBanner: metaobject(id: "gid://shopify/Metaobject/34537740") {
      message: field(key: "intitule_du_message") {
        value
      }
      isActive: field(key: "afficher_la_banniere_haute") {
        value
      }
      lien: field(key: "lien") {
        value
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
