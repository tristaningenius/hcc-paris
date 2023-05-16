import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { statusMessage } from 'lib/utils';
import { Label, Text, Heading } from 'components/elements';

export function OrderCard({ order }) {
  if (!order?.id) return null;
  const legacyOrderId = order.id.split('/').pop().split('?')[0];
  // const lineItems = flattenConnection(order?.lineItems);

  return (
    <li className="border-b border-trans-20 py-6 sm:max-w-[15rem]">
      {/*<Link className="flex gap-2 sm:flex-col" to={`/account/orders/${legacyOrderId}`}>*/}
      <Link className="flex gap-2 sm:flex-col" href="#">
        {/*{lineItems[0].variant?.image && (*/}
        {/*  <div className="w-[30%] sm:w-[100%]">*/}
        {/*    <Image*/}
        {/*      width={112}*/}
        {/*      height={112}*/}
        {/*      widths={[112]}*/}
        {/*      alt={lineItems[0].variant?.image?.altText ?? 'Order image'}*/}
        {/*      data={lineItems[0].variant?.image}*/}
        {/*      loaderOptions={{ scale: 2, crop: 'center' }}*/}
        {/*      className="bg-tertiary-100 w-full rounded-2xl"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
        <div className="flex w-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <Heading size="section-s">#{order.orderNumber}</Heading>
              <Text color="sub">{new Date(order.processedAt).toLocaleDateString('fr-FR')}</Text>
            </div>
            <Label variant="neutral">{statusMessage(order.fulfillmentStatus)}</Label>
          </div>

          {/*<h3 className="text-lg">*/}
          {/*  {lineItems.length > 1 ? (*/}
          {/*    <Fragment>*/}
          {/*      {lineItems[0].title}*/}
          {/*      <span className="text-trans-50">&nbsp; + {lineItems.length - 1}</span>*/}
          {/*    </Fragment>*/}
          {/*  ) : (*/}
          {/*    lineItems[0].title*/}
          {/*  )}*/}
          {/*</h3>*/}
        </div>
      </Link>
    </li>
  );
}
