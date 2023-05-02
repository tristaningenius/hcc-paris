import {Section, Heading, Divider} from '~/components';

export function ProCard() {
  return (
    <Section
      noDivide
      maxW
      gap="large"
      className=" rounded-2xl bg-tertiary-600 p-[calc(1vw+1rem)]"
    >
      <Heading className="w-full pt-0" size="section" noBorder>
        Comment devenir grossiste chez HHC Paris?
      </Heading>

      <div className="flex flex-col justify-between gap-8">
        <div>
          <p className="max-w-[50rem] text-xl sm:text-2xl">
            Si vous êtes connecté à votre compte pro la boutique particulié sera
            masquée.
          </p>
        </div>
        <h4 className="text-2xl">
          Pour devenir grossiste chez HHC Paris et accéder à notre catalogue de
          produits à base de HHC, il vous suffit de suivre ces quelques étapes:
        </h4>
        <address className="not-italic">
          <ul className="flex flex-col gap-4 uppercase">
            <li className="text-2xl">
              Créez un compte professionnel à partir de l&apos;onglet &quot;je
              suis pro&quot;.
            </li>
            <Divider color="20" />
            <li className="text-2xl">
              Attendez la validation de votre demande par notre équipe (sous
              24h).
            </li>
            <Divider color="20" />
            <li className="text-2xl">
              Une fois votre compte validé, accédez à notre catalogue grossiste
              et commencez à passer vos commandes.
            </li>
            <Divider color="20" />
          </ul>
        </address>
      </div>
    </Section>
  );
}
