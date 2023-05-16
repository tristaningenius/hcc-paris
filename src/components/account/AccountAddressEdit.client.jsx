import { useMemo, useState } from 'react';
import { useRenderServerComponents, getInputStyleClasses } from 'lib';
import { Button, Heading, Text } from 'components';

export function AccountAddressEdit({ address, defaultAddress, close }) {
  const isNewAddress = useMemo(() => !Object.keys(address).length, [address]);

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [address1, setAddress1] = useState(address?.address1 || '');
  const [address2, setAddress2] = useState(address?.address2 || '');
  const [firstName, setFirstName] = useState(address?.firstName || '');
  const [lastName, setLastName] = useState(address?.lastName || '');
  const [company, setCompany] = useState(address?.company || '');
  const [country, setCountry] = useState(address?.country || '');
  const [province, setProvince] = useState(address?.province || '');
  const [city, setCity] = useState(address?.city || '');
  const [zip, setZip] = useState(address?.zip || '');
  const [phone, setPhone] = useState(address?.phone || '');
  const [isDefaultAddress, setIsDefaultAddress] = useState(defaultAddress);

  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function onSubmit(event) {
    event.preventDefault();

    setSaving(true);

    const response = await callUpdateAddressApi({
      id: address?.originalId,
      firstName,
      lastName,
      company,
      address1,
      address2,
      country,
      province,
      city,
      zip,
      phone,
      isDefaultAddress,
    });

    setSaving(false);

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    renderServerComponents();
    close();
  }

  return (
    <>
      <form noValidate onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-4">
        <Heading size="section-s">{isNewAddress ? 'Ajouter une adresse' : 'Modifier une adresse'}</Heading>
        {submitError && <Text>{submitError}</Text>}
        <input
          className={getInputStyleClasses()}
          id="firstname"
          name="firstname"
          required
          type="text"
          autoComplete="given-name"
          placeholder="Prénom"
          aria-label="Prénom"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />

        <input
          className={getInputStyleClasses()}
          id="lastname"
          name="lastname"
          required
          type="text"
          autoComplete="family-name"
          placeholder="Nom"
          aria-label="Nom"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />

        <input
          className={getInputStyleClasses()}
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Entreprise (Optionnel)"
          aria-label="Entreprise (Optionnel)"
          value={company}
          onChange={(event) => {
            setCompany(event.target.value);
          }}
        />

        <input
          className={getInputStyleClasses()}
          id="street1"
          name="street1"
          type="text"
          autoComplete="address-line1"
          placeholder="Adresse"
          required
          aria-label="Adresse"
          value={address1}
          onChange={(event) => {
            setAddress1(event.target.value);
          }}
        />

        <input
          className={getInputStyleClasses()}
          id="address2"
          name="address2"
          type="text"
          autoComplete="address-line2"
          placeholder="Information complémentaire (code, étage...) (Optionnel)"
          aria-label="Information complémentaire (code, étage...) (Optionnel)"
          value={address2}
          onChange={(event) => {
            setAddress2(event.target.value);
          }}
        />

        <input
          className={getInputStyleClasses()}
          id="city"
          name="city"
          type="text"
          required
          autoComplete="address-level2"
          placeholder="Ville"
          aria-label="Ville"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />

        <input
          className={getInputStyleClasses()}
          id="state"
          name="state"
          type="text"
          autoComplete="address-level1"
          placeholder="Région"
          required
          aria-label="Région"
          value={province}
          onChange={(event) => {
            setProvince(event.target.value);
          }}
        />
        <input
          className={getInputStyleClasses()}
          id="zip"
          name="zip"
          type="text"
          autoComplete="postal-code"
          placeholder="Code postal"
          required
          aria-label="Code postal"
          value={zip}
          onChange={(event) => {
            setZip(event.target.value);
          }}
        />
        <input
          className={getInputStyleClasses()}
          id="country"
          name="country"
          type="text"
          autoComplete="country-name"
          placeholder="Pays"
          required
          aria-label="Pays"
          value={country}
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <input
          className={getInputStyleClasses()}
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Téléphone"
          aria-label="Téléphone"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            value=""
            name="defaultAddress"
            id="defaultAddress"
            checked={isDefaultAddress}
            onChange={() => setIsDefaultAddress(!isDefaultAddress)}
            className="relative h-6 w-6 appearance-none border border-trans-50 bg-[#FCF8EE] after:absolute after:inset-0 after:m-auto after:h-3 after:w-3 after:content-[''] checked:border-primary-600 checked:after:bg-primary-700"
          />

          <label htmlFor="defaultAddress">Définir en tant qu&apos;adresse par défaut</label>
        </div>
        <div className="flex flex-col items-center">
          <Button type="submit" width="full" disabled={saving}>
            Enregistrer
          </Button>
          <Button variant="link" onClick={close}>
            Annuler
          </Button>
        </div>
      </form>
    </>
  );
}

export async function callUpdateAddressApi({
  id,
  firstName,
  lastName,
  company,
  address1,
  address2,
  country,
  province,
  city,
  phone,
  zip,
  isDefaultAddress,
}) {
  try {
    const res = await fetch(id ? `/account/address/${encodeURIComponent(id)}` : '/account/address', {
      method: id ? 'PATCH' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        company,
        address1,
        address2,
        country,
        province,
        city,
        phone,
        zip,
        isDefaultAddress,
      }),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error saving address. Please try again.',
    };
  }
}
