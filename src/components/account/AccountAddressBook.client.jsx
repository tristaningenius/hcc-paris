import {useState, useMemo, useRef, useEffect} from 'react';
import {
  AccountAddressEdit,
  AccountDeleteAddress,
  Button,
  Label,
  Section,
  Heading,
  Text,
} from '~/components';

export function AccountAddressBook({addresses, defaultAddress}) {
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

  const {fullDefaultAddress, addressesWithoutDefault} = useMemo(() => {
    const defaultAddressIndex = addresses.findIndex(
      (address) => address.id === defaultAddress,
    );
    return {
      addressesWithoutDefault: [
        ...addresses.slice(0, defaultAddressIndex),
        ...addresses.slice(defaultAddressIndex + 1, addresses.length),
      ],
      fullDefaultAddress: addresses[defaultAddressIndex],
    };
  }, [addresses, defaultAddress]);

  function close() {
    setEditingAddress(null);
    setDeletingAddress(null);
  }

  function editAddress(address) {
    setEditingAddress(address);
  }

  const myRef = useRef(null);

  useEffect(() => {
    if (deletingAddress) {
      document.body.classList.add('body-modal_padding');
    } else {
      document.body.classList.remove('body-modal_padding');
    }
  }, [deletingAddress]);

  return (
    <Section gap="default" noDivide>
      <div ref={myRef} className="flex justify-between">
        <Heading size="section" as="h1">
          Adresses
        </Heading>
        {editingAddress ? (
          <Button variant="link" onClick={close}>
            Annuler
          </Button>
        ) : (
          <Button
            variant="link"
            onClick={() => {
              editAddress({
                /** empty address */
              });
            }}
          >
            Ajouter une adresse
          </Button>
        )}
      </div>

      {deletingAddress ? (
        <AccountDeleteAddress addressId={deletingAddress} close={close} />
      ) : null}
      {editingAddress ? (
        <AccountAddressEdit
          address={editingAddress}
          defaultAddress={fullDefaultAddress === editingAddress}
          close={close}
        />
      ) : null}
      {!addresses?.length ? (
        <Text>Vous n&apos;avez aucune adresse enregistrée.</Text>
      ) : null}
      {addresses?.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-2">
          {fullDefaultAddress ? (
            <Address
              myRef={myRef}
              address={fullDefaultAddress}
              defaultAddress
              setDeletingAddress={setDeletingAddress.bind(
                null,
                fullDefaultAddress.originalId,
              )}
              editAddress={editAddress}
            />
          ) : null}
          {addressesWithoutDefault.map((address, num) => (
            <Address
              myRef={myRef}
              num={num}
              key={address.id}
              address={address}
              setDeletingAddress={setDeletingAddress.bind(
                null,
                address.originalId,
              )}
              editAddress={editAddress}
            />
          ))}
        </div>
      ) : null}
    </Section>
  );
}

function Address({
  address,
  defaultAddress,
  editAddress,
  setDeletingAddress,
  num,
  myRef,
}) {
  return (
    <div className="flex flex-col gap-2 border p-3">
      {defaultAddress ? (
        <Label variant="secondary">Adresse par défaut</Label>
      ) : (
        <Label variant="tertiary">Adresse n°{num + 2}</Label>
      )}
      <div className="flex justify-between gap-4">
        <Button
          onClick={() => {
            editAddress(address);
            myRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
          }}
          variant="link"
        >
          Modifier
        </Button>
        <Button onClick={setDeletingAddress} variant="linkDanger">
          Supprimer
        </Button>
      </div>
      <ul>
        {address.firstName || address.lastName ? (
          <li className="font-semibold">
            {(address.firstName && address.firstName + ' ') + address.lastName}
          </li>
        ) : (
          <></>
        )}
        {address.formatted ? (
          address.formatted.map((line) => (
            <li className="text-trans-70" key={line}>
              {line}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
