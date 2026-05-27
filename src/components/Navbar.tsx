import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useServer } from "@/context/ServerContext";

const LOGO = "https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/6411c323-188e-43dd-ab31-60b784e88c8a.jpg";

const LINKS = [
  { path: "/", label: "Главная" },
  { path: "/shop", label: "Товары" },
  { path: "/rules", label: "Правила" },
  { path: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const { server, cartItems, setCartOpen } = useServer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const themeColor = server === "classic" ? "#f97316" : "#ff4500";

  const copyIP = () => {
    navigator.clipboard.writeText("mc.gamai.club");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="navbar-glass fixed top-0 left-0 right-0 z-[5000] h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="Gamai Club"
            className="w-10 h-10 rounded-lg object-cover"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="font-oswald font-black text-xl text-white hidden sm:block" style={{ letterSpacing: "0.06em" }}>
            GAMAI <span style={{ color: themeColor }}>CLUB</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link"
                style={{ color: active ? themeColor : undefined }}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-[-2px] left-0 w-full h-0.5 rounded-full"
                    style={{ background: themeColor }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Server badge */}
          {server && (
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
          )}

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-lg text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Icon name="ShoppingCart" size={20} />
            {cartItems.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white"
                style={{ background: themeColor, fontSize: "10px" }}
              >
                {cartItems.length}
              </span>
            )}
          </button>

          {/* IP */}
          <button
            onClick={copyIP}
            className="ip-box hidden lg:flex items-center gap-2 px-3 py-1.5 text-white/60 text-xs font-rajdhani"
          >
            <Icon name="Copy" size={12} />
            {copied ? "✓ Скопировано" : "mc.gamai.club"}
          </button>

          {/* Mobile burger */}
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
          {LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="nav-link py-2 text-left"
              style={{ color: location.pathname === link.path ? themeColor : undefined }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
