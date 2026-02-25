import React, { useState, useEffect } from 'react';

const INITIAL_FORM = { word: '', translation: '', rating: '', user_id: 0};

function AddWordModal({ open, onClose, onSubmit, isSaving, formError, user }) {
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    if (open) setForm(INITIAL_FORM);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      word: form.word.trim(),
      translation: form.translation.trim(),
      rating: Number(form.rating),
      user_id:Number(user)
    };
    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_0_60px_rgba(255,255,255,0.25)] p-6 md:p-7">
        <h2 className="text-xl font-semibold text-zinc-50 mb-4">
          Adicionar nova palavra
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="add-word">
              Palavra
            </label>
            <input
              id="add-word"
              name="word"
              type="text"
              value={form.word}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-transparent"
              placeholder="Ex: apple"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="add-translation">
              Tradução
            </label>
            <input
              id="add-translation"
              name="translation"
              type="text"
              value={form.translation}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-transparent"
              placeholder="Ex: maçã"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300" htmlFor="add-rating">
              Nível (número)
            </label>
            <input
              id="add-rating"
              name="rating"
              type="number"
              min="0"
              value={form.rating}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-transparent"
              placeholder="Ex: 1"
            />
          </div>

          {formError && (
            <p className="text-sm text-red-400">{formError}</p>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-600 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800/80 transition-colors"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWordModal;
