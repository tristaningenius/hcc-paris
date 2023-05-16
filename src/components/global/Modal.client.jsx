import { useRef } from 'react';

export function Modal({ close, children }) {
  const backgroundRef = useRef(null);

  function handleBackgroundClick(event) {
    if (event.target === backgroundRef.current) {
      close();
    }
  }

  return (
    <aside className="fixed inset-0 z-50 h-screen w-screen">
      <div
        onClick={handleBackgroundClick}
        onKeyDown={handleBackgroundClick}
        tabIndex="0"
        aria-label="Fermer le popup"
        ref={backgroundRef}
        role="button"
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-trans-20"
      />
      <div className="flex h-full w-full items-center justify-center">
        <div className="z-50 flex w-[90%] max-w-xl flex-col justify-center gap-4 border-8 bg-tertiary-200 p-4">
          {children}
        </div>
      </div>
    </aside>
  );
}
