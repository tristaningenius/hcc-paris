import {useState, Suspense} from 'react';
import {Image} from '@shopify/hydrogen';

import {
  ProductCard,
  Button,
  IconLg,
  Icon,
  Lg,
  Section,
  Heading,
  Divider,
  LogoTextCollection,
} from '~/components';
import logoStar from '../../assets/logo-star.svg';

export function ProductsLayout({data, isPro}) {
  const collection = data;

  return (
    <>
      <Section gap="default">
        <div className="max-lg:hidden">
          <LogoTextCollection
            collectionHandle={collection.handle ?? 'produits'}
          />
        </div>

        {collection.image ? (
          <Image
            alt={`Photo de ${collection.title}`}
            data={collection.image ?? null}
            className="z-10 mb-4 h-[20vh] w-full object-cover lg:h-[50vh] lg:rounded-2xl"
            widths={[320, 640, 960, 1280]}
            sizes="(max-width: 640px) 100vw,
                (max-width: 960px) 640px,
                (max-width: 1280px) 960px,
                1280px"
            loading="eager"
          />
        ) : (
          <Image
            alt="Photo de fleur HHC"
            src="https://cdn.shopify.com/s/files/1/0661/5367/7068/files/tout-les-produits.webp?v=1678639040"
            width="100%"
            height="100%"
            className="z-10 mb-4 h-[20vh] w-full object-cover lg:h-[50vh] lg:rounded-2xl"
            loading="eager"
          />
        )}

        <Divider className="max-lg:hidden" color="50" />
        <div className="mb-[-1rem] flex items-start justify-between font-display text-5xl text-trans-50 lg:hidden">
          DÉCOUVREZ{' '}
          <Image
            src={logoStar}
            alt="HHC Paris Logo star"
            height="100%"
            width="100%"
            className="w-8 text-neutral-600"
          />
        </div>

        <ProductGrid
          collectionTitle={collection.title}
          isPro={isPro}
          products={collection.products ?? collection}
        />
      </Section>
    </>
  );
}

function ProductGrid({products, isPro, collectionTitle}) {
  const [sortOrder, setSortOrder] = useState('PriceAsc');

  const filteredVendor = products?.nodes.filter((vendor) =>
    isPro ? vendor?.vendor !== 'HHC Paris' : vendor?.vendor !== 'Grossiste HHC',
  );

  const lg = Lg();

  const sortFunctions = {
    PriceDesc: (a, b) =>
      a.variants.nodes[0].priceV2.amount - b.variants.nodes[0].priceV2.amount,
    PriceAsc: (a, b) =>
      b.variants.nodes[0].priceV2.amount - a.variants.nodes[0].priceV2.amount,
    ConcentrationDesc: (a, b) =>
      extractNumber(a.tags[0]) - extractNumber(b.tags[0]),
    ConcentrationAsc: (a, b) =>
      extractNumber(b.tags[0]) - extractNumber(a.tags[0]),
  };

  const sortedProducts = filteredVendor.sort(sortFunctions[sortOrder]);

  let priceSortIcon =
    sortOrder === 'PriceAsc'
      ? 'sort_bot'
      : sortOrder === 'PriceDesc'
      ? 'sort_top'
      : 'swap_vert';

  let concentrationSortIcon =
    sortOrder === 'ConcentrationAsc'
      ? 'sort_bot'
      : sortOrder === 'ConcentrationDesc'
      ? 'sort_top'
      : 'swap_vert';

  return (
    <>
      <div className="z-20 bg-tertiary-200">
        <Heading
          as="h1"
          size="section"
          className="pb-3 lg:text-8xl lg:font-semibold"
        >
          NOS {collectionTitle ?? 'PRODUITS HHC'}
          <sup className="text-2xl font-normal sm:text-4xl lg:text-6xl">
            &nbsp;
            {sortedProducts.length}
          </sup>
        </Heading>
        <Divider className="lg:hidden" />
      </div>
      <Suspense>
        <div className="flex w-full flex-wrap justify-end gap-4 lg:flex-row-reverse">
          <Button
            className="group lg:text-3xl"
            variant="inline"
            onClick={() =>
              setSortOrder(
                sortOrder === 'ConcentrationAsc'
                  ? 'ConcentrationDesc'
                  : 'ConcentrationAsc',
              )
            }
          >
            {lg ? (
              <IconLg
                icon={concentrationSortIcon}
                color="fill-neutral-600 group-hover:fill-primary-600 group-active:fill-primary-700"
              />
            ) : (
              <Icon
                icon={concentrationSortIcon}
                color="fill-neutral-600 group-hover:fill-primary-600 group-active:fill-primary-700"
              />
            )}
            Concentration
          </Button>
          <Button
            className="group lg:text-3xl"
            variant="inline"
            onClick={() =>
              setSortOrder(sortOrder === 'PriceAsc' ? 'PriceDesc' : 'PriceAsc')
            }
          >
            {lg ? (
              <IconLg
                icon={priceSortIcon}
                color="fill-neutral-600 group-hover:fill-primary-600 group-active:fill-primary-700"
              />
            ) : (
              <Icon
                icon={priceSortIcon}
                color="fill-neutral-600 group-hover:fill-primary-600 group-active:fill-primary-700"
              />
            )}
            Prix
          </Button>
        </div>
        {!sortedProducts.length && (
          <p className="mx-auto py-16 text-xl">
            Il n&apos;y aucun produit vendus en gros dans cette catégorie pour
            le moment.
          </p>
        )}

        <section className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="products_grid-item"
            />
          ))}
        </section>
      </Suspense>
    </>
  );
}

function extractNumber(str) {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}
