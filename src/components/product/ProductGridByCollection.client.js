import Image from 'next/image';
import { Section, Divider, LogoTextCollection } from 'components/elements';
import logoStar from '../../assets/logo-star.svg';
import { ProductGrid } from './ProductGrid.client';

export default function ProductGridByCollectionClient({ collection }) {
  const imageBySlug = {
    'fleurs-hhc': 'https://checkout.hhcparis.fr/wp-content/uploads/2023/05/tout-les-produits.webp',
    'vapes-hhc': 'https://checkout.hhcparis.fr/wp-content/uploads/2023/05/Capture_d_ecran_2022-12-26_204129.webp',
    'resines-hhc': 'https://checkout.hhcparis.fr/wp-content/uploads/2023/05/resine-hhc.webp',
    'huiles-hhc': 'https://checkout.hhcparis.fr/wp-content/uploads/2023/05/huile-hhc.webp',
  };
  return (
    <>
      <Section gap="default">
        <div className="logo h-[250px] max-lg:hidden">
          <LogoTextCollection collectionHandle={collection.slug ?? 'produits'} />
        </div>
        <div className={'logo h-[450px]'}>
          <Image
            alt={`Photo de ${collection.title}`}
            src={
              imageBySlug[collection.slug] ??
              'https://checkout.hhcparis.fr/wp-content/uploads/2023/05/tout-les-produits.webp'
            }
            className="z-10 mb-4 h-[20vh] w-full object-cover lg:h-[50vh] lg:rounded-2xl"
            width={'100%'}
            height={'100%'}
            sizes="(max-width: 640px) 100vw,
                (max-width: 960px) 640px,
                (max-width: 1280px) 960px,
                1280px"
            loading="eager"
            layout={'responsive'}
          />
        </div>
        <Divider className="max-lg:hidden" color="50" />
        <div className="mb-[-1rem] flex items-start justify-between font-[teko] text-5xl text-trans-50 lg:hidden">
          DÉCOUVREZ{' '}
          <Image src={logoStar} alt="HHC Paris Logo star" height="100%" width="100%" className="w-8 text-neutral-600" />
        </div>
        <ProductGrid
          collectionTitle={collection.name}
          // isPro={isPro}
          products={collection.products.nodes}
        />
      </Section>
    </>
  );
}
