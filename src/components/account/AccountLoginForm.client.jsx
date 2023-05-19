import { useState } from 'react';
import { useNavigate } from '@shopify/hydrogen/client';

import { Button, ErrorsLabel, Section, Heading, Divider } from 'components/elements';
import { getInputStyleClasses } from 'lib/styleUtils';

export function AccountLoginForm({ shopName }) {
  const navigate = useNavigate();

  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [showEmailField, setShowEmailField] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setHasSubmitError(false);
    setPasswordError(null);

    if (showEmailField) {
      checkEmail(event);
    } else {
      checkPassword(event);
    }
  }

  function checkEmail(event) {
    if (event.currentTarget.email.validity.valid) {
      setShowEmailField(false);
    } else {
      setEmailError('Veuillez indiquer un Email valide');
    }
  }

  async function checkPassword(event) {
    const validity = event.currentTarget.password.validity;
    if (validity.valid) {
      const response = await callLoginApi({
        email,
        password,
      });

      if (response.error) {
        setHasSubmitError(true);
        resetForm();
      } else {
        navigate('/account');
      }
    } else {
      setPasswordError(
        validity.valueMissing
          ? 'Veuillez indiquer un mot de passe'
          : 'Le mot de passe doit contenir au moins 6 caractère'
      );
    }
  }

  function resetForm() {
    setShowEmailField(true);
    setEmail('');
    setEmailError(null);
    setPassword('');
    setPasswordError(null);
  }

  return (
    <Section gap="large" noDivide maxW>
      <Heading as="h1" noBorder>
        Se connecter
      </Heading>
      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        {hasSubmitError && (
          <ErrorsLabel>
            Mot de passe ou Email non reconnu
            <br />
            Vérifiez vos identifiants ou créez un nouveau compte.
          </ErrorsLabel>
        )}
        {!emailError ? '' : <ErrorsLabel>{emailError} &nbsp;</ErrorsLabel>}
        {!passwordError ? '' : <ErrorsLabel> {passwordError} &nbsp;</ErrorsLabel>}
        {showEmailField && <EmailField shopName={shopName} email={email} setEmail={setEmail} emailError={emailError} />}
        {!showEmailField && <ValidEmail email={email} resetForm={resetForm} />}
        {!showEmailField && (
          <PasswordField password={password} setPassword={setPassword} passwordError={passwordError} />
        )}
      </form>
    </Section>
  );
}

export async function callLoginApi({ email, password }) {
  try {
    const res = await fetch(`/account/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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

function EmailField({ email, setEmail, emailError }) {
  return (
    <Section gap="large">
      <div className="flex flex-col gap-8">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className={getInputStyleClasses(emailError)}
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" width="full">
            Suivant
          </Button>
          <Button variant="secondary" to="/account/register">
            Créer un compte
          </Button>
        </div>
      </div>

      <Divider />
      <div>
        <Heading as="h2" size="section" className="text-trans-90">
          Avec un compte vous pouvez
        </Heading>
        <ul className="mt-4 list-disc pl-8 text-trans-70">
          <li>Acheter plus facilement et rapidement,</li>
          <li>Enregistrer plusieurs adresses,</li>
          <li>Profiter de notre programme de fidélité : un code de réduction de 5 € à 20 € en cumulant des points.</li>
        </ul>
      </div>
      <Section noDivide gap="large" className="rounded-2xl bg-tertiary-600 p-[calc(1vw+1rem)]">
        <Heading className="w-full pt-0" size="section" noBorder>
          La fidélité HHC Paris
        </Heading>

        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="max-w-[50rem] text-xl sm:text-2xl">
              Inscrivez-vous simplement chez HHC Paris pour profiter de notre excellent programme de fidélité.
            </p>
          </div>
          <h4 className="text-xl sm:text-2xl">1 € dépensé = 1 point, nos avantages : </h4>
          <address className="not-italic">
            <ul className="flex flex-col gap-4 uppercase">
              <li className="text-2xl sm:text-3xl">
                <span className="font-[teko] text-xl sm:text-2xl">100 points</span> 5&nbsp;€&nbsp;de&nbsp;réduction.
                <Divider color="20" className="mt-4" />
              </li>
              <li className="text-2xl sm:text-3xl">
                <span className="font-[teko] text-xl sm:text-2xl">200 points</span> 10&nbsp;€&nbsp;de&nbsp;réduction.
                <Divider color="20" className="mt-4" />
              </li>
              <li className="text-2xl sm:text-3xl">
                <span className="font-[teko] text-xl sm:text-2xl">400 points</span> 20&nbsp;€&nbsp;de&nbsp;réduction.
                <Divider color="20" className="mt-4" />
              </li>
            </ul>
          </address>
        </div>
      </Section>
    </Section>
  );
}

function ValidEmail({ email, resetForm }) {
  return (
    <>
      <Heading as="h3" size="section-s">
        Bienvenue,
      </Heading>
      <div>
        <Button variant="link" type="button" onClick={resetForm}>
          {email}
        </Button>
      </div>
    </>
  );
}

function PasswordField({ password, setPassword, passwordError }) {
  return (
    <>
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
      <Button type="submit">Se connecter</Button>
      <div>
        <Button variant="linksm" to="/account/recover">
          Mot de passe oublié ?
        </Button>
      </div>
    </>
  );
}
