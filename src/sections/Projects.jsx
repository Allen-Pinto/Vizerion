import { useRef, useState, useEffect } from "react";

const Card = ({ game, index, isActive, onClick, containerRef }) => {
  return (
    <div
      className={`absolute transition-all duration-700 ease-out cursor-pointer group ${
        isActive ? 'z-30 scale-125' : 'z-10 hover:z-20 hover:scale-110'
      }`}
      style={{
        transform: `rotate(${game.rotate}) ${isActive ? 'scale(1.25)' : 'scale(1)'}`,
        top: game.top,
        left: game.left,
      }}
      onClick={() => onClick(index)}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl blur-xl transition-all duration-500 ${
        isActive 
          ? `bg-gradient-to-r ${game.glowColor} opacity-60` 
          : `bg-gradient-to-r ${game.glowColor} opacity-0 group-hover:opacity-40`
      }`} />
      
      {/* Card */}
      <div className={`relative bg-gradient-to-br ${game.gradient} p-4 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
        isActive 
          ? `${game.borderColor} shadow-2xl` 
          : `border-gray-700 group-hover:${game.borderColor} group-hover:shadow-xl`
      }`}>
        {/* Icon */}
        <div className="text-2xl mb-2">{game.icon}</div>
        
        {/* Game name */}
        <h3 className={`font-bold text-sm tracking-wider transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
        }`}>
          {game.text}
        </h3>
        
        {/* Category badge */}
        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 ${
          isActive 
            ? `${game.badgeColor} text-white shadow-lg` 
            : `bg-gray-800 text-gray-400 group-hover:${game.badgeColor} group-hover:text-white`
        }`}>
          {game.category}
        </span>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg" />
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const gamesContainerRef = useRef();
  const [activeGame, setActiveGame] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const games = [
    { 
      text: "VALORANT", 
      rotate: "-10deg", 
      top: "-20%", 
      left: "10%",
      icon: "🎯",
      category: "FPS",
      gradient: "from-red-900/80 to-red-600/60",
      glowColor: "from-red-500 to-pink-500",
      borderColor: "border-red-400",
      badgeColor: "bg-red-600"
    },
    { 
      text: "BGMI", 
      rotate: "8deg", 
      top: "-11%", 
      left: "65%",
      icon: "🔫",
      category: "Battle Royale",
      gradient: "from-orange-900/80 to-yellow-600/60",
      glowColor: "from-orange-500 to-yellow-500",
      borderColor: "border-orange-400",
      badgeColor: "bg-orange-600"
    },
    { 
      text: "FREE FIRE", 
      rotate: "-6deg", 
      top: "20%", 
      left: "20%",
      icon: "🔥",
      category: "Battle Royale",
      gradient: "from-blue-900/80 to-cyan-600/60",
      glowColor: "from-blue-500 to-cyan-500",
      borderColor: "border-cyan-400",
      badgeColor: "bg-blue-600"
    },
    { 
      text: "COD", 
      rotate: "12deg", 
      top: "27%", 
      left: "55%",
      icon: "💀",
      category: "FPS",
      gradient: "from-gray-900/80 to-gray-600/60",
      glowColor: "from-gray-500 to-slate-500",
      borderColor: "border-gray-400",
      badgeColor: "bg-gray-600"
    },
    { 
      text: "FIFA", 
      rotate: "-12deg", 
      top: "55%", 
      left: "8%",
      icon: "⚽",
      category: "Sports",
      gradient: "from-green-900/80 to-emerald-600/60",
      glowColor: "from-green-500 to-emerald-500",
      borderColor: "border-emerald-400",
      badgeColor: "bg-green-600"
    },
    { 
      text: "ROBLOX", 
      rotate: "15deg", 
      top: "22%", 
      left: "77%",
      icon: "🎮",
      category: "Sandbox",
      gradient: "from-purple-900/80 to-violet-600/60",
      glowColor: "from-purple-500 to-violet-500",
      borderColor: "border-violet-400",
      badgeColor: "bg-purple-600"
    },
    { 
      text: "MINECRAFT", 
      rotate: "-8deg", 
      top: "75%", 
      left: "20%",
      icon: "🟫",
      category: "Sandbox",
      gradient: "from-amber-900/80 to-yellow-600/60",
      glowColor: "from-amber-500 to-yellow-500",
      borderColor: "border-yellow-400",
      badgeColor: "bg-amber-600"
    },
    { 
      text: "F1", 
      rotate: "10deg", 
      top: "62%", 
      left: "68%",
      icon: "🏎️",
      category: "Racing",
      gradient: "from-red-900/80 to-rose-600/60",
      glowColor: "from-red-500 to-rose-500",
      borderColor: "border-rose-400",
      badgeColor: "bg-red-600"
    },
    { 
      text: "CLASH ROYALE", 
      rotate: "-4deg", 
      top: "28%", 
      left: "35%",
      icon: "👑",
      category: "Strategy",
      gradient: "from-indigo-900/80 to-blue-600/60",
      glowColor: "from-indigo-500 to-blue-500",
      borderColor: "border-blue-400",
      badgeColor: "bg-indigo-600"
    },
  ];

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-cycle active game
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGame(prev => prev === null ? 0 : (prev + 1) % games.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [games.length]);

  const handleCardClick = (index) => {
    setActiveGame(index);
  };

  return (
    <section
      id="projects"
      className="snap-start h-screen scroll-mt-28 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a0a2e 50%, #16213e 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Parallax background layers */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center mb-8">
        {/* Title with enhanced styling */}
        <div className="mb-6">
          <h2 className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 tracking-wider drop-shadow-2xl mb-2 animate-pulse">
            GAMING
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-widest">
            ARENA
          </h3>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-24 lg:w-32" />
            <span className="text-xs lg:text-sm text-purple-400 font-semibold tracking-widest px-2 lg:px-4">
              DOMINATE • CONQUER • REPEAT
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-24 lg:w-32" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex justify-center gap-6 lg:gap-8">
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-cyan-400">{games.length}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Games</div>
          </div>
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-purple-400">∞</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Wins</div>
          </div>
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-pink-400">24/7</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Active</div>
          </div>
        </div>
      </div>

      {/* Enhanced game cards container */}
      <div
        ref={gamesContainerRef}
        className="relative w-full h-96 flex items-center justify-center"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
        }}
      >
        {games.map((game, idx) => (
          <Card
            key={idx}
            game={game}
            index={idx}
            isActive={activeGame === idx}
            onClick={handleCardClick}
            containerRef={gamesContainerRef}
          />
        ))}
      </div>

      {/* Game info panel */}
      {activeGame !== null && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6 min-w-80 text-center transition-all duration-500">
          <div className="text-3xl mb-2">{games[activeGame].icon}</div>
          <h4 className="text-xl font-bold text-white mb-2">{games[activeGame].text}</h4>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${games[activeGame].badgeColor} text-white`}>
            {games[activeGame].category}
          </span>
          <div className="mt-4 text-gray-300 text-sm">
            Many more to come🔥
          </div>
        </div>
      )}

      {/* Navigation dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
        {games.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleCardClick(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeGame === idx 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;