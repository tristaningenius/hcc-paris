// export function useRenderServerComponents() {
//   const { serverProps, setServerProps } = useServerProps();
//
//   return useCallback(() => {
//     setServerProps('renderRsc', !serverProps.renderRsc);
//   }, [serverProps, setServerProps]);
// }

export function getApiErrorMessage(field, data, errors) {
  if (errors?.length) return errors[0].message ?? errors[0];
  if (data?.[field]?.customerUserErrors?.length) return data[field].customerUserErrors[0].message;
  return null;
}

export function emailValidation(email) {
  if (email.validity.valid) return null;

  return email.validity.valueMissing ? 'Veuillez indiquer un Email' : 'Veuillez indiquer un Email valide';
}

export function passwordValidation(password) {
  if (password.validity.valid) return null;

  if (password.validity.valueMissing) {
    return 'Veuillez indiquer un mot de passe';
  }

  return 'Le mot de passe doit contenir au moins 6 caractère';
}

export function statusMessage(status) {
  const translations = {
    ATTEMPTED_DELIVERY: 'Livraison tentée',
    CANCELED: 'Annulé',
    CONFIRMED: 'Confirmé',
    DELIVERED: 'Livré',
    FAILURE: 'Échec',
    FULFILLED: 'Rempli',
    IN_PROGRESS: 'En cours',
    IN_TRANSIT: 'En transit',
    LABEL_PRINTED: 'Etiquette imprimée',
    LABEL_PURCHASED: 'Etiquette achetée',
    LABEL_VOIDED: 'Etiquette annulée',
    MARKED_AS_FULFILLED: 'Marqué comme rempli',
    NOT_DELIVERED: 'Non livré',
    ON_HOLD: 'En attente',
    OPEN: 'Ouvert',
    OUT_FOR_DELIVERY: 'En cours de livraison',
    PARTIALLY_FULFILLED: 'Partiellement rempli',
    PENDING_FULFILLMENT: 'En attente',
    PICKED_UP: 'Récupéré',
    READY_FOR_PICKUP: 'Prêt à être récupéré',
    RESTOCKED: 'Réapprovisionné',
    SCHEDULED: 'Programmé',
    SUBMITTED: 'Soumis',
    UNFULFILLED: 'Non rempli',
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}

export function isDiscounted(price, compareAtPrice) {
  return price > compareAtPrice && compareAtPrice;
}

export function isNewArrival(date, daysOld = 30) {
  return new Date(date).valueOf() > new Date().setDate(new Date().getDate() - daysOld).valueOf();
}
