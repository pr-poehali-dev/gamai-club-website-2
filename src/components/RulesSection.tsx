import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  server: "anarchy" | "classic";
}

const RULES = {
  anarchy: [
    {
      title: "Основные правила",
      icon: "⚔️",
      items: [
        "Читы на X-Ray запрещены",
        "DDoS-атаки на сервер — бан навсегда",
        "Запрещено использование эксплойтов дюпа предметов",
        "Оскорбления администрации — кик/мут",
        "Реклама других серверов запрещена",
      ],
    },
    {
      title: "PVP и рейды",
      icon: "💀",
      items: [
        "PvP разрешено везде",
        "Рейды разрешены без ограничений",
        "Гриф разрешён",
        "Спавнкилл у точки возрождения запрещён",
        "Трапы на спавне запрещены",
      ],
    },
    {
      title: "Чат",
      icon: "💬",
      items: [
        "Мат разрешён в меру",
        "Расизм и дискриминация — бан",
        "Спам запрещён",
        "Личные данные игроков не распространять",
        "Флуд ссылками запрещён",
      ],
    },
    {
      title: "Запрещённые читы",
      icon: "🚫",
      items: [
        "KillAura / Aimbot",
        "X-Ray и похожие моды",
        "Speed hack / Fly hack",
        "Duplication exploits",
        "Автокликеры (более 15 КПС)",
      ],
    },
  ],
  classic: [
    {
      title: "Основные правила",
      icon: "📜",
      items: [
        "Уважительное отношение ко всем игрокам",
        "Запрещено воровство на общих территориях",
        "Гриф чужих построек — бан",
        "Реклама запрещена",
        "Соблюдай правила форума и Discord",
      ],
    },
    {
      title: "Строительство",
      icon: "🏗️",
      items: [
        "Не строй вблизи чужих построек без разрешения",
        "Убирай незаконченные постройки",
        "Не создавай лагодроны",
        "Гигантские фермы нужно согласовать с модером",
        "Уважай общие территории сервера",
      ],
    },
    {
      title: "Экономика",
      icon: "🪙",
      items: [
        "Мошенничество при торговле запрещено",
        "Не занижай рынок намеренно",
        "Дюп предметов — немедленный бан",
        "Нечестные методы заработка запрещены",
        "Сообщай об ошибках экономики администрации",
      ],
    },
    {
      title: "Чат",
      icon: "💬",
      items: [
        "Культурное общение обязательно",
        "Мат запрещён",
        "Флуд и спам — мут",
        "Уважай мнение других",
        "18+ тематика запрещена",
      ],
    },
  ],
};

export default function RulesSection({ server }: Props) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));
  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";
  const rules = RULES[server];

  const toggle = (idx: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });
  };

  return (
    <section id="rules" className="relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block font-rajdhani text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4"
            style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30`, color: themeColor }}
          >
            Правила
          </div>
          <h2 className="section-title text-white text-5xl mb-4"
            style={{ textShadow: `0 0 40px ${themeColor}40` }}>
            ПРАВИЛА<br />
            <span style={{ color: themeColor }}>
              {server === "anarchy" ? "АНАРХИИ" : "КЛАССИКИ"}
            </span>
          </h2>
          <p className="text-white/40 font-montserrat">
            {server === "anarchy"
              ? "Даже в анархии есть несколько базовых правил"
              : "Соблюдай правила для комфортной игры всех"}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {rules.map((section, idx) => {
            const isOpen = openItems.has(idx);
            return (
              <div key={idx} className="rules-accordion-item" style={{ borderColor: isOpen ? `${themeColor}40` : undefined }}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => toggle(idx)}
                  style={{ background: isOpen ? `${themeColor}08` : "transparent" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-oswald text-white font-semibold uppercase tracking-wide text-base">
                      {section.title}
                    </span>
                  </div>
                  <Icon
                    name={isOpen ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className="transition-transform flex-shrink-0"
                    style={{ color: isOpen ? themeColor : "rgba(255,255,255,0.3)" }}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="border-t border-white/06 pt-4 space-y-2.5">
                      {section.items.map((rule, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold mt-0.5"
                            style={{ background: `${themeColor}20`, color: themeColor }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-white/65 font-montserrat text-sm leading-relaxed">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div
          className="mt-8 p-5 rounded-xl flex items-start gap-4"
          style={{ background: `${themeColor}10`, border: `1px solid ${themeColor}25` }}
        >
          <Icon name="AlertTriangle" size={20} style={{ color: themeColor }} className="flex-shrink-0 mt-0.5" />
          <p className="text-white/50 font-montserrat text-sm leading-relaxed">
            Незнание правил не освобождает от ответственности. Администрация оставляет за собой право применять санкции по своему усмотрению.
          </p>
        </div>
      </div>
    </section>
  );
}