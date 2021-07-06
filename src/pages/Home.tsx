import ilustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

export function Home() {
  return (
    <div>
      <aside>
        <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" />

        <strong>Crie salas de Q&anp;A ao-vivo</strong>

        <p>
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </aside>

      <main>
        <div>
          <img src={logoImg} alt="LetMeAsk" />

          <button type="button">
            <img src={googleIconImg} alt="logo da google" />
            Crie sua sala com google
          </button>

          <div>ou entre em uma sala</div>

          <form action="">
            <input type="text" placeholder="Digite o código da sala" />

            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
}
