import Image from 'next/image';
import logoText from '../../assets/logo-text.svg';

import fleur from '../../assets/logo-fleur.svg';
import fleurHhc from '../../assets/logo-fleur-hhc.svg';
import resine from '../../assets/logo-resine.svg';
import resineHhc from '../../assets/logo-resine-hhc.svg';
import huile from '../../assets/logo-huile.svg';
import huileHhc from '../../assets/logo-huile-hhc.svg';
import vape from '../../assets/logo-vape.svg';
import vapeHhc from '../../assets/logo-vape-hhc.svg';
import produit from '../../assets/logo-produit.svg';

export function LogoText() {
  return (
    <div className={'h-[300px]'}>
      <Image src={logoText} width="100%" height="100%" className="z-0 w-full" alt="HHC Paris Logo text" />
    </div>
  );
}
export function LogoTextCollectionHero({ collectionHandle = 'produits' }) {
  const collectionUrls = {
    'fleurs-hhc': fleur,
    'resines-hhc': resine,
    'vapes-hhc': vape,
    'huiles-hhc': huile,
    produits: produit,
  };

  const collectionSrc = collectionUrls[collectionHandle];

  return (
    <>
      <Image
        src={collectionSrc}
        width="100%"
        height="100%"
        loading="eager"
        className="z-0 h-full w-full"
        alt="HHC Paris Logo de la collection fleur"
      />
    </>
  );
}
export function LogoTextCollection({ collectionHandle = 'produits' }) {
  const collectionUrls = {
    'fleurs-hhc': fleurHhc,
    'resines-hhc': resineHhc,
    'vapes-hhc': vapeHhc,
    'huiles-hhc': huileHhc,
    produits: produit,
  };

  const collectionSrc = collectionUrls[collectionHandle];

  return (
    <>
      <Image
        src={collectionSrc}
        width="100%"
        height="100%"
        className="z-0 h-full w-full"
        alt="HHC Paris Logo de la collection fleur"
      />
    </>
  );
}

export function LogoStar({ className = '', size = '64' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M252.203 2.98568C253.169 -0.995243 258.831 -0.995218 259.797 2.9857L295.862 151.52C296.486 154.092 299.432 155.312 301.692 153.935L432.223 74.4067C435.721 72.2753 439.725 76.2786 437.593 79.777L358.065 210.308C356.688 212.568 357.908 215.514 360.48 216.138L509.014 252.203C512.995 253.169 512.995 258.831 509.014 259.797L360.48 295.862C357.908 296.486 356.688 299.432 358.065 301.692L437.593 432.223C439.725 435.721 435.721 439.725 432.223 437.593L301.692 358.065C299.432 356.688 296.486 357.908 295.862 360.48L259.797 509.014C258.831 512.995 253.169 512.995 252.203 509.014L216.138 360.48C215.514 357.908 212.568 356.688 210.308 358.065L79.777 437.593C76.2786 439.725 72.2753 435.721 74.4067 432.223L153.935 301.692C155.312 299.432 154.092 296.486 151.52 295.862L2.98568 259.797C-0.995243 258.831 -0.995218 253.169 2.9857 252.203L151.52 216.138C154.092 215.514 155.312 212.568 153.935 210.308L74.4067 79.777C72.2753 76.2786 76.2786 72.2753 79.777 74.4067L210.308 153.935C212.568 155.312 215.514 154.092 216.138 151.52L252.203 2.98568Z" />
    </svg>
  );
}
