interface Props {
  server: "anarchy" | "classic";
}

export default function Footer({ server }: Props) {
  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";

  return (
    <footer className="relative z-10 border-t py-10 px-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.6)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/3f6aab5e-6dfe-494d-b566-928673a08dae.jpg"
            alt="Gamai Club"
            className="w-8 h-8 rounded-md"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="font-oswald font-bold text-white text-lg" style={{ letterSpacing: "0.06em" }}>
            GAMAI <span style={{ color: themeColor }}>CLUB</span>
          </span>
        </div>

        <p className="text-white/25 font-montserrat text-xs text-center">
          © 2024 Gamai Club · mc.gamai.club · Не аффилирован с Mojang AB
        </p>

        <div className="flex items-center gap-2 text-white/25 font-rajdhani text-xs uppercase tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: themeColor }} />
          {server === "anarchy" ? "💀 Анархия" : "🌲 Классика"}
        </div>
      </div>
    </footer>
  );
}
