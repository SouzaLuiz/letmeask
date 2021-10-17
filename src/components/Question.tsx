import React from 'react';
import cs from 'classnames';

type QuestionProps = {
  question: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
  children?: React.ReactNode
}

export function Question({
  question, author, isAnswered, isHighlighted, children,
}: QuestionProps) {
  return (
    <div
      className={cs(
        'shadow-md p-6 rounded-lg mb-2',
        { 'bg-white': !isAnswered && !isHighlighted },
        { 'bg-gray-200': isAnswered },
        { 'border-primary border bg-primary_light': isHighlighted && !isAnswered },
      )}
    >
      <p>{question}</p>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm ml-2 text-gray-500">{author.name}</span>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
