
import React from 'react';

const YesContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <img
        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
        alt="Kissing Teddy Bears"
        className="w-56 h-56 md:w-72 md:h-72 object-contain"
      />
      <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mt-6 leading-tight">
        YAY! See you on the 14th! 💕
      </h2>
      <p className="text-gray-600 mt-2">I can't wait to spend the day with you!</p>
    </div>
  );
};

export default YesContent;
