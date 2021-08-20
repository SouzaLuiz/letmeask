import { FiCopy } from 'react-icons/fi';

type RoomCodeProps = {
  code: string;
  onPress(): void
}

export function RoomCode({ code, onPress }: RoomCodeProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex items-center h-12 border-2 rounded-lg transition border-primary hover:border-primary-hover"
    >
      <div className="bg-primary hover:bg-primary-hover transition w-10 h-full flex items-center justify-center">
        <FiCopy size={24} className="text-white" />
      </div>

      <span className="mx-2">{code}</span>
    </button>
  );
}
