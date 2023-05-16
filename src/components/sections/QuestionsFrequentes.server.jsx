import { Section, Heading, Button, Icon, Accordion } from 'components/elements';

export function QuestionsFrequentes({ faq }) {
  return (
    <Section gap="large" noDivide className="my-8">
      <Heading as="h1" size="page" noBorder className="md:hidden">
        Questions Fréquentes
      </Heading>
      <div className="flex flex-col gap-8 md:flex-row-reverse md:justify-center md:gap-20">
        <div className="w-full max-w-2xl">{<Accordion data={faq} />}</div>
        <aside className="text-right">
          <h2 className="font-display text-5xl font-semibold uppercase max-md:hidden">Questions Fréquentes</h2>
          <Button className="group" variant="linkFooter" to="/faqs">
            <>
              Consultez toutes les réponses
              <Icon
                size="20"
                icon="arrow_outward"
                color="ml-1 group-hover:fill-primary-600 group-active:fill-primary-700"
              />
            </>
          </Button>
        </aside>
      </div>
    </Section>
  );
}
