import { useState } from 'react';
import { useNavigate } from '@shopify/hydrogen/client';
import emailjs from '@emailjs/browser';

import { emailValidation, passwordValidation, getInputStyleClasses } from 'lib';
import { Button, ErrorsLabel, Section, Heading } from 'components';
import { callLoginApi } from './AccountLoginForm.client';

export function AccountCreateProForm() {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [siret, setSiret] = useState('');
  const [tva, setTva] = useState('');
  const [phone, setPhone] = useState('');
  const [unformatedPhone, setUnformatedPhone] = useState('');

  const firstName = 'PRO';

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setSubmitError(null);

    const newEmailError = emailValidation(event.currentTarget.email);
    if (newEmailError) {
      setEmailError(newEmailError);
    }

    const newPasswordError = passwordValidation(event.currentTarget.password);
    if (newPasswordError) {
      setPasswordError(newPasswordError);
    }

    if (newEmailError || newPasswordError) {
      return;
    }

    const accountCreateResponse = await callAccountCreateApi({
      email,
      password,
      phone,
      firstName,
      lastName,
    });

    if (accountCreateResponse.error) {
      setSubmitError(accountCreateResponse.error);
      return;
    }

    // this can be avoided if customerCreate mutation returns customerAccessToken
    await callLoginApi({
      email,
      password,
    });

    const templateParams = {
      email,
      lastName,
      siret,
      tva,
    };

    emailjs.send('service_ukx4tu1', 'template_2pqlbja', templateParams, 'AGHp1N_02SuQKPk22');

    navigate('/account');
  }

  return (
    <Section gap="large" maxW className="w-full">
      <Heading>Créer un compte pro.</Heading>

      <div>
        Ce formulaire est destiné aux professionnels qui souhaitent créer un compte pro afin d&apos;accéder aux tarifs
        grossiste.
      </div>

      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        {!emailError ? '' : <ErrorsLabel>{emailError} &nbsp;</ErrorsLabel>}
        {submitError && <ErrorsLabel>{submitError}</ErrorsLabel>}
        {!passwordError ? '' : <ErrorsLabel>{passwordError} &nbsp;</ErrorsLabel>}

        <input
          id="lastname"
          name="raison social"
          autoComplete="organization"
          placeholder="Raison Social"
          aria-label="Raison Social"
          type="text"
          required
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          className={getInputStyleClasses()}
        />

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          aria-label="Email"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className={getInputStyleClasses(emailError)}
        />
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          value={password}
          minLength={8}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className={getInputStyleClasses(passwordError)}
        />

        <input
          id="siret"
          name="SIRET"
          placeholder="SIRET"
          aria-label="SIRET"
          value={siret}
          required
          onChange={(event) => {
            setSiret(event.target.value);
          }}
          className={getInputStyleClasses()}
        />
        <input
          id="tva"
          name="Numéro de TVA"
          placeholder="Numéro de TVA"
          aria-label="Numéro de TVA"
          value={tva}
          required
          onChange={(event) => {
            setTva(event.target.value);
          }}
          className={getInputStyleClasses()}
        />
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Numéro de tel Français"
          aria-label="Numéro de tel Français"
          value={unformatedPhone}
          onChange={(event) => {
            setUnformatedPhone(event.target.value);
            const formattedValue = event.target.value.replace(/\s+/g, '').startsWith('0')
              ? '+33' + event.target.value.replace(/\s+/g, '').slice(1)
              : event.target.value.replace(/\s+/g, '');
            setPhone(formattedValue);
          }}
          className={getInputStyleClasses()}
        />

        <Button type="submit">Créer un compte professionnel</Button>
        <div>
          Disposez-vous d&apos;un compte particulier et souhaitez-vous le transformer en compte pro? &nbsp;
          <Button variant="link" to="/contact">
            Contactez-nous
          </Button>
        </div>
      </form>
    </Section>
  );
}

export async function callAccountCreateApi({ email, password, firstName, lastName, phone }) {
  try {
    const res = await fetch(`/pro/registerpro`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName, phone }),
    });
    if (res.status === 200) {
      return {};
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
