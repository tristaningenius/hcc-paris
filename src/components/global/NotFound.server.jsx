// import { gql, useLocalization, useShopQuery } from '@shopify/hydrogen';

import { Section, Button } from 'components/elements';
import Layout from 'components/Layout';

export function NotFound({ response, type = 'page' }) {
  if (response) {
    response.status = 404;
    response.statusText = 'Not found';
  }

  const heading = `${type} introuvable`;

  return (
    <Layout>
      <Section className="m-auto min-h-[50vh] max-w-2xl justify-center py-16" noDivide gap="large">
        <h1 className="font-display break-words text-center text-6xl font-semibold uppercase">{heading}</h1>
        <Button to="/">Retourner en boutique</Button>
      </Section>
    </Layout>
  );
}
