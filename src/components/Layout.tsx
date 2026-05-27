import type { ReactNode } from "react";
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

  return (
    <div className={`min-h-screen relative ${displayServer === "anarchy" ? "theme-anarchy" : "theme-classic"}`} style={{ background: "#030000" }}>
      <CustomCursor server={displayServer} />
      <VideoBackground server={displayServer} />
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
