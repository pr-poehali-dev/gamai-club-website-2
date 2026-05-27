import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  server: "anarchy" | "classic";
  cartCount: number;
  onCartOpen: () => void;
  activeSection: string;
  onNav: (section: string) => void;
}

export default function Navbar({ server, cartCount, onCartOpen, activeSection, onNav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";
  const links = [
    { id: "home", label: "Главная" },
    { id: "shop", label: "Товары" },
    { id: "rules", label: "Правила" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <nav className="navbar-glass fixed top-0 left-0 right-0 z-[5000] h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNav("home")} className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/3f6aab5e-6dfe-494d-b566-928673a08dae.jpg"
            alt="G"
            className="w-9 h-9 rounded-md object-cover"
            style={{ imageRendering: "pixelated" }}
          />
          <span
            className="font-oswald font-black text-xl text-white hidden sm:block"
            style={{ letterSpacing: "0.06em" }}
          >
            GAMAI <span style={{ color: themeColor }}>CLUB</span>
          </span>
        </button>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className="nav-link"
              style={{ color: activeSection === link.id ? themeColor : undefined }}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className="absolute bottom-[-2px] left-0 w-full h-0.5 rounded-full"
                  style={{ background: themeColor }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Server badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-oswald uppercase tracking-wider"
            style={{
              background: `rgba(${server === "anarchy" ? "255,69,0" : "249,115,22"},0.15)`,
              border: `1px solid ${themeColor}40`,
              color: themeColor,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: themeColor }} />
            {server === "anarchy" ? "💀 Анархия" : "🌲 Классика"}
          </div>

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-lg text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white"
                style={{ background: themeColor, fontSize: "10px" }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* IP copy */}
          <button
            className="ip-box hidden lg:flex items-center gap-2 px-3 py-1.5 text-white/60 text-xs font-rajdhani"
            onClick={() => {
              navigator.clipboard.writeText("mc.gamai.club");
              // visual feedback handled by parent
            }}
          >
            <Icon name="Copy" size={12} />
            mc.gamai.club
          </button>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 text-white/70"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 py-4 px-6 flex flex-col gap-4"
          style={{ background: "rgba(5,0,0,0.97)", borderBottom: `1px solid ${themeColor}30` }}
        >
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => { onNav(link.id); setMenuOpen(false); }}
              className="nav-link text-left py-2"
              style={{ color: activeSection === link.id ? themeColor : undefined }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
