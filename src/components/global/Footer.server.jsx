import { LogoText } from 'components/elements/AssetImport';
import { Button } from 'components/elements';

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <nav className="flex flex-wrap gap-10 px-3 py-16">
        <div>
          <h5 className="pb-2 font-semibold">Menu</h5>
          <ul>
            {/*<li>*/}
            {/*  <Button variant="linkFooter" to="/journal">*/}
            {/*    Nos articles*/}
            {/*  </Button>*/}
            {/*</li>*/}
            <li>
              <Button variant="linkFooter" to="/products">
                Tout nos produits
              </Button>
            </li>
            {/*<li>*/}
            {/*  <Button variant="linkFooter" to="/account">*/}
            {/*    Mon compte*/}
            {/*  </Button>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Button variant="linkFooter" to="/pro/registerpro">*/}
            {/*    [Je suis pro]*/}
            {/*  </Button>*/}
            {/*</li>*/}
          </ul>
        </div>
        <div>
          <ul>
            <h5 className="pb-2 font-semibold">La boutique</h5>
            {/*    <li>*/}
            {/*      <Button variant="linkFooter" to="/faqs">*/}
            {/*        À propos de nous & FAQs*/}
            {/*      </Button>*/}
            {/*    </li>*/}
            <li>
              <Button variant="linkFooter" to="/policies/terms-of-service">
                Termes & conditions de vente
              </Button>
            </li>
            <li>
              <Button variant="linkFooter" to="/policies/privacy-policy">
                Politique de confidentialité
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <address className="flex flex-col gap-2 not-italic">
            <h5 className="pb-2 font-semibold">Une question ?</h5>

            <Button variant="linkFooter" className="underline" to="/contact">
              Nous contacter
            </Button>
            <div>
              <a
                className="block break-words  hover:text-primary-600 active:text-primary-800"
                href="mailto:contact@hhcparis.fr"
              >
                contact@hhcparis.fr
              </a>
              <a className="block break-words  hover:text-primary-600 active:text-primary-800" href="tel:+33601032897">
                +33601032897
              </a>
            </div>
          </address>
        </div>
      </nav>
      <LogoText />
    </footer>
  );
}

// function FooterBanner({ message }) {
//   return (
//     <aside className="wrapper">
//       <div className="marquee font-display bg-neutral-600 pb-3 pt-4 text-4xl uppercase text-tertiary-100 lg:pb-5 lg:pt-6 lg:text-6xl">
//         <PromoMessages message={message} />
//         <PromoMessages message={message} />
//       </div>
//     </aside>
//   );
// }

// function PromoMessages({ message }) {
//   function PromoMessage() {
//     return (
//       <>
//         <LogoStar className="mx-8 inline fill-tertiary-200" size="2rem" />
//         {message}
//       </>
//     );
//   }

//   return (
//     <p>
//       <PromoMessage />
//       <PromoMessage />
//       <PromoMessage />
//       <PromoMessage />
//     </p>
//   );
// }
