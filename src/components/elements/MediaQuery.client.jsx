import { useWindowSize } from 'react-use';

export function Sm() {
  const { width } = useWindowSize();
  return width > 640;
}
export function Md() {
  const { width } = useWindowSize();
  return width > 768;
}
export function Lg() {
  const { width } = useWindowSize();
  return width > 1024;
}
export function Xl() {
  const { width } = useWindowSize();
  return width > 1280;
}
