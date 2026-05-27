import Icon from "@/components/ui/icon";

interface Props {
  server: "anarchy" | "classic";
}

export default function ContactsSection({ server }: Props) {
  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";
  const glowColor = server === "anarchy" ? "rgba(255,69,0,0.3)" : "rgba(249,115,22,0.3)";

  const contacts = [
    {
      icon: "🎮",
      title: "Discord",
      desc: "Основной канал поддержки и общения",
      link: "https://discord.gg/gamai",
      label: "discord.gg/gamai",
      lucide: "MessageCircle",
    },
    {
      icon: "📱",
      title: "Telegram",
      desc: "Новости и анонсы сервера",
      link: "https://t.me/gamai_club",
      label: "@gamai_club",
      lucide: "Send",
    },
    {
      icon: "🌐",
      title: "VK",
      desc: "Сообщество ВКонтакте",
      link: "https://vk.com/gamai_club",
      label: "vk.com/gamai_club",
      lucide: "Globe",
    },
    {
      icon: "📧",
      title: "Email",
      desc: "По вопросам сотрудничества и рекламы",
      link: "mailto:admin@gamai.club",
      label: "admin@gamai.club",
      lucide: "Mail",
    },
  ];

  return (
    <section id="contacts" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block font-rajdhani text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4"
            style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30`, color: themeColor }}
          >
            Контакты
          </div>
          <h2 className="section-title text-white text-5xl mb-4"
            style={{ textShadow: `0 0 40px ${glowColor}` }}>
            СВЯЗАТЬСЯ<br />
            <span style={{ color: themeColor }}>С НАМИ</span>
          </h2>
          <p className="text-white/40 font-montserrat">
            Мы всегда на связи — выбери удобный способ
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contacts.map(c => (
            <a
              key={c.title}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card p-5 flex flex-col items-center text-center gap-3 group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all"
                style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}25` }}
              >
                {c.icon}
              </div>
              <div>
                <h4 className="font-oswald text-white font-bold uppercase tracking-wide text-base">{c.title}</h4>
                <p className="text-white/40 font-montserrat text-xs mt-0.5 leading-relaxed">{c.desc}</p>
                <p
                  className="font-rajdhani text-sm mt-2 font-semibold transition-colors"
                  style={{ color: themeColor }}
                >
                  {c.label}
                </p>
              </div>
              <Icon name="ArrowUpRight" size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: themeColor }} />
            </a>
          ))}
        </div>

        {/* Server info big block */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${themeColor}12 0%, rgba(5,0,0,0.8) 100%)`,
            border: `1px solid ${themeColor}25`,
            boxShadow: `0 0 60px ${glowColor}`,
          }}
        >
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="font-oswald text-white font-black text-3xl uppercase mb-2">
            ПРИСОЕДИНЯЙСЯ К <span style={{ color: themeColor }}>GAMAI CLUB</span>
          </h3>
          <p className="text-white/50 font-montserrat mb-6 max-w-md mx-auto">
            Тысячи игроков уже на нашем сервере. Начни приключение прямо сейчас!
          </p>
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-rajdhani text-white/80 text-lg tracking-widest"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Icon name="Server" size={18} className="text-white/40" />
            mc.gamai.club
          </div>
          <p className="text-white/25 font-rajdhani text-xs mt-3 uppercase tracking-widest">
            Java Edition · Версия 1.21.1
          </p>
        </div>
      </div>
    </section>
  );
}
