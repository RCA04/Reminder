import React from 'react';

function AddWordButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 inline-flex items-center justify-center rounded-full bg-emerald-500 text-zinc-950 font-semibold shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:shadow-[0_0_45px_rgba(16,185,129,0.9)] transition-shadow w-14 h-14 md:w-16 md:h-16 text-3xl"
      aria-label="Adicionar nova palavra"
    >
      +
    </button>
  );
}

export default AddWordButton;
