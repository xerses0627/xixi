
import React, { useState, useEffect, useRef } from 'react';
import type { Heart } from './types';
import YesContent from './components/YesContent';

// This lets TypeScript know about the confetti function from the CDN script
declare global {
  interface Window {
    confetti: (options: any) => void;
  }
}

const App: React.FC = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState<{ top: string; left: string } | null>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const hoverSoundRef = useRef<HTMLAudioElement>(null);
  const yesSoundRef = useRef<HTMLAudioElement>(null);

  // Floating hearts effect
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const newHeartId = Date.now();
      const newHeart: Heart = {
        id: newHeartId,
        style: {
          left: `${Math.random() * 100}vw`,
          fontSize: `${Math.random() * 22 + 14}px`,
          animation: `floatUp ${Math.random() * 3 + 4}s linear forwards`,
          opacity: Math.random() * 0.5 + 0.4,
        },
        content: Math.random() > 0.5 ? '❤️' : '💗',
      };

      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeartId));
      }, 8000);
    }, 380);

    return () => clearInterval(heartInterval);
  }, []);

  const handleNoMouseEnter = () => {
    if (hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play();
    }
    
    if (cardRef.current && noBtnRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const btnRect = noBtnRef.current.getBoundingClientRect();

      const maxX = cardRect.width - btnRect.width - 20; // 20px padding
      const maxY = cardRect.height - btnRect.height - 20;

      setNoPosition({
        left: `${Math.random() * maxX}px`,
        top: `${Math.random() * maxY}px`,
      });
    }
  };

  const handleYesClick = () => {
    if (yesSoundRef.current) {
        yesSoundRef.current.play();
    }

    setYesClicked(true);

    if (window.confetti) {
      window.confetti({
        particleCount: 260,
        spread: 120,
        origin: { y: 0.65 },
      });
    }
  };

  const noButtonStyle: React.CSSProperties = noPosition
    ? {
        position: 'absolute',
        top: noPosition.top,
        left: noPosition.left,
        transition: 'top 0.3s ease-in-out, left 0.3s ease-in-out',
      }
    : {
        position: 'absolute',
        left: '55%',
        transition: 'all 0.25s ease',
      };
    
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 animate-bg-move">
      {hearts.map(heart => (
        <div key={heart.id} className="fixed bottom-[-20px] pointer-events-none filter blur-[0.3px]" style={heart.style}>
          {heart.content}
        </div>
      ))}
      <div 
        ref={cardRef}
        className="w-full max-w-md p-10 md:p-12 bg-white/75 backdrop-blur-2xl rounded-[28px] text-center shadow-2xl relative card-glow transition-all duration-500 ease-in-out"
        style={{ animation: yesClicked ? 'none' : 'cardIn 1.1s ease' }}
      >
        {yesClicked ? (
          <YesContent />
        ) : (
          <>
            <div className="text-6xl md:text-7xl mb-3" style={{ animation: 'heartbeat 1.8s infinite' }}>
            🧸❤️
            </div>
            <h2 className="text-2xl md:text-3xl text-[#4a1c2f] mb-8 leading-snug">
              Will you be my Valentine?
            </h2>
            <div className="relative h-20">
              <button
                id="yes"
                onClick={handleYesClick}
                className="absolute left-[25%] md:left-[30%] transform -translate-x-1/2 py-3.5 px-9 rounded-full border-none text-base font-medium cursor-pointer transition-all duration-250 ease-in-out shadow-lg bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white hover:-translate-y-1 hover:shadow-xl active:scale-95"
              >
                Yes 💖
              </button>
              <button
                id="no"
                ref={noBtnRef}
                onMouseEnter={handleNoMouseEnter}
                style={noButtonStyle}
                className="py-3.5 px-9 rounded-full border-none text-base font-medium cursor-pointer shadow-lg bg-white/90 text-gray-600"
              >
                No 🙈
              </button>
            </div>
            <p className="mt-7 text-sm text-gray-500 italic">
              Some love stories don’t allow “no” ✨
            </p>
          </>
        )}
      </div>

      <audio ref={hoverSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-cartoon-voice-laugh-343.mp3" preload="auto"></audio>
      <audio ref={yesSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3" preload="auto"></audio>
    </main>
  );
};

export default App;
