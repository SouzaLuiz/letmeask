import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '../components/Button';
import headerLogo from '../assets/images/logo.svg';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { RoomCode } from '../components/RoomCode';

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');

  const { title, questions } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') return;

    if (!user) {
      toast.error('Você precisar está logado');
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHightlight: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    toast.success('Pergunta enviada com sucesso');
    setNewQuestion('');
  }

  function handlePressRoomCode() {
    navigator.clipboard.writeText(roomId);
    toast.success('Código da sala copiado');
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Toaster />
      <header className="w-full h-14 py-14 flex items-center justify-center border-b">
        <div className="max-w-4xl w-full flex justify-between">
          <img src={headerLogo} alt="LetmeAsk Logo" className="w-32" />

          <RoomCode code={roomId} onPress={handlePressRoomCode} />
        </div>
      </header>

      <main className="max-w-3xl mt-14 w-full flex flex-col">
        <div className="flex items-center">
          <h1 className="font-heading font-bold text-2xl">
            Sala
            {' '}
            {title}
          </h1>
          <span className="bg-secondary px-4 py-2 ml-4 rounded-full font-medium text-white">4 Perguntas</span>
        </div>

        <form className="mt-6" onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            placeholder="O que você quer perguntar?"
            className="resize-none p-4 bg-white w-full rounded-lg h-32 shadow-md focus:border-primary-hover"
          />

          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <span className="font-medium text-sm ml-2">{user.name}</span>
              </div>
            ) : (
              <span className="text-sm font-medium text-gray-600">
                Para enviar sua pergunta,
                <button type="button" className="text-primary font-medium ml-1 underline">
                  faça seu login
                </button>
              </span>
            )}

            <div className="w-44">
              <Button type="submit" disabled={!user}>
                Enviar Pergunta
              </Button>
            </div>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}
