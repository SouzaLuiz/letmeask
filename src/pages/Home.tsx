import { useHistory } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { TextField } from '../components/TextField';
import { AsideHome } from '../components/AsideHome';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    history.push('/rooms/new');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="hidden sm:flex flex-1 flex-col bg-primary items-start justify-center p-10">
        <AsideHome />
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center">
        <img src={logoImg} alt="LetMeAsk" className="mb-10" />

        <button
          onClick={handleCreateRoom}
          type="button"
          className="bg-red-500 w-72 flex flex-row items-center justify-center p-4 rounded-lg"
        >
          <img src={googleIconImg} alt="logo da google" />

          <span className="pl-2 text-white">
            Crie sua sala com google
          </span>
        </button>

        <div className="flex items-center justify-center w-72 my-5">
          <div className="h-0.5 bg-gray-300 flex-1" />
          <span className="text-xs px-2 text-gray-400 flex-2">ou entre em uma sala</span>
          <div className="h-0.5 w-10 bg-gray-300 flex-1" />
        </div>

        <form className="flex flex-col w-72">
          <TextField
            type="text"
            placeholder="Digite o código da sala"
          />

          <Button type="submit">Entrar na sala</Button>
        </form>
      </main>
    </div>
  );
}
