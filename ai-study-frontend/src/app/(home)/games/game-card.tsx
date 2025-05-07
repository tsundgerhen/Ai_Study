"use client";
import React from 'react';

import { useRouter } from 'next/navigation';
interface GameCardProps {
  title: string;
  url: string;
  imageUrl: string;
  status: string
}

const GameCard: React.FC<GameCardProps> = ({ title, url, imageUrl, status }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };
  return (
    <div className='game-card rounded-lg border-2 bg-gray-100 border-green-400 items-center justify-center' onClick={handleClick}>
      <h3 className='game-card__title bg-green-400 text-center'>{status}</h3>
      <img 
        src={imageUrl} 
        alt={title} 
        className='game-card__image w-[100%] h-[70%] px-4 items-center justify-center' 
      />
      <h3 className='game-card__title p-4 font-semibold text-center'>{title}</h3>
    </div>
  );
};

export default GameCard;
