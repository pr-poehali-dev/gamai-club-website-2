import { useEffect, useRef, useState } from "react";

interface Props {
  onSelect: (server: "anarchy" | "classic") => void;
  hovered: "anarchy" | "classic" | null;
  setHovered: (s: "anarchy" | "classic" | null) => void;
}

export default function ServerSelector({ onSelect, hovered, setHovered }: Props) {
  const [autoServer, setAutoServer] = useState<"anarchy" | "classic">("anarchy");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const DURATION = 10000;

  const startAuto = (current: "anarchy" | "classic") => {
    setProgress(0);
    clearInterval(intervalRef.current);
    clearTimeout(timerRef.current);

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      const next = current === "anarchy" ? "classic" : "anarchy";
      setAutoServer(next);
      startAuto(next);
    }, DURATION);
  };

  useEffect(() => {
    startAuto("anarchy");
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Pause on hover
  useEffect(() => {
    if (hovered) {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    } else {
      startAuto(autoServer);
    }
  }, [hovered]);

  const displayServer = hovered || autoServer;

  const handleSelect = (server: "anarchy" | "classic") => {
    setVisible(false);
    setTimeout(() => onSelect(server), 400);
  };

  if (!visible) return null;

  return (
    <div
      className="server-overlay"
      style={{
        background: "radial-gradient(ellipse at center, rgba(20,5,0,0.98) 0%, rgba(0,0,0,0.99) 100%)",
        animation: "fade-in 0.5s ease-out",
      }}
    >
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bg-particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#ff4500" : "#f97316",
            animationDuration: `${8 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.4,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/6411c323-188e-43dd-ab31-60b784e88c8a.jpg"
              alt="Gamai Club"
              className="w-14 h-14 rounded-lg object-cover"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="text-left">
              <h1
                className="font-oswald font-black text-white text-4xl leading-none"
                style={{ letterSpacing: "0.08em" }}
              >
                GAMAI <span style={{ color: displayServer === "anarchy" ? "#ff4500" : "#f97316" }}>CLUB</span>
              </h1>
              <p className="font-rajdhani text-white/40 text-sm tracking-widest uppercase">mc.gamai.club • 1.21.1</p>
            </div>
          </div>
        </div>

        <p className="text-center font-oswald text-white/50 uppercase tracking-widest text-sm mb-8">
          Выбери свой сервер
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Anarchy */}
          <div
            className={`server-card server-card-anarchy ${displayServer === "anarchy" ? "active-card" : ""}`}
            onClick={() => handleSelect("anarchy")}
            onMouseEnter={() => setHovered("anarchy")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/24fa747d-63ae-4082-87e9-28c7a838c853.jpg"
                alt="Анархия"
                className="w-full h-full object-cover"
                style={{ transform: displayServer === "anarchy" ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,0,0,0.9) 0%, rgba(10,0,0,0.2) 60%, transparent 100%)" }} />
              <div className="absolute top-3 right-3">
                <span className="bg-red-600/80 text-white text-xs font-oswald px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  💀 Жёстко
                </span>
              </div>
            </div>
            <div className="p-5" style={{ background: "linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(10,0,0,0.95) 100%)" }}>
              <h2 className="font-oswald font-bold text-white text-2xl uppercase mb-1" style={{ textShadow: "0 0 20px rgba(255,69,0,0.5)" }}>
                💀 Анархия
              </h2>
              <p className="text-white/60 text-sm font-montserrat mb-4 leading-relaxed">
                Никаких правил. Полная свобода действий. Выживи или умри.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 pulse-dot" />
                  <span className="text-white/50 font-rajdhani text-sm">Онлайн: 142</span>
                </div>
                <button
                  className="font-oswald uppercase text-sm px-5 py-2 rounded-lg font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #ff4500, #cc2200)",
                    boxShadow: "0 0 20px rgba(255,69,0,0.4)",
                  }}
                >
                  Войти →
                </button>
              </div>
            </div>
            {/* Progress bar */}
            {displayServer === "anarchy" && !hovered && (
              <div className="h-0.5 bg-white/10">
                <div className="h-full bg-red-500 progress-bar" key={autoServer} />
              </div>
            )}
          </div>

          {/* Classic */}
          <div
            className={`server-card server-card-classic ${displayServer === "classic" ? "active-card" : ""}`}
            onClick={() => handleSelect("classic")}
            onMouseEnter={() => setHovered("classic")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/743ee0ca-cd49-4f3b-9096-1219e3fd2439.jpg"
                alt="Классика"
                className="w-full h-full object-cover"
                style={{ transform: displayServer === "classic" ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,3,0,0.9) 0%, rgba(5,3,0,0.2) 60%, transparent 100%)" }} />
              <div className="absolute top-3 right-3">
                <span className="bg-orange-600/80 text-white text-xs font-oswald px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  🌲 Дружелюбно
                </span>
              </div>
            </div>
            <div className="p-5" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(5,3,0,0.95) 100%)" }}>
              <h2 className="font-oswald font-bold text-white text-2xl uppercase mb-1" style={{ textShadow: "0 0 20px rgba(249,115,22,0.5)" }}>
                🌲 Классика
              </h2>
              <p className="text-white/60 text-sm font-montserrat mb-4 leading-relaxed">
                Классическое выживание. Стройте, исследуйте, процветайте вместе.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 pulse-dot" />
                  <span className="text-white/50 font-rajdhani text-sm">Онлайн: 98</span>
                </div>
                <button
                  className="font-oswald uppercase text-sm px-5 py-2 rounded-lg font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #c05c00)",
                    boxShadow: "0 0 20px rgba(249,115,22,0.4)",
                  }}
                >
                  Войти →
                </button>
              </div>
            </div>
            {/* Progress bar */}
            {displayServer === "classic" && !hovered && (
              <div className="h-0.5 bg-white/10">
                <div className="h-full bg-orange-400 progress-bar" key={autoServer} />
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-white/20 font-rajdhani text-xs mt-6 tracking-widest uppercase">
          Авто-переключение через 10 сек
        </p>
      </div>
    </div>
  );
}