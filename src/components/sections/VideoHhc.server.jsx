import Image from 'next/image';

import { Section, Heading, LogoStar, Button } from 'components/elements';

export function VideoHhc() {
  const fluidHeading = {
    fontSize: 'calc( 1vw + 1rem )',
    lineHeight: 'calc( 1.25vw + 1.25rem )',
  };

  return (
    <Section gap="large">
      <div className="flex flex-col items-end gap-8 overflow-clip rounded-2xl bg-secondary-600 md:flex-row">
        <div className="p-[calc(1vw+1rem)] text-tertiary-100">
          <Heading noBorder>Chez nous, c&apos;est simple.</Heading>
          <ul className=" font-medium " style={fluidHeading}>
            <li>Des produits de qualité à portée de main.</li>
            <li>Une livraison rapide, simple et sécurisée.</li>
          </ul>
          <Button
            to="/faqs"
            variant="link"
            className="text-tertiary-100 hover:text-tertiary-600 active:text-tertiary-700"
          >
            En apprendre plus sur la boutique
          </Button>
        </div>

        <div className="relative h-[600px]">
          <LogoStar className="logo-rotate absolute inset-0 z-10 m-auto fill-tertiary-600" size="15rem" />
          <Image
            src="https://cdn.shopify.com/s/files/1/0661/5367/7068/files/tout-les-produits.webp?v=1678639040"
            width={700}
            height={700}
            className="h-full object-cover"
            alt="Main tenant un fleur HHC"
          />
        </div>
      </div>
    </Section>
  );
}
