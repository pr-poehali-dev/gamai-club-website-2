import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import UpdatesCarousel from "@/components/UpdatesCarousel";
import ServerSelector from "@/components/ServerSelector";
import { useServer } from "@/context/ServerContext";

const LOGO = "https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/6411c323-188e-43dd-ab31-60b784e88c8a.jpg";

export default function Home() {
  const { server, setServer } = useServer();
  const [selectorHovered, setSelectorHovered] = useState<"anarchy" | "classic" | null>(null);
  const navigate = useNavigate();

  if (!server) {
    return (
      <div className="min-h-screen" style={{ background: "#030000" }}>
        <ServerSelector
          onSelect={(s) => setServer(s)}
          hovered={selectorHovered}
          setHovered={setSelectorHovered}
        />
      </div>
    );
  }

  const themeColor = server === "classic" ? "#f97316" : "#ff4500";

  return (
    <Layout>
      {/* Hero */}
      <HeroSection server={server} onShopClick={() => navigate("/shop")} />

      {/* Divider */}
      <div
        className="relative z-10 h-px mx-auto max-w-7xl px-6"
        style={{ background: `linear-gradient(to right, transparent, ${themeColor}40, transparent)` }}
      />

      {/* Updates Carousel */}
      <UpdatesCarousel />

      {/* Divider */}
      <div
        className="relative z-10 h-px mx-auto max-w-7xl px-6"
        style={{ background: `linear-gradient(to right, transparent, ${themeColor}40, transparent)` }}
      />

      {/* Server stats block */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anarchy card */}
            <div
              className="rounded-2xl overflow-hidden relative group"
              style={{
                border: `1px solid ${server === "anarchy" ? "#ff450050" : "rgba(255,255,255,0.07)"}`,
                background: "linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(8,2,0,0.9) 100%)",
              }}
            >
              <img
                src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/24fa747d-63ae-4082-87e9-28c7a838c853.jpg"
                alt="Анархия"
                className="w-full h-40 object-cover opacity-40 group-hover:opacity-60 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080200] via-transparent to-transparent" />
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-oswald font-bold text-white text-2xl uppercase">💀 Анархия</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 pulse-dot" />
                    <span className="font-rajdhani text-white/50 text-sm">142 онлайн</span>
                  </div>
                </div>
                <p className="text-white/50 font-montserrat text-sm leading-relaxed mb-5">
                  Полная свобода действий. PvP везде, рейды, грифинг — без ограничений.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[["PvP", "Разрешён"], ["Гриф", "Разрешён"], ["Рейды", "Разрешены"]].map(([label, val]) => (
                    <div key={label} className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="font-rajdhani text-white/30 text-xs uppercase">{label}</div>
                      <div className="font-oswald text-xs font-semibold" style={{ color: "#ff4500" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Classic card */}
            <div
              className="rounded-2xl overflow-hidden relative group"
              style={{
                border: `1px solid ${server === "classic" ? "#f9731650" : "rgba(255,255,255,0.07)"}`,
                background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(8,4,0,0.9) 100%)",
              }}
            >
              <img
                src="https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/743ee0ca-cd49-4f3b-9096-1219e3fd2439.jpg"
                alt="Классика"
                className="w-full h-40 object-cover opacity-40 group-hover:opacity-60 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080400] via-transparent to-transparent" />
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-oswald font-bold text-white text-2xl uppercase">🌲 Классика</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-400 pulse-dot" />
                    <span className="font-rajdhani text-white/50 text-sm">98 онлайн</span>
                  </div>
                </div>
                <p className="text-white/50 font-montserrat text-sm leading-relaxed mb-5">
                  Дружелюбное выживание с экономикой, торговлей и защитой территорий.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[["PvP", "Арена"], ["Защита", "Есть"], ["Экономика", "Есть"]].map(([label, val]) => (
                    <div key={label} className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="font-rajdhani text-white/30 text-xs uppercase">{label}</div>
                      <div className="font-oswald text-xs font-semibold" style={{ color: "#f97316" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${themeColor}18 0%, rgba(5,0,0,0.9) 50%, ${themeColor}08 100%)`,
              border: `1px solid ${themeColor}30`,
              boxShadow: `0 0 80px ${themeColor}15`,
            }}
          >
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${themeColor} 0, ${themeColor} 1px, transparent 0, transparent 50%)`,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative">
              <img src={LOGO} alt="G" className="w-16 h-16 rounded-xl mx-auto mb-6 object-cover" style={{ imageRendering: "pixelated" }} />
              <h2 className="font-oswald font-black text-white text-4xl uppercase mb-3" style={{ letterSpacing: "0.03em" }}>
                GAMAI <span style={{ color: themeColor }}>CLUB</span>
              </h2>
              <p className="text-white/50 font-montserrat mb-8 max-w-sm mx-auto">
                Сотни игроков уже ждут тебя на сервере. Подключись прямо сейчас!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/shop"
                  className="glow-btn font-oswald uppercase font-bold text-white px-8 py-3.5 rounded-xl text-base tracking-wider"
                  style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
                >
                  🛒 Открыть магазин
                </Link>
                <div
                  className="ip-box flex items-center gap-2 px-6 py-3.5 text-white/60 font-rajdhani text-base tracking-widest"
                  onClick={() => navigator.clipboard.writeText("mc.gamai.club")}
                >
                  mc.gamai.club
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}