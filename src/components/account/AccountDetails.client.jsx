// import { Seo } from '@shopify/hydrogen';
import { useState } from 'react';
import { Button, Section, Heading } from 'components';

import { AccountDetailsEdit } from '../account/AccountDetailsEdit.client';

export function AccountDetails({ firstName, lastName, phone, email }) {
  const [isEditing, setIsEditing] = useState(false);

  const close = () => setIsEditing(false);

  return (
    <Section gap="default" className="w-full">
      <div className="mb-3 flex justify-between">
        <Heading as="h1" size="section">
          Détails du compte
        </Heading>
        {isEditing ? (
          <Button variant="link" onClick={close}>
            Annuler
          </Button>
        ) : (
          <Button variant="link" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>
        )}
      </div>
      {isEditing ? (
        <>
          <Seo type="noindex" data={{ title: 'Details du compte' }} />
          <AccountDetailsEdit firstName={firstName} lastName={lastName} phone={phone} email={email} close={close} />
        </>
      ) : (
        <dl className="grid grid-cols-4 md:grid-cols-1 md:text-lg">
          <dt className="font-light text-trans-70">Nom</dt>
          <dd className="col-span-3 text-right md:text-left">
            {firstName || lastName ? (
              (firstName ? firstName + ' ' : '') + (lastName ? lastName : '')
            ) : (
              <span className="text-trans-70">Non Renseigné</span>
            )}
          </dd>
          <dt className="font-light text-trans-70">Téléphone</dt>
          <dd className="col-span-3 text-right md:text-left">
            {phone ?? <span className="text-trans-70">Non Renseigné</span>}
          </dd>
          <dt className="font-light text-trans-70">Email</dt>
          <dd className="col-span-3 break-words text-right md:text-left">{email}</dd>
          <dt className="font-light text-trans-70">Mot de passe</dt>
          <dd className="col-span-3 break-words text-right md:text-left">************</dd>
        </dl>
      )}
    </Section>
  );
}
