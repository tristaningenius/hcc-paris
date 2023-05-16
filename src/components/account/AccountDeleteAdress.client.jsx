import { useRenderServerComponents } from 'lib/utils';
import { Button, Heading, Modal } from 'components';

export function AccountDeleteAddress({ addressId, close }) {
  const renderServerComponents = useRenderServerComponents();

  async function deleteAddress(id) {
    const response = await callDeleteAddressApi(id);
    if (response.error) {
      alert(response.error);
      return;
    }
    renderServerComponents();
    close();
  }

  return (
    <Modal close={close}>
      <Heading size="section-s" className="text-center">
        Confirmer la suppression de l&apos;adresse ?
      </Heading>
      <div className="flex flex-col gap-2">
        <Button
          width="full"
          variant="secondary"
          onClick={() => {
            deleteAddress(addressId);
          }}
        >
          Confirmer
        </Button>
        <Button variant="link" onClick={close} width="full" className="text-center">
          Annuler
        </Button>
      </div>
    </Modal>
  );
}

export async function callDeleteAddressApi(id) {
  try {
    const res = await fetch(`/account/address/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error removing address. Please try again.',
    };
  }
}
