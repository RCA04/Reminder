import React, { useState } from 'react';
import { authService } from '../../services/api';

function Login({ onAuthSuccess, onSwitchToRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.email.trim() || !form.password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login({
        email: form.email.trim(),
        password: form.password,
      });
      onAuthSuccess?.(response.data.user);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Erro ao fazer login.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-950 to-zinc-900 text-zinc-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-3xl backdrop-blur-md p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-zinc-50">Entrar</h1>

          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300" htmlFor="login-email">
                E-mail
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-transparent"
                placeholder="voce@exemplo.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300" htmlFor="login-password">
                Senha
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-transparent"
                placeholder="Sua senha"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-xs md:text-sm text-emerald-400 hover:text-emerald-300 underline-offset-2 hover:underline"
            >
              Não tem conta? Cadastre-se
            </button>
            
            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

