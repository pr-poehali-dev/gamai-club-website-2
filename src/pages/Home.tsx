import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import UpdatesCarousel from "@/components/UpdatesCarousel";
import LauncherBlock from "@/components/LauncherBlock";
import ServerSelector from "@/components/ServerSelector";
import { useServer } from "@/context/ServerContext";

const LOGO = "https://cdn.poehali.dev/projects/c58b9026-4e75-48ec-a5cf-93c482f03610/files/25b7abf2-7c10-4245-8a5c-784434c90167.jpg";

export default function Home() {
  const { server, setServer } = useServer();
  const [selectorHovered, setSelectorHovered] = useState<"anarchy" | "classic" | null>(null);

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
      <HeroSection server={server} onShopClick={() => {}} />

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

      {/* Launcher Block */}
      <LauncherBlock />

      {/* Divider */}
      <div
        className="relative z-10 h-px mx-auto max-w-7xl px-6"
        style={{ background: `linear-gradient(to right, transparent, ${themeColor}40, transparent)` }}
      />

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
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${themeColor} 0, ${themeColor} 1px, transparent 0, transparent 50%)`,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative">
              <img
                src={LOGO}
                alt="G"
                className="w-16 h-16 rounded-xl mx-auto mb-6 object-cover"
                style={{ imageRendering: "pixelated" }}
              />
              <h2
                className="font-oswald font-black text-white text-4xl uppercase mb-3"
                style={{ letterSpacing: "0.03em" }}
              >
                GAMAI <span style={{ color: themeColor }}>CLUB</span>
              </h2>
              <p className="text-white/50 font-montserrat mb-8 max-w-sm mx-auto">
                Сотни игроков уже ждут тебя на сервере. Подключись прямо сейчас!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/shop"
                  className="glow-btn font-oswald uppercase font-bold text-white px-8 py-3.5 rounded-xl text-base tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})`,
                  }}
                >
                  🛒 Открыть магазин
                </Link>
                <button
                  className="ip-box flex items-center gap-2 px-6 py-3.5 text-white/60 font-rajdhani text-base tracking-widest"
                  onClick={() => navigator.clipboard.writeText("mc.gamai.club")}
                >
                  mc.gamai.club
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
