import {CollectionsImage, Section} from '~/components';

export function Hero({data}) {
  return (
    <Section gap="small" className="h-[90vh] max-sm:justify-between sm:hidden">
      <CollectionsImage data={data.nodes} />
    </Section>
  );
}
