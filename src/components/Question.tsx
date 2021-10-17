import React from 'react';

type QuestionProps = {
  question: string
  avatarUrl: string
  username: string
  children?: React.ReactNode
}

export function Question({
  question, username, avatarUrl, children,
}: QuestionProps) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-2">
      <p>{question}</p>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <img
            src={avatarUrl}
            alt={username}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm ml-2 text-gray-500">{username}</span>
        </div>

        {children}
      </div>
    </div>
  );
}
