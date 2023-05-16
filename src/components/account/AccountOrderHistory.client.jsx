import { Button, OrderCard, Heading, Text, Section } from 'components';

export function AccountOrderHistory({ orders }) {
  return (
    <Section gap="default" noDivide>
      <Heading as="h1" size="section">
        Historique des commandes
      </Heading>
      {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
    </Section>
  );
}

function EmptyOrders() {
  return (
    <div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Text>Vous n'avez passé aucune commande pour l'instant.</Text>
      <Button variant="link" to={'/'}>
        Visitez la boutique
      </Button>
    </div>
  );
}

function Orders({ orders }) {
  return (
    <ul className="flex flex-wrap sm:gap-8">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
