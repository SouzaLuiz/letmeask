/* eslint-disable no-alert */
import { useHistory } from 'react-router-dom';

import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { TextField } from '../components/TextField';
import { AsideHome } from '../components/AsideHome';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Sala não existe');
      return;
    }

    history.push(`/rooms/${roomRef.key}`);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster />
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

        <form className="flex flex-col w-72" onSubmit={handleJoinRoom}>
          <TextField
            type="text"
            placeholder="Digite o código da sala"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
          />

          <Button type="submit">Entrar na sala</Button>
        </form>
      </main>
    </div>
  );
}
