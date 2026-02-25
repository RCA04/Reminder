import React from 'react';

function DeleteConfirmModal({ open, wordName, onConfirm, onCancel, isDeleting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_0_60px_rgba(255,255,255,0.25)] p-6">
        <h2 className="text-lg font-semibold text-zinc-50 mb-2">
          Excluir palavra
        </h2>
        <p className="text-sm text-zinc-300 mb-4">
          Tem certeza que deseja excluir{' '}
          <span className="font-semibold text-zinc-50">{wordName}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-600 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-red-400 transition-colors disabled:opacity-60"
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
