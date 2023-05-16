import { CollectionsImage } from 'components/sections';
import { Section } from 'components/elements';

export function Hero({ data }) {
  return (
    <Section gap="small" className="h-[90vh] max-sm:justify-between sm:hidden">
      <CollectionsImage data={data} />
    </Section>
  );
}
