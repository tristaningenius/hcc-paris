import { useState } from 'react';
// import { useNavigate } from '@shopify/hydrogen/client';
import { Button, ErrorsLabel, Heading, Section, Text } from 'components/elements';
import { getInputStyleClasses } from 'lib';

export function AccountPasswordResetForm({ id, resetToken }) {
  // const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  function passwordValidation(form) {
    setPasswordError(null);
    setPasswordConfirmError(null);

    let hasError = false;

    if (!form.password.validity.valid) {
      hasError = true;
      setPasswordError(
        form.password.validity.valueMissing
          ? 'Indiquer le nouveau mot de passe.'
          : 'Votre mot de passe doit faire au moins 6 caractères.'
      );
    }

    if (!form.passwordConfirm.validity.valid) {
      hasError = true;
      setPasswordConfirmError(
        form.password.validity.valueMissing
          ? 'Indiquer à nouveau le mot de passe.'
          : 'Votre mot de passe doit faire au moins 6 caractères.'
      );
    }

    if (password !== passwordConfirm) {
      hasError = true;
      setPasswordConfirmError('Les 2 mots de passe ne sont pas identiques.');
    }

    return hasError;
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (passwordValidation(event.currentTarget)) {
      return;
    }

    const response = await callPasswordResetApi({
      id,
      resetToken,
      password,
    });

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    // navigate('/account');
  }

  return (
    <Section gap="large" noDivide maxW>
      <Heading as="h1">Réinitialiser le mot de passe</Heading>
      <Text>Entrer un nouveau mot de passe pour votre compte</Text>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-2">
        {submitError && <ErrorsLabel>{submitError}</ErrorsLabel>}
        {!passwordError ? '' : <ErrorsLabel>{passwordError}</ErrorsLabel>}
        {!passwordConfirmError ? '' : <ErrorsLabel>{passwordConfirmError}</ErrorsLabel>}
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Nouveau mot de passe"
          aria-label="Nouveau mot de passe"
          value={password}
          minLength={8}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className={getInputStyleClasses(passwordError)}
        />
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          autoComplete="current-password"
          placeholder="Saisir à nouveau le mot de passe"
          aria-label="Saisir à nouveau le mot de passe"
          value={passwordConfirm}
          required
          minLength={8}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
          className={getInputStyleClasses(passwordConfirmError)}
        />
        <Button type="submit">Valider</Button>
      </form>
    </Section>
  );
}

export async function callPasswordResetApi({ id, resetToken, password }) {
  try {
    const res = await fetch(`/account/reset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, resetToken, password }),
    });

    if (res.ok) {
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
