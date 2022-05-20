/* eslint-disable no-alert */
import { useParams, useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import headerLogo from '../assets/images/logo.svg';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { equalTo, off, onValue, orderByChild, query, ref } from 'firebase/database';

type RoomParams = {
  id: string
}

type RoomResponse = Record<string, {
  author: string;
  title: string;
}>

type Room = {
  id: string
  title: string;
}

export function Dashboard() {
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const roomId = params.id;

  useEffect(() => {
    const room_ref = ref(database, 'rooms');

    if (user?.id) {

      const queryRef = query(room_ref, orderByChild('author'), equalTo(user.id))

      onValue(queryRef, snapshot => {
         const rooms_db: RoomResponse = snapshot.val();

         const parsedRooms = Object.entries(rooms_db).map(([key, value]) => ({
           id: key,
           title: value.title,
         }));

         setRooms(parsedRooms);
      })
    }

    return () => {
      off(room_ref)
    };
  }, [user?.id]);

  // async function handleDeleteQuestion(questionId: string) {
  //   if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
  //     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  //   }
  // }

  // async function handleCheckQuestionAsAnswered(questionId: string) {
  //   await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
  //     isAnswered: true,
  //   });
  // }

  // async function handleHighlightQuestion(questionId: string) {
  //   await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
  //     isHighlighted: true,
  //   });
  // }

  async function handleCloseRoom() {
    if (window.confirm('Tem certeza que você deseja fechar essa sala?')) {
      await database.ref(`rooms/${roomId}`).remove();

      history.push('/rooms/new');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full h-14 py-14 flex items-center justify-center border-b">
        <div className="max-w-4xl w-full flex justify-between">
          <img src={headerLogo} alt="LetmeAsk Logo" className="w-32" />

          <div className="flex flex-row items-stretch gap-4">
            <button
              className="border-primary border-2 px-6 h-12 rounded-md text-primary"
              type="button"
              onClick={handleCloseRoom}
            >
              Sair da conta
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl my-14 w-full flex flex-col">
        <div className="flex items-center mb-6">
          <h1 className="font-heading font-bold text-2xl">
            Gerencie suas salas ou respostas
          </h1>
        </div>

        {rooms.map((room) => (
          <span key={room.id}>{room.title}</span>
        ))}
      </main>
    </div>
  );
}
