import { Section, Heading, Accordion } from 'components/elements';

export function QuestionsProduits({ collectionName, correspondingFaq, type = 'default' }) {
  const faq = correspondingFaq.faq ? correspondingFaq.faq : correspondingFaq;
  const questionsTitle = collectionName.replace('-', ' ');
  return (
    <Section gap="large" noDivide className="my-8">
      <Heading as="h1" size="page" noBorder className="md:hidden">
        A propos de nos {questionsTitle}
      </Heading>
      <div className="flex flex-col gap-8 md:flex-row-reverse md:justify-center md:gap-20">
        <div className="w-full max-w-2xl">
          <Accordion data={faq} type={type} />
        </div>
        <aside className="text-right">
          <h2 className="font-[teko] text-5xl font-semibold uppercase max-md:hidden">
            A propos de nos {questionsTitle}
          </h2>
        </aside>
      </div>
    </Section>
  );
}
