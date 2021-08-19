import headerLogo from '../assets/images/logo.svg';
import { Button } from '../components/Button';

export function Room() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full h-14 py-14 flex items-center justify-center border-b">
        <div className="max-w-4xl w-full flex justify-between">
          <img src={headerLogo} alt="LetmeAsk Logo" className="w-32" />

          <button type="button">
            Código
          </button>
        </div>
      </header>

      <main className="max-w-3xl mt-14 w-full flex flex-col">
        <h1 className="font-heading font-bold text-2xl">Sala React JS</h1>

        <form className="mt-6">
          <textarea placeholder="O que você quer perguntar?" className="resize-none p-4 bg-white w-full rounded-lg h-32 shadow-md" />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-medium text-gray-600">
              Para enviar sua pergunta,
              <button type="button" className="text-primary font-medium ml-1 underline">
                faça seu login
              </button>
            </span>

            <div className="w-44">
              <Button>
                Enviar Pergunta
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
