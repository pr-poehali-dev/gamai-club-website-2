import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useServer } from "@/context/ServerContext";

const UPDATES = [
  {
    id: 1,
    date: "28 мая 2025",
    tag: "Обновление",
    tagColor: "#ff4500",
    title: "Новый сезон Анархии",
    desc: "Стартовал новый сезон на сервере Анархия. Мир полностью сброшен, все начинают с чистого листа!",
    icon: "💀",
    server: "anarchy",
  },
  {
    id: 2,
    date: "25 мая 2025",
    tag: "Событие",
    tagColor: "#f59e0b",
    title: "Турнир строителей",
    desc: "На сервере Классика стартует грандиозный турнир строителей. Призовой фонд 5000 монет!",
    icon: "🏗️",
    server: "classic",
  },
  {
    id: 3,
    date: "20 мая 2025",
    tag: "Патч 1.21.1",
    tagColor: "#10b981",
    title: "Обновление до версии 1.21.1",
    desc: "Оба сервера обновлены до Minecraft 1.21.1. Добавлены новые блоки, мобы и улучшения производительности.",
    icon: "⚙️",
    server: "both",
  },
  {
    id: 4,
    date: "15 мая 2025",
    tag: "Скидки",
    tagColor: "#7c3aed",
    title: "Скидки 30% в магазине",
    desc: "Только 3 дня! Скидка 30% на все привилегии VIP и Premium. Не упусти шанс!",
    icon: "🎉",
    server: "both",
  },
  {
    id: 5,
    date: "10 мая 2025",
    tag: "Правила",
    tagColor: "#ef4444",
    title: "Обновление правил сервера",
    desc: "Пересмотрены и дополнены правила для Анархии и Классики. Ознакомьтесь обязательно!",
    icon: "📜",
    server: "both",
  },
];

export default function UpdatesCarousel() {
  const { server } = useServer();
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval>>();
  const themeColor = server === "classic" ? "#f97316" : "#ff4500";

  const filteredUpdates = UPDATES.filter(
    u => u.server === "both" || u.server === (server || "anarchy")
  );

  const count = filteredUpdates.length;

  const prev = () => setCurrent(c => (c - 1 + count) % count);
  const next = () => setCurrent(c => (c + 1) % count);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
  };

  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [count]);

  const handleDragStart = (x: number) => {
    setDragging(true);
    dragStart.current = x;
    clearInterval(autoRef.current);
  };

  const handleDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { next(); } else { prev(); }
    }
    resetAuto();
  };

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div
              className="inline-block font-rajdhani text-xs uppercase tracking-[0.3em] px-3 py-1.5 rounded-full mb-3"
              style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30`, color: themeColor }}
            >
              Новости
            </div>
            <h2 className="section-title text-white text-4xl">
              ПОСЛЕДНИЕ <span style={{ color: themeColor }}>ОБНОВЛЕНИЯ</span>
            </h2>
          </div>
          {/* Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => { prev(); resetAuto(); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={() => { next(); resetAuto(); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden rounded-2xl"
          onMouseDown={e => handleDragStart(e.clientX)}
          onMouseUp={e => handleDragEnd(e.clientX)}
          onTouchStart={e => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
          style={{ userSelect: "none" }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {filteredUpdates.map(update => (
              <div
                key={update.id}
                className="flex-shrink-0 w-full"
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(20,5,0,0.9) 0%, rgba(8,2,0,0.95) 100%)",
                    border: `1px solid ${update.tagColor}30`,
                    boxShadow: `0 0 40px ${update.tagColor}10`,
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left: icon */}
                    <div
                      className="md:w-64 flex-shrink-0 flex items-center justify-center py-12 md:py-16"
                      style={{
                        background: `linear-gradient(135deg, ${update.tagColor}20, ${update.tagColor}05)`,
                        borderRight: `1px solid ${update.tagColor}20`,
                      }}
                    >
                      <span style={{ fontSize: "72px", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))" }}>
                        {update.icon}
                      </span>
                    </div>
                    {/* Right: content */}
                    <div className="flex-1 p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="font-oswald text-xs uppercase px-3 py-1 rounded-full tracking-wider"
                          style={{ background: `${update.tagColor}25`, color: update.tagColor }}
                        >
                          {update.tag}
                        </span>
                        <span className="text-white/30 font-rajdhani text-sm">{update.date}</span>
                      </div>
                      <h3 className="font-oswald font-bold text-white text-2xl md:text-3xl uppercase mb-3" style={{ letterSpacing: "0.02em" }}>
                        {update.title}
                      </h3>
                      <p className="text-white/60 font-montserrat leading-relaxed max-w-lg">
                        {update.desc}
                      </p>
                      <button
                        className="mt-6 font-oswald uppercase text-sm font-semibold flex items-center gap-2 transition-all hover:gap-3"
                        style={{ color: update.tagColor }}
                      >
                        Подробнее <Icon name="ArrowRight" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {filteredUpdates.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetAuto(); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? themeColor : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}