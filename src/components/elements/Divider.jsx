export function Divider({ color = '90', className = '' }) {
  const colors = {
    90: 'bg-trans-90',
    50: 'bg-trans-50',
    20: 'bg-trans-20',
  };

  return <div className={`h-px w-full ${colors[color]} ${className}`} />;
}
