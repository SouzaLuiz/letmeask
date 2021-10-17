/* eslint-disable no-alert */
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import cs from 'classnames';

import { CgCheckO } from 'react-icons/cg';
import { BiMessage } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi';

import headerLogo from '../assets/images/logo.svg';
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { database } from '../services/firebase';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  function handlePressRoomCode() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(roomId);
      toast.success('Código da sala copiado');
      return;
    }
    toast.error('Função de copiar não disponível');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
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

      <main className="max-w-3xl my-14 w-full flex flex-col">
        <div className="flex items-center mb-6">
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

        {questions.map((question) => (
          <Question
            key={question.id}
            question={question.content}
            author={question.author}
            isHighlighted={question.isHighlighted}
            isAnswered={question.isAnswered}
          >
            <div className="flex items-center justify-center text-gray-500 gap-4">
              {!question.isAnswered && (
                <>
                  <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                    <CgCheckO size={24} className="hover:text-primary cursor-pointer" />
                  </button>

                  <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                    <BiMessage size={24} className={cs('hover:text-primary cursor-pointer', { 'text-primary': question.isHighlighted })} />
                  </button>
                </>
              )}

              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <FiTrash size={24} className="hover:text-primary cursor-pointer" />
              </button>
            </div>
          </Question>
        ))}
      </main>
    </div>
  );
}
