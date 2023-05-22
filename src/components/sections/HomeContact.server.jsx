import Image from 'next/image';
import Link from 'next/link';
import { Section, Heading, Divider, Icon, Button } from 'components/elements';

export function HomeContact() {
  return (
    <div className="mt-[-6rem] pt-24" id="home-contact">
      <Section noDivide gap="large" className="flex-col rounded-2xl bg-tertiary-600 p-[calc(1vw+1rem)] lg:flex-row">
        <div className="flex flex-col">
          <Heading className="pt-0" noBorder>
            Besoin d’aide pour décider&nbsp;?
          </Heading>
          <Image
            src="https://cdn.shopify.com/s/files/1/0661/5367/7068/files/hhcparis-pontoise.webp?v=1678634776"
            height={600}
            width={600}
            className="h-full max-h-96 w-full grow rounded-bl-2xl object-cover pt-8"
            alt="photo de la boutique HHC Paris de Pontoise"
          />
        </div>
        <div className="flex grow flex-col justify-between gap-8">
          <div>
            <p className="inline max-w-[50rem] text-xl sm:text-2xl">
              Nous somme là pour vous aider. Envoyez nous un message et nous serons plus qu’heureux de vous conseiller
              :&nbsp;
            </p>
            <Button variant="link" className="sm:text-2xl" to="/contact">
              Nous contacter
            </Button>
          </div>
          <h4 className="text-xl sm:text-2xl">Ou rendez-nous visite !</h4>
          <address className="not-italic">
            <ul className="flex flex-col gap-4 uppercase">
              <li>
                <div>
                  <span className="font-[teko] text-xl sm:text-2xl">PARIS</span> 3 rue des Fossés Saint-Marcel - 75005
                  Paris
                </div>
                <a
                  className="flex text-2xl sm:text-3xl"
                  href="https://maps.app.goo.gl/YZ5BWGrq4R1XeNX68"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <Icon icon="arrow_outward" size="50" />
                  </div>
                </a>
              </li>
              <Divider color="20" />
              <li>
                <div>
                  <span className="font-[teko] text-xl sm:text-2xl">Pontoise</span> 29 rue Alexandre Prachay - 95300
                  Pontoise
                </div>
                <a href="https://maps.app.goo.gl/jyHLCMb1iXgaZycW6" target="_blank" rel="noreferrer">
                  <div>
                    <Icon icon="arrow_outward" size="50" />
                  </div>
                </a>
              </li>
              <Divider color="20" />
              <li>
                <div>
                  <span className="font-[teko] text-xl sm:text-2xl">Eaubonne</span> 40 rue Gabriel Péri - 95600 Eaubonne
                </div>
                <a
                  className="flex text-2xl sm:text-3xl"
                  href="https://maps.app.goo.gl/1xRLXcnGxZ6zxpsc9"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <Icon icon="arrow_outward" size="50" />
                  </div>
                </a>
              </li>
            </ul>
          </address>
        </div>
      </Section>
    </div>
  );
}
