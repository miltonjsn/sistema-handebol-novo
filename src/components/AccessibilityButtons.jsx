import React, { useEffect } from 'react';

function AccessibilityButtons() {
  useEffect(() => {
    const root = document.documentElement;

    const handleFontSize = (size) => {
      root.style.fontSize = size;
      localStorage.setItem('fontSize', size);
    };

    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
      root.style.fontSize = savedSize;
    }
  }, []);

  const increaseFont = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.min(currentSize + 2, 24); // tamanho máximo 24px
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', `${newSize}px`);
  };

  const decreaseFont = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.max(currentSize - 2, 12); // tamanho mínimo 12px
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', `${newSize}px`);
  };

  return (
    <div className="fixed bottom-4 left-4 flex gap-2 z-50">
      <button
        onClick={increaseFont}
        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
        aria-label="Aumentar tamanho da fonte"
      >
        A+
      </button>
      <button
        onClick={decreaseFont}
        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
        aria-label="Diminuir tamanho da fonte"
      >
        A-
      </button>
    </div>
  );
}

export default AccessibilityButtons;
