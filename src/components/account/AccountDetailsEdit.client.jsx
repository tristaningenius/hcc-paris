import {useState} from 'react';

import {Button, ErrorsLabel, Heading, Divider} from '~/components';
import {getInputStyleClasses} from '~/lib/styleUtils';
import {
  emailValidation,
  passwordValidation,
  useRenderServerComponents,
} from '~/lib/utils';

export function AccountDetailsEdit({
  firstName: _firstName = '',
  lastName: _lastName = '',
  phone: _phone = '',
  email: _email = '',
  close,
}) {
  const [saving, setSaving] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [firstName, setFirstName] = useState(_firstName);
  const [lastName, setLastName] = useState(_lastName);
  const [unformatedPhone, setUnformatedPhone] = useState(_phone);
  const [phone, setPhone] = useState(_phone);
  const [email, setEmail] = useState(_email);
  const [emailError, setEmailError] = useState(null);
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [newPassword2Error, setNewPassword2Error] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setNewPassword2Error(null);

    const emailError = emailValidation(event.currentTarget.email);
    if (emailError) {
      setEmailError(emailError);
    }

    let currentPasswordError, newPasswordError, newPassword2Error;

    // Only validate the password fields if the current password has a value
    if (event.currentTarget.currentPassword?.value) {
      currentPasswordError = passwordValidation(
        event.currentTarget.currentPassword,
      );
      if (currentPasswordError) {
        setCurrentPasswordError(currentPasswordError);
      }

      newPasswordError = passwordValidation(event.currentTarget.newPassword);
      if (newPasswordError) {
        setNewPasswordError(newPasswordError);
      }

      newPassword2Error =
        event.currentTarget.newPassword?.value !==
        event.currentTarget.newPassword2?.value
          ? 'Les 2 mots de passe ne sont pas identiques'
          : null;
      if (newPassword2Error) {
        setNewPassword2Error(newPassword2Error);
      }
    }

    if (
      emailError ||
      currentPasswordError ||
      newPasswordError ||
      newPassword2Error
    ) {
      return;
    }

    setSaving(true);

    const accountUpdateResponse = await callAccountUpdateApi({
      email,
      newPassword: event.currentTarget.newPassword?.value,
      currentPassword: event.currentTarget.currentPassword?.value,
      phone,
      firstName,
      lastName,
    });

    setSaving(false);

    if (accountUpdateResponse.error) {
      setSubmitError(accountUpdateResponse.error);
      return;
    }

    renderServerComponents();
    close();
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex max-w-2xl flex-col gap-4"
    >
      {submitError && <ErrorsLabel>{submitError}</ErrorsLabel>}
      {currentPasswordError || newPasswordError ? (
        <ErrorsLabel>
          Votre mot de passe doit faire au moins 6 caractères.
        </ErrorsLabel>
      ) : (
        ''
      )}
      {emailError && <ErrorsLabel>{emailError}</ErrorsLabel>}
      {newPassword2Error && <ErrorsLabel>{newPassword2Error}</ErrorsLabel>}
      <div className="flex flex-col gap-2">
        <Heading size="section-s">Mettre à jour votre profil</Heading>
        <input
          id="firstname"
          name="firstname"
          type="text"
          autoComplete="given-name"
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
          placeholder="Nom"
          aria-label="Nom"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
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
            const formattedValue = event.target.value
              .replace(/\s+/g, '')
              .startsWith('0')
              ? '+33' + event.target.value.replace(/\s+/g, '').slice(1)
              : event.target.value.replace(/\s+/g, '');
            setPhone(formattedValue);
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
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className={getInputStyleClasses(emailError)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Heading size="section-s">
            {isPasswordEdit ? 'Modifier le mot de passe' : ' '}
          </Heading>
          {isPasswordEdit ? (
            <Button
              type="button"
              onClick={() => setIsPasswordEdit(false)}
              variant="link"
            >
              Annuler
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setIsPasswordEdit(true)}
              variant="link"
            >
              Modifier le mot de passe
            </Button>
          )}
        </div>
        {isPasswordEdit && (
          <>
            <Password
              name="currentPassword"
              label="Mot de passe actuel"
              passwordError={currentPasswordError}
            />
            <Divider color="20" />
            <Password
              name="newPassword"
              label="Nouveau mot de passe"
              passwordError={newPasswordError}
            />
            <Password
              name="newPassword2"
              label="Saisir à nouveau le mot de passe"
              passwordError={newPassword2Error}
            />
          </>
        )}

        <Button type="submit" disabled={saving}>
          Enregistrer
        </Button>
      </div>
    </form>
  );
}

function Password({name, label}) {
  const [password, setPassword] = useState('');

  return (
    <>
      <input
        id={name}
        name={name}
        type="password"
        autoComplete={
          name === 'currentPassword' ? 'current-password' : undefined
        }
        placeholder={label}
        aria-label={label}
        value={password}
        minLength={8}
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        className={getInputStyleClasses()}
      />
    </>
  );
}

export async function callAccountUpdateApi({
  email,
  phone,
  firstName,
  lastName,
  currentPassword,
  newPassword,
}) {
  try {
    const res = await fetch(`/account`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        firstName,
        lastName,
        currentPassword,
        newPassword,
      }),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: "Erreur à l'enregistrement, veuillez réessayer",
    };
  }
}
