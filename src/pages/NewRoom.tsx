import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { TextField } from '../components/TextField';
import { AsideHome } from '../components/AsideHome';

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
      <aside className="hidden flex-1 sm:flex  flex-col bg-primary items-start justify-center px-12">
        <AsideHome />
      </aside>

      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center w-72 sm:w-80">

          <img src={logoImg} alt="LetMeAsk" className="w-36" />
          <h2 className="font-heading text-xl font-bold my-5">Crie uma nova sala</h2>

          <form className="flex flex-col w-full" onSubmit={handleCreateRoom}>
            <TextField
              type="text"
              placeholder="Digite o código da sala"
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />

            <Button type="submit">Criar sala</Button>
          </form>

          <p className="text-sm md:text-base text-gray-500 text-center mt-5">
            Quer entrar em uma sala já existente?
            <Link to="/" className="text-secondary underline block">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
