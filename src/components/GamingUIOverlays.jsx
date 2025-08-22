import React, { useState, useEffect } from 'react';

const GamingUIOverlays = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(4);
  const [xp, setXp] = useState(75);

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => prev + Math.floor(Math.random() * 10));
      setXp(prev => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top Left - Player Stats */}
      <div className="absolute top-13 left-4 bg-black/40 backdrop-blur-sm border border-purple-500/50 rounded-lg p-4 pointer-events-auto">
        <div className="text-green-400 text-sm font-mono">Player 1</div>
        <div className="text-white font-bold">Level {level}</div>
        <div className="w-24 h-2 bg-gray-700 rounded-full mt-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${xp}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-300 mt-1">XP: {xp}/100</div>
      </div>

      {/* Top Center - Achievement Notification */}
      <div className="absolute top-20 right-70 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-lg p-4 animate-pulse">
        <div className="text-yellow-400 text-sm font-mono text-center">🏆 ACHIEVEMENT</div>
        <div className="text-white font-bold text-center">Welcome to VIZERION!</div>
        <div className="text-xs text-gray-300 text-center">Gaming club member</div>
      </div>

      {/* Top Right - Live Stats */}
      <div className="absolute top-20 right-7 bg-black/40 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-4">
        <div className="text-cyan-400 text-sm font-mono">LIVE STATS</div>
        <div className="text-white font-bold text-2xl">{score.toLocaleString()}</div>
        <div className="text-xs text-gray-300">Total Score</div>
      </div>

      {/* Bottom Left - Mini Map Style */}
      <div className="absolute bottom-20 left-7 w-32 h-32 bg-black/60 backdrop-blur-sm border border-yellow-500/50 rounded-lg p-2">
        <div className="text-yellow-400 text-xs font-mono mb-2">ARENA MAP</div>
        <div className="relative w-full h-20 bg-gray-800 rounded border">
          <div className="absolute top-2 left-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Bottom Center - Action Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {['VALORANT', 'FIFA', 'BGMI', 'COD', 'FF'].map((game, index) => (
          <div 
            key={game}
            className="w-12 h-12 bg-black/60 backdrop-blur-sm border border-purple-500/50 rounded-lg flex items-center justify-center hover:border-purple-400 transition-colors cursor-pointer"
          >
            <span className="text-xs text-white font-bold">{game.slice(0, 2)}</span>
          </div>
        ))}
      </div>

      {/* Bottom Right - Health/Energy Bar */}
      <div className="absolute bottom-20 right-7 bg-black/40 backdrop-blur-sm border border-red-500/50 rounded-lg p-4">
        <div className="text-red-400 text-sm font-mono">ENERGY</div>
        <div className="w-24 h-3 bg-gray-700 rounded-full mt-2">
          <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: '85%' }}></div>
        </div>
        <div className="text-xs text-gray-300 mt-1">85/100</div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-20 h-20">
        <div className="absolute top-4 left-4 w-8 h-0.5 bg-purple-500"></div>
        <div className="absolute top-4 left-4 w-0.5 h-8 bg-purple-500"></div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="absolute top-4 right-4 w-8 h-0.5 bg-cyan-500"></div>
        <div className="absolute top-4 right-4 w-0.5 h-8 bg-cyan-500"></div>
      </div>
    </div>
  );
};

export default GamingUIOverlays;