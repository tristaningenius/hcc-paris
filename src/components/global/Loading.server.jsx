import {LogoStar} from '~/components';

export function Loading() {
  return (
    <div className="absolute inset-0 m-0 flex h-screen items-center justify-center">
      <LogoStar className="logo-rotate fill-primary-600" size="20vw" />
    </div>
  );
}
