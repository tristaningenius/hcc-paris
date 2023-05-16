// import { useShopQuery, gql, CacheLong, useSession } from '@shopify/hydrogen';
import { Slider, Section, Heading } from 'components/elements';

export function NosSelections({ data }) {
  // const { customerAccessToken } = useSession();
  // const isLogged = !!customerAccessToken;
  // let isPro;
  // if (isLogged) {
  //   if (data?.customer?.metafield?.value !== undefined) {
  //     isPro = JSON.parse(data.customer.metafield.value);
  //   }
  // }

  return (
    <Section gap="large">
      <Heading as="h1" size="page" noBorder>
        NOS SÉLECTIONS
      </Heading>
      {data.map((collection, i) => {
        if (collection.slug === 'non-classe') {
          return null;
        }
        return (
          <Slider
            key={collection.id}
            // isPro={isPro}
            i={i}
            products={collection.products.nodes}
            title={collection.name}
            handle={collection.slug}
            description={collection.description}
          />
        );
      })}
    </Section>
  );
}
