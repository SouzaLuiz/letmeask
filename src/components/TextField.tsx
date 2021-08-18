import { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>

export function TextField(props: TextFieldProps) {
  return (
    <input
      {...props}
      className="mb-5 p-4 rounded-md border border-gray-300 text-sm placeholder-gray-400"
    />
  );
}
