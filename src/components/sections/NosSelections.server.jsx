import {useShopQuery, gql, CacheLong, useSession} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Slider, Section, Heading} from '~/components';

export function NosSelections({data}) {
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

  return (
    <Section gap="large">
      <Heading as="h1" size="page" noBorder>
        NOS SÉLECTIONS
      </Heading>
      {data.map((collection, i) => (
        <Suspense key={collection.id}>
          <Slider
            isPro={isPro}
            i={i}
            data={collection.products.nodes}
            title={collection.title}
            handle={collection.handle}
            description={collection.seo.description}
          />
        </Suspense>
      ))}
    </Section>
  );
}

const CUSTOMER_QUERY = gql`
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      metafield(namespace: "custom", key: "ce_client_est_il_pro_") {
        value
      }
    }
  }
`;
