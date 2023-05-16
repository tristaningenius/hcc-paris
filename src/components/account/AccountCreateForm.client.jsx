import { useState } from 'react';
// import { useNavigate } from '@shopify/hydrogen/client';

import { emailValidation, passwordValidation, getInputStyleClasses } from 'lib';
import { Button, ErrorsLabel, Section, Heading } from 'components/elements';
import { callLoginApi } from '../account/AccountLoginForm.client';

export function AccountCreateForm() {
  // const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

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

    // navigate('/account');
  }

  return (
    <Section gap="large" maxW>
      <Heading>Créer un compte.</Heading>

      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        {!emailError ? '' : <ErrorsLabel>{emailError} &nbsp;</ErrorsLabel>}
        {submitError && <ErrorsLabel>{submitError}</ErrorsLabel>}
        {!passwordError ? '' : <ErrorsLabel>{passwordError} &nbsp;</ErrorsLabel>}
        <div className="flex w-full gap-2 max-sm:flex-wrap">
          <input
            id="firstname"
            name="firstname"
            type="text"
            autoComplete="given-name"
            required
            placeholder="Prénom"
            aria-label="Prénom"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            className={getInputStyleClasses()}
          />
          <input
            id="lastname"
            name="lastname"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Nom"
            aria-label="Nom"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            className={getInputStyleClasses()}
          />
        </div>
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
        <Button type="submit">Créer un compte</Button>
        <div>
          Disposez-vous d&apos;un compte ? &nbsp;
          <Button variant="link" to="/account">
            Se connecter
          </Button>
        </div>
      </form>
    </Section>
  );
}

//No style needed
export async function callAccountCreateApi({ email, password, firstName, lastName }) {
  try {
    const res = await fetch(`/account/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
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
