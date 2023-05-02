export function Label({ className = '', variant = 'primary', ...props }) {
  const baseLabelClasses =
    'inline px-2 pt-[3px] font-display text-center uppercase font-medium tracking-wide md:text-2xl'
  const variants = {
    primary: `${baseLabelClasses}  bg-primary-600 text-tertiary-100`,
    neutral: `${baseLabelClasses}  bg-neutral-600 text-tertiary-100`,
    secondary: `${baseLabelClasses} bg-secondary-600 text-tertiary-100`,
    tertiary: `${baseLabelClasses}  bg-tertiary-600 text-neutral-600`,
    outlined: `${baseLabelClasses}  border text-neutral-600`,
  }

  const styles = `${variants[variant]} ${className}`

  return <div className={styles} {...props} />
}
