/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="bg-primary w-full p-4 rounded-md text-white" {...props} />;
}
