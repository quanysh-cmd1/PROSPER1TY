import { useEffect, useState } from 'react';

export const Embers = () => {
  const [sparkles, setSparkles] = useState<{ id: number, left: string, animationDuration: string, delay: string, width: string, opacity: number }[]>([]);

  useEffect(() => {
    // Generate 40 embers with random properties
    const newSparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 4}s`,
      delay: `${Math.random() * 5}s`,
      width: `${Math.random() * 4 + 2}px`,
      opacity: Math.random() * 0.6 + 0.4
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {sparkles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-[-10%] bg-orange-500 pointer-events-none"
          style={{
            left: p.left,
            width: p.width,
            height: p.width,
            opacity: p.opacity,
            animation: `rise ${p.animationDuration} linear ${p.delay} infinite`,
            borderRadius: '50%',
            filter: 'drop-shadow(0 0 5px rgba(255,69,0,0.8))',
            boxShadow: '0 0 10px rgba(255,140,0,0.8)'
          }}
        />
      ))}
    </div>
  );
};
