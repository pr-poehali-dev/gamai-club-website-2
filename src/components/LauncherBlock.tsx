import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useServer } from "@/context/ServerContext";

const LAUNCHERS = [
  {
    id: "tlauncher",
    name: "TLauncher",
    desc: "Самый популярный бесплатный лаунчер для пиратской и лицензии",
    icon: "🚀",
    badge: "Рекомендуем",
    badgeColor: "#ff4500",
    url: "https://tlauncher.org/",
    features: ["Бесплатный", "Пиратка и лицензия", "Моды поддержка", "Простая установка"],
  },
  {
    id: "official",
    name: "Официальный",
    desc: "Лицензионный лаунчер от Mojang для владельцев Java Edition",
    icon: "🎮",
    badge: "Лицензия",
    badgeColor: "#10b981",
    url: "https://minecraft.net/",
    features: ["Официальный", "Только лицензия", "Стабильная работа", "Поддержка Mojang"],
  },
  {
    id: "prismlauncher",
    name: "Prism Launcher",
    desc: "Продвинутый open-source лаунчер с поддержкой модпаков",
    icon: "💠",
    badge: "Для моддеров",
    badgeColor: "#7c3aed",
    url: "https://prismlauncher.org/",
    features: ["Open source", "Modpacks", "MultiMC совместим", "Расширенные настройки"],
  },
];

export default function LauncherBlock() {
  const { server } = useServer();
  const [active, setActive] = useState("tlauncher");
  const themeColor = server === "classic" ? "#f97316" : "#ff4500";
  const activeLauncher = LAUNCHERS.find(l => l.id === active) || LAUNCHERS[0];

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-block font-rajdhani text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4"
            style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30`, color: themeColor }}
          >
            Начало игры
          </div>
          <h2 className="section-title text-white text-5xl mb-3">
            КАК <span style={{ color: themeColor }}>ЗАЙТИ</span>
          </h2>
          <p className="text-white/40 font-montserrat max-w-md mx-auto">
            Выбери лаунчер, установи его и подключайся к mc.gamai.club
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Launcher tabs + details */}
          <div>
            {/* Tab buttons */}
            <div className="flex gap-2 mb-6">
              {LAUNCHERS.map(l => (
                <button
                  key={l.id}
                  onClick={() => setActive(l.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-oswald uppercase text-xs tracking-wider transition-all"
                  style={{
                    background: active === l.id ? `${themeColor}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active === l.id ? themeColor + "60" : "rgba(255,255,255,0.07)"}`,
                    color: active === l.id ? "white" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <span className="text-base">{l.icon}</span>
                  <span className="hidden sm:block">{l.name}</span>
                </button>
              ))}
            </div>

            {/* Active launcher details */}
            <div
              key={active}
              className="rounded-2xl p-6 animate-fade-in"
              style={{
                background: `linear-gradient(135deg, ${themeColor}10 0%, rgba(10,3,0,0.9) 100%)`,
                border: `1px solid ${themeColor}30`,
              }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${themeColor}18`, border: `1px solid ${themeColor}25` }}
                >
                  {activeLauncher.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-oswald font-bold text-white text-xl uppercase">{activeLauncher.name}</h3>
                    <span
                      className="font-oswald text-xs uppercase px-2 py-0.5 rounded-full"
                      style={{ background: activeLauncher.badgeColor + "30", color: activeLauncher.badgeColor }}
                    >
                      {activeLauncher.badge}
                    </span>
                  </div>
                  <p className="text-white/50 font-montserrat text-sm leading-relaxed">{activeLauncher.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-5">
                {activeLauncher.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-white/60 text-xs font-montserrat">
                    <span style={{ color: themeColor }}>✓</span> {f}
                  </div>
                ))}
              </div>

              <a
                href={activeLauncher.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full font-oswald uppercase font-bold text-white py-3.5 rounded-xl text-sm tracking-wider glow-btn transition-all"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
              >
                <Icon name="Download" size={16} />
                Скачать {activeLauncher.name}
              </a>
            </div>
          </div>

          {/* Right: Steps */}
          <div>
            <h3 className="font-oswald text-white/50 text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span style={{ color: themeColor }}>—</span> Шаги подключения
            </h3>
            <div className="space-y-3">
              {[
                {
                  n: "01",
                  title: "Скачай и установи лаунчер",
                  desc: "Выбери любой из трёх лаунчеров слева и скачай его с официального сайта",
                  icon: "Download",
                },
                {
                  n: "02",
                  title: "Запусти Minecraft 1.21.1",
                  desc: "В лаунчере выбери версию Java Edition 1.21.1 и дождись загрузки игры",
                  icon: "Play",
                },
                {
                  n: "03",
                  title: "Открой мультиплеер",
                  desc: "В главном меню игры нажми «Сетевая игра» или «Мультиплеер»",
                  icon: "Globe",
                },
                {
                  n: "04",
                  title: "Добавь сервер mc.gamai.club",
                  desc: "Нажми «Добавить сервер», введи адрес mc.gamai.club и подключайся!",
                  icon: "Server",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-oswald font-black text-sm"
                    style={{
                      background: `${themeColor}18`,
                      border: `1px solid ${themeColor}30`,
                      color: themeColor,
                    }}
                  >
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <div className="font-oswald text-white font-semibold uppercase text-sm mb-0.5">{step.title}</div>
                    <div className="text-white/40 font-montserrat text-xs leading-relaxed">{step.desc}</div>
                  </div>
                  <Icon name={step.icon as "Download"} size={18} className="flex-shrink-0 mt-1 opacity-30 group-hover:opacity-60 transition-opacity" style={{ color: themeColor }} />
                </div>
              ))}
            </div>

            {/* IP quick copy */}
            <div
              className="mt-5 flex items-center gap-4 p-4 rounded-xl"
              style={{ background: `${themeColor}10`, border: `1px solid ${themeColor}25` }}
            >
              <Icon name="Copy" size={18} style={{ color: themeColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="font-oswald text-white/50 text-xs uppercase tracking-widest">Адрес сервера</div>
                <div className="font-rajdhani text-white font-bold text-lg tracking-widest">mc.gamai.club</div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText("mc.gamai.club")}
                className="font-oswald uppercase text-xs px-3 py-2 rounded-lg font-semibold text-white transition-all"
                style={{ background: `${themeColor}25`, border: `1px solid ${themeColor}40`, color: themeColor }}
              >
                Копировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
