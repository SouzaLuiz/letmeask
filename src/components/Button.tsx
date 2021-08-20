/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="font-body bg-primary hover:bg-primary-hover transition w-full p-4 rounded-md text-white disabled:opacity-50" {...props} />;
}
