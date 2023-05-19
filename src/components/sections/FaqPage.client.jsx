import { createRef, useEffect, useState } from 'react';
import { Heading, Section, Button } from 'components';

export function FaqPage({ data }) {
  const [refs, setRefs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setRefs((refs) =>
      Array(data.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [data.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = refs.map((ref) => ref.current.getBoundingClientRect());
      const visibleIndex = sections.findIndex((section) => section.top >= 0 && section.top <= window.innerHeight);
      if (visibleIndex >= 0) {
        setActiveIndex(visibleIndex);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refs]);

  const handleClick = (index) => {
    if (refs[index] && refs[index].current) {
      refs[index].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Section gap="large" noDivide className="md:mt-20">
      <Heading as="h1" size="page" noBorder className="md:hidden">
        Foire aux questions
      </Heading>
      <div className="flex flex-col gap-24 md:flex-row-reverse md:justify-center md:gap-20">
        <div className="flex max-w-2xl grow flex-col max-md:gap-20">
          {data.map((questions, index) => (
            <div ref={refs[index]} className="flex flex-col gap-6 lg:pt-20" key={`Faq_${questions.fields[1].value}`}>
              <Heading size="section" className="text-center md:text-left">
                {questions.fields[1].value}
              </Heading>
            </div>
          ))}
        </div>
        <aside className="mt-20 shrink-0 max-md:hidden">
          <nav className="sticky top-20">
            <ul className="flex flex-col gap-1">
              <h1 className="font-[teko] text-5xl font-semibold uppercase">FAQs</h1>
              {data.map((questions, index) => (
                <li key={`link_${questions.fields[1].value}`}>
                  <Button
                    className={index === activeIndex ? 'text-primary-600' : ''}
                    onClick={() => handleClick(index)}
                    variant="linkFooter"
                  >
                    {questions.fields[1].value}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </Section>
  );
}
