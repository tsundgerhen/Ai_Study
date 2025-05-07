import React from 'react';
import GameCard from '@/app/(home)/games/game-card';

const games = [
  { title: "Subtract Master", url: "/game", imageUrl: "./subtruct.png", status: "Active" },
  { title: "Infinite addition", url: "/comingsoon", imageUrl: "./hammer.png", status: "Coming soon"},
  { title: "Fraction Smash", url: "/comingsoon", imageUrl: "./inf.png", status: "Coming soon" },
  { title: "Expanding Splodges", url: "/comingsoon", imageUrl: "./1.png", status: "Coming soon" },
  { title: "Blast into Multipication", url: "/comingsoon", imageUrl: "./2.png", status: "Coming soon" },
  { title: "Shrink Big Grow Small", url: "/comingsoon", imageUrl: "./3.png", status: "Coming soon" },
  { title: "Expedation For Atoms", url: "/comingsoon", imageUrl: "./atom.png", status: "Coming soon" },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-1/3 p-6 rounded-2xl bg-white shadow-xl flex flex-col justify-start pt-24">
        <h2 className="text-4xl font-extrabold text-green-600 mb-3">AI Study</h2>
        <p className="text-gray-700 text-lg mb-1">📘 7 Units</p>
        <p className="text-gray-600 text-md">
          Ready to exercise your mind, <span className="font-semibold text-green-500">Teru</span>?
        </p>
      </div>

      {/* Game Grid */}
      <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </div>
  );
};

export default Home;