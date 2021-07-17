/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="c-button" {...props} />;
}
