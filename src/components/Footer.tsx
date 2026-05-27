import { Link } from "react-router-dom";

const LOGO = "https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/25b7abf2-7c10-4245-8a5c-784434c90167.jpg";

interface Props {
  server: "anarchy" | "classic";
}

export default function Footer({ server }: Props) {
  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";

  return (
    <footer className="relative z-10 border-t py-10 px-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.7)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={LOGO} alt="Gamai Club" className="w-10 h-10 rounded-lg object-cover" style={{ imageRendering: "pixelated" }} />
              <span className="font-oswald font-black text-white text-xl" style={{ letterSpacing: "0.06em" }}>
                GAMAI <span style={{ color: themeColor }}>CLUB</span>
              </span>
            </div>
            <p className="text-white/30 font-montserrat text-xs max-w-xs leading-relaxed">
              Лучший Minecraft сервер с двумя режимами игры. Присоединяйся!
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <p className="font-oswald text-white/50 text-xs uppercase tracking-widest mb-3">Навигация</p>
              <div className="flex flex-col gap-2">
                {[
                  { path: "/", label: "Главная" },
                  { path: "/shop", label: "Товары" },
                  { path: "/rules", label: "Правила" },
                  { path: "/contacts", label: "Контакты" },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="text-white/40 hover:text-white/70 font-montserrat text-sm transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-oswald text-white/50 text-xs uppercase tracking-widest mb-3">Серверы</p>
              <div className="flex flex-col gap-2">
                <span className="text-white/40 font-montserrat text-sm">💀 Анархия</span>
                <span className="text-white/40 font-montserrat text-sm">🌲 Классика</span>
                <span className="font-rajdhani text-sm mt-1" style={{ color: themeColor }}>mc.gamai.club</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/06 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 font-montserrat text-xs">
            © 2025 Gamai Club · Не аффилирован с Mojang AB
          </p>
          <div className="flex items-center gap-2 text-white/20 font-rajdhani text-xs uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: themeColor }} />
            {server === "anarchy" ? "💀 Анархия" : "🌲 Классика"} · v1.21.1
          </div>
        </div>
      </div>
    </footer>
  );
}