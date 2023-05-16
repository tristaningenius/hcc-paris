export function Tag({ className = '', variant = 'primary', ...props }) {
  const baseTagClasses =
    'inline py-2 pr-1 font-display text-center uppercase text-lg tracking-widest font-medium md:text-2xl';
  const variants = {
    primary: `${baseTagClasses}  bg-primary-600 text-tertiary-100`,
    neutral: `${baseTagClasses}  bg-neutral-600 text-tertiary-100`,
    secondary: `${baseTagClasses} bg-secondary-600 text-tertiary-100`,
    tertiary: `${baseTagClasses}  bg-tertiary-600 text-neutral-600`,
  };

  const styles = `${variants[variant]} ${className}`;

  return <div className={styles} {...props} />;
}
