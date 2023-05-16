import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { Button } from './Button';

export function ShareButtons({ text, url }) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`;

  const handleClick = (shareUrl) => {
    window.open(shareUrl, '_blank', 'width=550,height=420');
  };

  return (
    <ul className="flex justify-between gap-2">
      <li className="w-full">
        <Button onClick={() => handleClick(facebookShareUrl)} variant="outlined" width="full">
          <FacebookIcon iconFillColor="#242424" size={40} bgStyle={{ fill: 'none' }} className="h-full" />
        </Button>
      </li>
      <li></li>
      <li className="w-full">
        <Button onClick={() => handleClick(twitterShareUrl)} variant="outlined" width="full">
          <TwitterIcon iconFillColor="#242424" size={40} bgStyle={{ fill: 'none' }} className="h-full" />
        </Button>
      </li>
      <li className="w-full">
        <Button onClick={() => handleClick(whatsappShareUrl)} variant="outlined" width="full">
          <WhatsappIcon iconFillColor="#242424" size={40} bgStyle={{ fill: 'none' }} className="h-full" />
        </Button>
      </li>
    </ul>
  );
}
