import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Heading, Button, Text } from 'components/elements';
import { Modal } from 'components/global';

export function AgePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [refused, setRefused] = useState(false);

  useEffect(() => {
    const isOverAge = Cookies.get('isOverAge');
    if (isOverAge) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, [showPopup]);

  const handleConfirmAge = () => {
    Cookies.set('isOverAge', 'true', { expires: 365 });
    setShowPopup(false);
  };

  const handleRefuseAge = () => {
    setRefused(!refused);
  };

  return (
    showPopup && (
      <Modal close={showPopup}>
        <Heading size="section" className="text-center">
          {refused ? 'Accès refusé' : <span>Avez-vous plus de 18&nbsp;ans&nbsp;?</span>}
        </Heading>
        <Text size="product" className="text-center">
          Vous devez être majeur pour pouvoir accéder à notre site
        </Text>
        <div className="flex flex-col gap-2">
          {!refused && (
            <Button width="full" variant="secondary" onClick={handleConfirmAge}>
              J&apos;ai plus de 18 ans
            </Button>
          )}
          <Button variant="link" width="full" onClick={handleRefuseAge} className="text-center">
            {refused ? 'Retour' : <span>J&apos;ai moins de 18 ans</span>}
          </Button>
        </div>
      </Modal>
    )
  );
}
