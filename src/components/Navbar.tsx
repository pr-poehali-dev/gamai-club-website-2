import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useServer } from "@/context/ServerContext";
import ContactModal from "./ContactModal";

const LOGO = "https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/25b7abf2-7c10-4245-8a5c-784434c90167.jpg";

const LINKS = [
  { path: "/", label: "Главная" },
  { path: "/shop", label: "Товары" },
  { path: "/rules", label: "Правила" },
  { path: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const { server, setServer, cartItems, setCartOpen } = useServer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  const themeColor = server === "classic" ? "#f97316" : "#ff4500";

  return (
    <>
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
          <div className="hidden md:flex items-center gap-7">
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
            {/* Contact link */}
            <button
              onClick={() => setShowContact(true)}
              className="nav-link"
            >
              Поддержка
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Server switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowSwitcher(!showSwitcher)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-oswald uppercase tracking-wider transition-all"
                style={{
                  background: `rgba(${server === "anarchy" ? "255,69,0" : "249,115,22"},0.12)`,
                  border: `1px solid ${themeColor}50`,
                  color: themeColor,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: themeColor }} />
                {server === "anarchy" ? "💀 Анархия" : "🌲 Классика"}
                <Icon name="ChevronDown" size={12} className={`transition-transform ${showSwitcher ? "rotate-180" : ""}`} />
              </button>

              {showSwitcher && (
                <>
                  <div className="fixed inset-0 z-[4999]" onClick={() => setShowSwitcher(false)} />
                  <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-[5001]"
                    style={{
                      background: "rgba(8,2,0,0.98)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="p-2">
                      {(["anarchy", "classic"] as const).map(s => (
                        <button
                          key={s}
                          onClick={() => { setServer(s); setShowSwitcher(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all"
                          style={{
                            background: server === s ? `${s === "anarchy" ? "#ff4500" : "#f97316"}18` : "transparent",
                            border: server === s ? `1px solid ${s === "anarchy" ? "#ff4500" : "#f97316"}40` : "1px solid transparent",
                          }}
                        >
                          <span className="text-lg">{s === "anarchy" ? "💀" : "🌲"}</span>
                          <div className="flex-1">
                            <div
                              className="font-oswald font-semibold uppercase text-sm"
                              style={{ color: s === "anarchy" ? "#ff4500" : "#f97316" }}
                            >
                              {s === "anarchy" ? "Анархия" : "Классика"}
                            </div>
                            <div className="text-white/30 font-montserrat text-xs">
                              {s === "anarchy" ? "142 онлайн" : "98 онлайн"}
                            </div>
                          </div>
                          {server === s && (
                            <Icon name="Check" size={14} style={{ color: s === "anarchy" ? "#ff4500" : "#f97316" }} />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="px-3 pb-3">
                      <div className="text-white/20 font-rajdhani text-xs text-center py-1.5 border-t border-white/06">
                        mc.gamai.club · v1.21.1
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

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
            className="md:hidden absolute top-16 left-0 right-0 py-4 px-6 flex flex-col gap-3"
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
            <button
              onClick={() => { setShowContact(true); setMenuOpen(false); }}
              className="nav-link py-2 text-left"
            >
              Поддержка
            </button>
            {/* Mobile server switcher */}
            <div className="pt-2 border-t border-white/08">
              <p className="font-oswald text-white/30 text-xs uppercase tracking-widest mb-2">Сервер</p>
              <div className="flex gap-2">
                {(["anarchy", "classic"] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setServer(s)}
                    className="flex-1 py-2 rounded-lg font-oswald text-xs uppercase font-semibold transition-all"
                    style={{
                      background: server === s ? `${s === "anarchy" ? "#ff4500" : "#f97316"}25` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${server === s ? (s === "anarchy" ? "#ff4500" : "#f97316") + "60" : "rgba(255,255,255,0.08)"}`,
                      color: server === s ? (s === "anarchy" ? "#ff4500" : "#f97316") : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {s === "anarchy" ? "💀 Анархия" : "🌲 Классика"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}
