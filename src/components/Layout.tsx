import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartPanel from "./CartPanel";
import CustomCursor from "./CustomCursor";
import VideoBackground from "./VideoBackground";
import { useServer } from "@/context/ServerContext";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { server, cartItems, removeFromCart, cartOpen, setCartOpen } = useServer();
  const displayServer = server || "anarchy";
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`min-h-screen relative ${displayServer === "anarchy" ? "theme-anarchy" : "theme-classic"}`}
      style={{ background: "#030000" }}
    >
      <CustomCursor server={displayServer} />

      {/* Video only on home page */}
      {isHome && <VideoBackground server={displayServer} />}

      {/* Non-home dark background with subtle texture */}
      {!isHome && (
        <div
          className="fixed inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,69,0,0.06) 0%, #030000 60%)",
          }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      )}

      <Navbar />
      <main className="relative z-10 pt-16">
        {children}
      </main>
      <Footer server={displayServer} />
      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        server={displayServer}
      />
    </div>
  );
}
