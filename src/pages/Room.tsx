import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { FiThumbsUp } from 'react-icons/fi';
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
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(roomId);
      toast.success('Código da sala copiado');
      return;
    }
    toast.error('Função de copiar não disponível');
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
          <span className="bg-secondary px-4 py-2 ml-4 rounded-full font-medium text-white">
            {questions.length}
            {' '}
            Pergunta(s)
          </span>
        </div>

        <form className="mt-6" onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            placeholder="O que você quer perguntar?"
            className="resize-none p-4 bg-white w-full rounded-lg h-32 shadow-md focus:ring-primary transition-all focus:ring-2 outline-none"
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

        <section className="my-8">
          {questions.map((question) => (
            <div className="bg-white shadow-md p-6 rounded-lg mb-2">
              <p>{question.content}</p>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <img
                    src={question.author.avatar}
                    alt={question.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm ml-2 text-gray-500">{question.author.name}</span>
                </div>

                <div className="flex items-center text-gray-500">
                  <span className="font-heading font-normal mr-2 mt-2">
                    {question.likeCount}
                  </span>

                  <FiThumbsUp size={24} className="hover:text-primary cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
