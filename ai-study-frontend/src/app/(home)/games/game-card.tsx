"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface GameCardProps {
  title: string;
  url: string;
  imageUrl: string;
  status: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, url, imageUrl, status }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <div
      className="cursor-pointer rounded-2xl overflow-hidden border-2 border-green-400 bg-white shadow-md transition-transform hover:scale-105 flex flex-col"
      onClick={handleClick}
    >
      <div className="bg-green-400 text-white text-center py-2 text-sm font-medium">
        {status}
      </div>

      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default GameCard;