import ilustration from '../assets/images/illustration.svg';

export function AsideHome() {
  return (
    <div>
      <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" className="w-72" />

      <strong className="font-heading text-4xl text-white">Crie salas de Q&A ao-vivo</strong>

      <p className="font-body text-2xl text-white mt-4">Tire as dúvidas da sua audiência em tempo-real</p>
    </div>
  );
}
