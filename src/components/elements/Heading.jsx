export function Heading({
  as: Component = 'h2',
  className = '',
  size = 'page',
  width = 'default',
  noBorder,
  ...props
}) {
  const sizes = {
    page: `text-[calc(6vw+1.5rem)] leading-[calc(6.25vw+1.75rem)] font-semibold ${
      noBorder ? undefined : 'border-b border-trans-50'
    } break-words pt-6`,
    section: ' text-4xl sm:text-6xl font-medium mb-[-0.75rem]',
    'section-s': 'text-3xl',
    'section-xs': 'text-2xl tracking-wide',
  };

  const widths = {
    default: 'max-w-prose',
    narrow: 'max-w-prose-narrow',
    wide: 'max-w-prose-wide',
  };
  const baseHeadingClasses = 'font-[teko] uppercase';

  const styles = `${className} ${baseHeadingClasses} ${widths[width]} ${sizes[size]}`;

  return <Component {...props} className={styles} />;
}
