import {Link} from '@shopify/hydrogen';

export function Button({
  as = 'button',
  className = '',
  variant = 'primary',
  width = 'auto',
  ...props
}) {
  const Component = props?.to ? Link : as;

  const baseButtonClasses =
    'flex justify-center items-center font-display font-medium text-2xl text-center px-6 min-h-[3rem] tracking-wide uppercase gap-2 pt-1';
  const baseButtonClassesSmall =
    'flex justify-center items-center font-display text-lg text-center px-3 min-h-[2.5rem] tracking-wide uppercase gap-2 pt-1';
  const baseButtonClassesInline =
    'min-h-[2.5rem] underline underline-offset-2 decoration-1 inline-block';

  const variants = {
    primary: `${baseButtonClasses} text-tertiary-100 bg-primary-600 hover:bg-primary-700 active:bg-primary-800`,
    'primary-small': `${baseButtonClassesSmall} text-tertiary-100 bg-primary-600 hover:bg-primary-700 active:bg-primary-800`,
    secondary: `${baseButtonClasses} text-tertiary-100 bg-neutral-600 hover:bg-neutral-500 active:bg-neutral-400 `,
    'secondary-small': `${baseButtonClassesSmall} text-tertiary-100 bg-neutral-600 hover:bg-neutral-500 active:bg-neutral-400`,
    outlined: `${baseButtonClasses} border hover:bg-tertiary-100 active:bg-tertiary-300`,
    inline: `pt-1 min-h-[1rem] inline-block font-display text-2xl font-medium tracking-wide uppercase text-neutral-600 hover:text-primary-600 active:text-primary-800`,
    link: `${baseButtonClassesInline} text-lg text-neutral-600 hover:text-primary-600 active:text-primary-800`,
    linkFooter: `inline-block text-neutral-600 hover:text-primary-600 active:text-primary-800`,
    linkDanger: `${baseButtonClassesInline} text-danger-700 hover:text-danger-600 active:text-danger-800`,
    linksm: `${baseButtonClassesInline} text-trans-80 text-sm hover:text-primary-600 active:text-primary-800`,
  };

  const widths = {
    auto: 'w-auto',
    full: 'w-full',
  };

  const styles = `${className} ${variants[variant]} ${widths[width]} select-none`;

  return <Component className={styles} {...props} />;
}
