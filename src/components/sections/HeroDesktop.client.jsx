import { useRef, useEffect } from 'react';
import { gsap, Power4 } from 'gsap';

import { Section, LogoText, LogoStar } from 'components/elements';
import { CollectionsImageDesktop } from 'components/sections';

export function HeroDesktop({ data }) {
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
    <Section gap="small" className="h-[90vh] w-full max-sm:justify-between">
      <div className=" hidden h-[300px] sm:block ">
        <div className="h-full overflow-hidden ">
          <div className="h-full w-full translate-y-[-300%]" ref={logoRef}>
            <LogoText />
          </div>
        </div>
        <LogoStar className="logo-rotate absolute left-[16.75%] top-[30%] z-10 fill-[#DF6C4FFF]" size="20vw" />
      </div>
      <CollectionsImageDesktop data={data} />
    </Section>
  );
}
