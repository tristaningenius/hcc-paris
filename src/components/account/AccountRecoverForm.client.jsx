import { useState } from 'react';

import { emailValidation, getInputStyleClasses } from 'lib';
import { Button, ErrorsLabel, Section, Heading, Text } from 'components';

export function AccountRecoverForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setSubmitError(null);

    const newEmailError = emailValidation(event.currentTarget.email);

    if (newEmailError) {
      setEmailError(newEmailError);
      return;
    }

    await callAccountRecoverApi({
      email,
    });

    setEmail('');
    setSubmitSuccess(true);
  }

  return (
    <Section gap="large" noDivide maxW>
      {submitSuccess ? (
        <>
          <Heading as="h1">Requête envoyé</Heading>
          <Text>
            Si votre Email existe dans notre systeme vous recevrez dans quelques minutes un Email avec les instructions
            de réinitialisation.
          </Text>
        </>
      ) : (
        <>
          <Heading as="h1">Réinitialiser mon mot de passe</Heading>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text>Indiquez l'Email du compte à réinitialiser.</Text>
        </>
      )}
      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        {!emailError ? '' : <ErrorsLabel>{emailError} &nbsp;</ErrorsLabel>}
        {submitError && <ErrorsLabel>{submitError}</ErrorsLabel>}

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          aria-label="Email address"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className={getInputStyleClasses(emailError)}
        />
        <Button type="submit">Demander le lien</Button>
      </form>
    </Section>
  );
}

export async function callAccountRecoverApi({ email, password, firstName, lastName }) {
  try {
    const res = await fetch(`/account/recover`, {
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
