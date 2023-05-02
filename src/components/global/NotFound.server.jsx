import {Suspense} from 'react';
import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Section, Button, Slider} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';

export function NotFound({response, type = 'page'}) {
  if (response) {
    response.status = 404;
    response.statusText = 'Not found';
  }

  const heading = `${type} introuvable`;

  return (
    <Layout>
      <Section
        className="m-auto min-h-[50vh] max-w-2xl justify-center py-16"
        noDivide
        gap="large"
      >
        <h1 className="break-words text-center font-display text-6xl font-semibold uppercase">
          {heading}
        </h1>
        <Button to="/">Retourner en boutique</Button>
      </Section>
      <Section noDivide>
        <Suspense>
          <FeaturedSection />
        </Suspense>
      </Section>
    </Layout>
  );
}

function FeaturedSection() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: NOT_FOUND_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

  const {featuredCollections, featuredProducts} = data;

  return (
    <>
      {featuredCollections.nodes.length < 2 && (
        <Slider title="Popular Collections" data={featuredCollections.nodes} />
      )}
      <ProductSwimlane data={featuredProducts.nodes} />
    </>
  );
}

const NOT_FOUND_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
