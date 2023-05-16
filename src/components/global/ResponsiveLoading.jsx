import { LogoStar } from 'components';

export function ResponsiveLoading({ size = '2rem', color = 'fill-tertiary-200' }) {
  return <LogoStar className={`logo-rotate ${color}`} size={size} />;
}
