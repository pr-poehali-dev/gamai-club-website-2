import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  server: "anarchy" | "classic";
  onShopClick: () => void;
}

export default function HeroSection({ server, onShopClick }: Props) {
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";
  const glowColor = server === "anarchy" ? "rgba(255,69,0,0.5)" : "rgba(249,115,22,0.5)";

  const copyIP = () => {
    navigator.clipboard.writeText("mc.gamai.club");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center z-10 pt-16">
      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 font-rajdhani text-sm uppercase tracking-widest hero-reveal"
          style={{
            background: `rgba(${server === "anarchy" ? "255,69,0" : "249,115,22"},0.12)`,
            border: `1px solid ${themeColor}40`,
            color: themeColor,
          }}>
          <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: themeColor }} />
          {server === "anarchy" ? "Сервер Анархия · Версия 1.21.1" : "Сервер Классика · Версия 1.21.1"}
        </div>

        {/* Main title */}
        <h1 className="font-oswald font-black text-white hero-reveal-delay leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)", letterSpacing: "0.03em" }}>
          GAMAI{" "}
          <span
            className="glow-text"
            style={{ color: themeColor, display: "block" }}
          >
            {server === "anarchy" ? "АНАРХИЯ" : "КЛАССИКА"}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 font-montserrat text-lg max-w-xl mx-auto mb-10 hero-reveal-delay-2 leading-relaxed">
          {server === "anarchy"
            ? "Никаких правил. Никаких ограничений. Только выживание в мире полного хаоса."
            : "Классическое Minecraft выживание с дружным сообществом и честной игрой."}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 hero-reveal-delay-2">
          <button
            className="glow-btn font-oswald uppercase font-bold text-white px-8 py-4 rounded-xl text-lg tracking-wider"
            style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
            onClick={() => setShowGuide(true)}
          >
            ▶ Начать играть
          </button>
          <button
            className="font-oswald uppercase font-semibold text-white/80 px-8 py-4 rounded-xl text-lg tracking-wider transition-all hover:text-white"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            onClick={onShopClick}
          >
            🛒 Магазин
          </button>
        </div>

        {/* IP Box */}
        <div className="flex items-center justify-center gap-3">
          <button
            className="ip-box flex items-center gap-3 px-6 py-3 text-white/70 font-rajdhani text-lg tracking-widest"
            onClick={copyIP}
          >
            <Icon name="Server" size={18} className="text-white/40" />
            mc.gamai.club
            <span
              className="text-xs font-oswald uppercase px-2 py-0.5 rounded transition-all"
              style={{
                background: copied ? `${themeColor}30` : "rgba(255,255,255,0.08)",
                color: copied ? themeColor : "rgba(255,255,255,0.4)",
              }}
            >
              {copied ? "✓ Скопировано" : "Скопировать"}
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-12 opacity-60">
          {[
            { label: "Игроков онлайн", value: server === "anarchy" ? "142" : "98" },
            { label: "Версия", value: "1.21.1" },
            { label: "Аптайм", value: "99.9%" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-oswald font-bold text-white text-xl" style={{ color: themeColor }}>{stat.value}</div>
              <div className="font-rajdhani text-white/40 text-xs uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="font-rajdhani text-white/50 text-xs uppercase tracking-widest">Листай вниз</div>
        <Icon name="ChevronDown" size={20} className="text-white/50 animate-bounce" />
      </div>

      {/* How to play guide modal */}
      {showGuide && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowGuide(false)}>
          <div
            className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(15,5,0,0.99) 0%, rgba(8,2,0,0.99) 100%)",
              border: `1px solid ${themeColor}40`,
              boxShadow: `0 0 60px ${glowColor}`,
            }}
          >
            <div className="p-6 border-b border-white/08">
              <div className="flex items-center justify-between">
                <h3 className="font-oswald text-white font-bold text-2xl uppercase tracking-wide">
                  🎮 Как начать играть
                </h3>
                <button onClick={() => setShowGuide(false)} className="text-white/40 hover:text-white/80 transition-colors">
                  <Icon name="X" size={22} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {[
                {
                  step: "1",
                  title: "Скачай лаунчер",
                  desc: "Установи официальный лаунчер Minecraft с сайта minecraft.net или любой другой поддерживающий версию 1.21.1",
                  icon: "Download",
                },
                {
                  step: "2",
                  title: "Запусти версию 1.21.1",
                  desc: "В лаунчере выбери версию Java Edition 1.21.1 и запусти игру",
                  icon: "Play",
                },
                {
                  step: "3",
                  title: "Подключись к серверу",
                  desc: "Нажми «Мультиплеер» → «Добавить сервер» → введи адрес mc.gamai.club",
                  icon: "Wifi",
                },
                {
                  step: "4",
                  title: "Начни играть!",
                  desc: "Зайди на сервер и погрузись в игру. Добро пожаловать в Gamai Club!",
                  icon: "Sword",
                },
              ].map(item => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-oswald font-bold text-white text-sm"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="font-oswald text-white font-semibold uppercase tracking-wide text-sm mb-0.5">{item.title}</div>
                    <div className="text-white/50 font-montserrat text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}

              <div
                className="mt-4 p-4 rounded-xl flex items-center gap-3"
                style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30` }}
              >
                <Icon name="Info" size={18} style={{ color: themeColor }} />
                <p className="text-white/60 font-montserrat text-xs leading-relaxed">
                  Адрес сервера: <span className="font-rajdhani font-bold text-white/80">mc.gamai.club</span> · Версия Java 1.21.1
                </p>
              </div>

              <button
                className="w-full font-oswald uppercase font-bold text-white py-3 rounded-xl text-base tracking-wider glow-btn"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
                onClick={copyIP}
              >
                {copied ? "✓ Адрес скопирован!" : "Скопировать адрес сервера"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
