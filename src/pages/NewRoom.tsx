import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import ilustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('');
  const { user } = useAuth();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    await roomRef.push({
      title: newRoom,
      author: user?.id,
    });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="hidden sm:flex flex-1 flex-col bg-primary items-start justify-center p-10">
        <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" className="w-72" />

        <strong className="text-4xl text-white mb-4">Crie salas de Q&A ao-vivo</strong>

        <p className="text-md text-white">Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center">
        <img src={logoImg} alt="LetMeAsk" />
        <h2>Crie uma nova sala</h2>

        <form className="flex flex-col w-72" onSubmit={handleCreateRoom}>
          <input
            type="text"
            placeholder="Digite o código da sala"
            className="mb-5 p-4 rounded-md border border-gray-300 text-sm placeholder-gray-400"
            value={newRoom}
            onChange={(event) => setNewRoom(event.target.value)}
          />

          <Button type="submit">Criar sala</Button>
        </form>
        <p>
          Quer entrar em uma sala já existente?
          {' '}
          <Link to="/">Clique aqui</Link>
        </p>
      </main>
    </div>
  );
}
