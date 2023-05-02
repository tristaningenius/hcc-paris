import {useSession, useShopQuery, CacheLong, gql} from '@shopify/hydrogen';

import {Layout} from '~/components/index.server';
import {ContactForm} from '~/components';

export default function Contact() {
  const {customerAccessToken} = useSession();
  const isLogged = !!customerAccessToken;

  let CustomerData;

  if (isLogged) {
    const {data} = useShopQuery({
      query: CUSTOMER_QUERY,
      variables: {
        customerAccessToken,
      },
      cache: CacheLong(),
      preload: true,
    });
    CustomerData = data;
  }

  return (
    <Layout>
      <ContactForm customerData={CustomerData} />
    </Layout>
  );
}

const CUSTOMER_QUERY = gql`
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      email
    }
  }
`;
