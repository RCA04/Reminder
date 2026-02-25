import React, { useEffect, useState } from 'react';
import { wordsService } from './services/api';
import Header from './components/Header';
import DataList from './components/DataList';
import AddWordModal from './components/AddWordModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import AddWordButton from './components/AddWordButton';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null)
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await wordsService.getAll();
        setWords(response.data || []);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar as palavras.');
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setUserName(user.name)
    setUserId(user.id)
  };

  const openAddModal = () => {
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = async (payload) => {
    setFormError(null);
    if (!payload.word?.trim() || !payload.translation?.trim()) {
      setFormError('Preencha todos os campos.');
      return;
    }
    const ratingNumber = Number(payload.rating);
    if (Number.isNaN(ratingNumber)) {
      setFormError('O nível deve ser um número.');
      return;
    }
    try {
      setIsSaving(true);
      const response = await wordsService.create({
        word: payload.word.trim(),
        translation: payload.translation.trim(),
        rating: ratingNumber,
        user_id: payload.user_id,
      });
      setWords((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      setFormError('Erro ao salvar a palavra.');
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteModal = (item) => setDeleteTarget(item);
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await wordsService.remove(deleteTarget.id);
      setWords((prev) => prev.filter((w) => w.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir a palavra.');
    } finally {
      setIsDeleting(false);
    }
  };
  const handleCancelDelete = () => setDeleteTarget(null);

  console.log(userId)

  if (!currentUser) {
    if (authMode === 'login') {
      return (
        <Login
          onAuthSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setAuthMode('register')}
        />
      );
    }
    return (
      <Register
        onAuthSuccess={handleAuthSuccess}
        onSwitchToLogin={() => setAuthMode('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-950 to-zinc-900 text-zinc-50 flex items-center justify-center px-4 py-10 relative">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl backdrop-blur-md p-6 md:p-8 lg:p-10">
          <header className="mb-6 md:mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Header user={userName} />
          </header>

          {loading && (
            <p className="text-zinc-400 text-sm md:text-base">Carregando palavras...</p>
          )}

          {error && (
            <p className="text-red-400 text-sm md:text-base mb-4">{error}</p>
          )}

          {!loading && !error && words.length === 0 && (
            <p className="text-zinc-400 text-sm md:text-base">
              Nenhuma palavra cadastrada ainda. Clique no botão abaixo para adicionar a primeira.
            </p>
          )}

          {!loading && !error && words.length > 0 && (
            <DataList words={words} onDelete={openDeleteModal}/>
          )}
        </div>
      </div>

      <AddWordButton onClick={openAddModal} />

      <AddWordModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isSaving={isSaving}
        formError={formError}
        user={userId}
      />

      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        wordName={deleteTarget?.word ?? ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default App;
