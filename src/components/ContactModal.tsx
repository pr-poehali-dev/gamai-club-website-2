import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useServer } from "@/context/ServerContext";

interface Props {
  onClose: () => void;
}

const TOPICS = [
  { id: "ban", label: "Обжалование бана", icon: "🔨" },
  { id: "bug", label: "Сообщить об ошибке", icon: "🐛" },
  { id: "report", label: "Жалоба на игрока", icon: "⚠️" },
  { id: "shop", label: "Вопрос по покупке", icon: "🛒" },
  { id: "other", label: "Другое", icon: "💬" },
];

export default function ContactModal({ onClose }: Props) {
  const { server } = useServer();
  const themeColor = server === "classic" ? "#f97316" : "#ff4500";
  const glowColor = server === "classic" ? "rgba(249,115,22,0.35)" : "rgba(255,69,0,0.35)";

  const [topic, setTopic] = useState("");
  const [nick, setNick] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !nick || !message) return;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in"
        style={{
          background: "linear-gradient(160deg, rgba(18,5,0,0.99) 0%, rgba(8,2,0,0.99) 100%)",
          border: `1px solid ${themeColor}40`,
          boxShadow: `0 0 80px ${glowColor}, 0 40px 80px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Header */}
        <div
          className="relative p-6 pb-5"
          style={{
            background: `linear-gradient(135deg, ${themeColor}15, transparent)`,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Decorative corner */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full"
            style={{ background: `radial-gradient(circle, ${themeColor}, transparent 70%)` }}
          />
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${themeColor}20`, border: `1px solid ${themeColor}30` }}
              >
                📨
              </div>
              <div>
                <h3 className="font-oswald font-bold text-white text-xl uppercase tracking-wide">
                  Связаться с нами
                </h3>
                <p className="text-white/40 font-montserrat text-xs">Модерация ответит в течение 24 часов</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {sent ? (
          /* Success state */
          <div className="p-10 text-center">
            <div className="text-6xl mb-5">✅</div>
            <h4 className="font-oswald font-bold text-white text-2xl uppercase mb-2">Заявка отправлена!</h4>
            <p className="text-white/50 font-montserrat text-sm mb-6 leading-relaxed">
              Твоё обращение принято. Модератор ответит в Discord или по нику в игре.
            </p>
            <button
              onClick={onClose}
              className="font-oswald uppercase font-bold text-white px-8 py-3 rounded-xl glow-btn"
              style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Server indicator */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-oswald uppercase tracking-wider"
              style={{ background: `${themeColor}10`, border: `1px solid ${themeColor}20`, color: themeColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: themeColor }} />
              {server === "anarchy" ? "💀 Сервер Анархия" : "🌲 Сервер Классика"}
            </div>

            {/* Topic select */}
            <div>
              <label className="block font-oswald text-white/60 text-xs uppercase tracking-widest mb-3">
                Тема обращения
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPICS.map(t => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTopic(t.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: topic === t.id ? `${themeColor}18` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${topic === t.id ? themeColor + "50" : "rgba(255,255,255,0.07)"}`,
                      color: topic === t.id ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span className="text-base">{t.icon}</span>
                    <span className="font-montserrat text-xs leading-tight">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nick */}
            <div>
              <label className="block font-oswald text-white/60 text-xs uppercase tracking-widest mb-2">
                Ник в игре
              </label>
              <input
                type="text"
                value={nick}
                onChange={e => setNick(e.target.value)}
                placeholder="Введи свой ник..."
                className="w-full px-4 py-3 rounded-xl font-montserrat text-sm text-white placeholder-white/20 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${nick ? themeColor + "40" : "rgba(255,255,255,0.08)"}`,
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-oswald text-white/60 text-xs uppercase tracking-widest mb-2">
                Сообщение
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Опиши свою проблему подробно..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl font-montserrat text-sm text-white placeholder-white/20 outline-none resize-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${message ? themeColor + "40" : "rgba(255,255,255,0.08)"}`,
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!topic || !nick || !message}
              className="w-full font-oswald uppercase font-bold text-white py-4 rounded-xl text-base tracking-wider transition-all"
              style={{
                background: topic && nick && message
                  ? `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})`
                  : "rgba(255,255,255,0.08)",
                color: topic && nick && message ? "white" : "rgba(255,255,255,0.3)",
                boxShadow: topic && nick && message ? `0 0 20px ${glowColor}` : "none",
                cursor: topic && nick && message ? "pointer" : "not-allowed",
              }}
            >
              📨 Отправить обращение
            </button>

            <p className="text-center text-white/20 font-montserrat text-xs">
              Также можно написать в Discord — discord.gg/gamai
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
