export function Text({
  as: Component = 'p',
  className = '',
  color = 'default',
  size = 'default',
  width = 'default',
  weight = 'regular',
  ...props
}) {
  const colors = {
    default: 'text-trans-90',
    second: 'text-trans-70',
    sub: 'text-trans-50',
    product: 'inherit',
  };

  const sizes = {
    default: 'inherit',
    product: 'text-lg',
    small: 'text-sm',
  };

  const widths = {
    default: 'max-w-prose',
    narrow: 'max-w-prose-narrow',
    wide: 'max-w-5xl',
  };

  const weights = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  };

  const styles = `${className} ${widths[width]} ${weights[weight]} ${colors[color]} ${sizes[size]}`;

  return <Component {...props} className={styles} />;
}
