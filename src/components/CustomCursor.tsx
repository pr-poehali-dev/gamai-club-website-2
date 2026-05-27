import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  type: "flame" | "block";
}

interface Props {
  server: "anarchy" | "classic";
}

export default function CustomCursor({ server }: Props) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickSparks, setClickSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Check hovering over interactive elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest("button, a, [role=button], .server-card, .product-card, .ip-box");
      setIsHovering(!!isInteractive);
    };

    const click = (e: MouseEvent) => {
      const id = ++particleIdRef.current;
      setClickSparks(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setClickSparks(prev => prev.filter(s => s.id !== id)), 600);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  // Spawn hover particles
  useEffect(() => {
    if (!isHovering) return;
    const interval = setInterval(() => {
      const id = ++particleIdRef.current;
      const { x, y } = posRef.current;
      setParticles(prev => [...prev, { id, x: x + (Math.random() - 0.5) * 20, y, type: server === "anarchy" ? "flame" : "block" }]);
      setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 800);
    }, 120);
    return () => clearInterval(interval);
  }, [isHovering, server]);

  const AnarchyCursor = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: isHovering ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s ease" }}>
      {/* Iron sword — tip at top-left (0,0) = click point */}
      {/* Blade */}
      <rect x="1" y="1" width="5" height="22" rx="1" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" transform="rotate(-45 3 3)" />
      {/* Blade highlight */}
      <rect x="2" y="1" width="2" height="18" rx="1" fill="#e8e8e8" transform="rotate(-45 3 3)" />
      {/* Guard */}
      <rect x="-2" y="16" width="12" height="3" rx="1" fill="#888" stroke="#666" strokeWidth="0.5" transform="rotate(-45 3 3)" />
      {/* Handle */}
      <rect x="1" y="19" width="4" height="10" rx="1.5" fill="#8B4513" stroke="#6B3410" strokeWidth="0.5" transform="rotate(-45 3 3)" />
      {/* Pommel */}
      <rect x="0.5" y="29" width="5" height="4" rx="1" fill="#888" stroke="#666" strokeWidth="0.5" transform="rotate(-45 3 3)" />
    </svg>
  );

  const ClassicCursor = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: isHovering ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s ease" }}>
      {/* Axe — bit tip at top-left (0,0) = click point */}
      {/* Handle */}
      <rect x="8" y="6" width="4" height="28" rx="2" fill="#8B4513" stroke="#6B3410" strokeWidth="0.8" transform="rotate(-35 10 20)" />
      {/* Axe head */}
      <path d="M2 2 L18 8 L14 20 L4 16 Z" fill="#a0a0b0" stroke="#8080a0" strokeWidth="0.8" />
      {/* Axe edge */}
      <path d="M2 2 L4 16" stroke="#d0d0e0" strokeWidth="1.5" strokeLinecap="round" />
      {/* Axe highlight */}
      <path d="M4 4 L16 9 L13 17" stroke="#c0c0d0" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );

  return (
    <>
      <div
        id="custom-cursor"
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      >
        {server === "anarchy" ? <AnarchyCursor /> : <ClassicCursor />}
      </div>

      {/* Hover particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className={p.type === "flame" ? "flame-particle" : "block-particle"}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            pointerEvents: "none",
            zIndex: 99998,
            fontSize: p.type === "flame" ? "16px" : "14px",
          }}
        >
          {p.type === "flame" ? "🔥" : "🪵"}
        </div>
      ))}

      {/* Click sparks */}
      {clickSparks.map(s => (
        <div
          key={s.id}
          className="click-spark"
          style={{
            left: s.x,
            top: s.y,
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: `2px solid ${server === "anarchy" ? "#ff4500" : "#f97316"}`,
            background: server === "anarchy"
              ? "radial-gradient(circle, rgba(255,69,0,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
          }}
        />
      ))}
    </>
  );
}
