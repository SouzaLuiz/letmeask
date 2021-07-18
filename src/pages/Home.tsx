import { useHistory } from 'react-router-dom';

import ilustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    history.push('/rooms/new');
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

          <button onClick={handleCreateRoom} type="button" className="main-content__btn-create-room">
            <img src={googleIconImg} alt="logo da google" />
            Crie sua sala com google
          </button>

          <div className="main-content__separator">ou entre em uma sala</div>

          <form className="main-content__form">
            <input type="text" placeholder="Digite o código da sala" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
