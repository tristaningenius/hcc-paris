import {useRef, useEffect} from 'react';
import {gsap, Power4} from 'gsap';

import {
  CollectionsImageDesktop,
  Section,
  LogoText,
  LogoStar,
} from '~/components';

export function HeroDesktop({data}) {
  const logoRef = useRef(null);
  useEffect(() => {
    const logo = logoRef.current;
    gsap.from(logo, {
      scaleY: 4,
      duration: 0.8,
    });
    gsap.to(logo, {
      translateY: 0,
      scaleY: 1,
      ease: Power4.easeOut,
      duration: 0.8,
    });
  });

  return (
    <Section gap="small" className="h-[90vh] max-sm:justify-between">
      <div className="relative hidden sm:block">
        <div className="overflow-hidden">
          <div className="translate-y-[-300%]" ref={logoRef}>
            <LogoText />
          </div>
        </div>

        <LogoStar
          className="logo-rotate absolute left-[16.75%] bottom-[-45%] z-10 fill-primary-600"
          size="20vw"
        />
      </div>
      <CollectionsImageDesktop data={data.nodes} />
    </Section>
  );
}
