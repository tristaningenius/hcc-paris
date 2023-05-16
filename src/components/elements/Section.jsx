import { Divider } from './Divider';

export function Section({
  as: Component = 'section',
  noDivide,
  children,
  gap = 'noGap',
  className = '',
  row,
  maxW,
  ...props
}) {
  const gaps = {
    noGap: '',
    small: 'gap-2',
    default: 'gap-4',
    medium: 'gap-6',
    large: 'gap-10',
  };

  const baseSectionClasse = `flex ${row ? 'flex-row' : 'flex-col'} ${
    maxW ? 'sm:mx-auto max-w-2xl sm:justify-center sm:min-h-[80vh]' : 'undefined'
  }`;

  const styles = `${className} ${baseSectionClasse} ${gaps[gap]}`;

  return (
    <Component {...props} className={styles}>
      {children}
      {!noDivide && <Divider color="50" />}
    </Component>
  );
}
