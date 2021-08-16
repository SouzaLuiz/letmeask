import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import ilustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

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
    <div className="page-auth">
      <aside>
        <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" />

        <strong>Crie salas de Q&A ao-vivo</strong>

        <p>
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h2>Crie uma nova sala</h2>

          <form className="main-content__form" onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
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
        </div>
      </main>
    </div>
  );
}
