import { useState, useRef } from "react";
import CustomCursor from "@/components/CustomCursor";
import ServerSelector from "@/components/ServerSelector";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShopSection from "@/components/ShopSection";
import type { CartItem } from "@/components/ShopSection";
import CartPanel from "@/components/CartPanel";
import RulesSection from "@/components/RulesSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

export default function Index() {
  const [server, setServer] = useState<"anarchy" | "classic" | null>(null);
  const [selectorHovered, setSelectorHovered] = useState<"anarchy" | "classic" | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState("home");

  const shopRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const handleServerSelect = (s: "anarchy" | "classic") => {
    setServer(s);
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const scrollTo = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      shop: shopRef,
      rules: rulesRef,
      contacts: contactsRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayServer = selectorHovered || server || "anarchy";
  const themeClass = displayServer === "anarchy" ? "theme-anarchy" : "theme-classic";

  return (
    <div
      className={`min-h-screen relative ${themeClass}`}
      style={{ background: "#030000" }}
    >
      <CustomCursor server={displayServer} />

      {/* Server selector overlay */}
      {!server && (
        <ServerSelector
          onSelect={handleServerSelect}
          hovered={selectorHovered}
          setHovered={setSelectorHovered}
        />
      )}

      {server && (
        <>
          {/* Video background */}
          <VideoBackground server={server} />

          {/* Navbar */}
          <Navbar
            server={server}
            cartCount={cartItems.length}
            onCartOpen={() => setCartOpen(true)}
            activeSection={activeSection}
            onNav={scrollTo}
          />

          {/* Main content */}
          <main className="relative">
            <div ref={homeRef}>
              <HeroSection server={server} onShopClick={() => scrollTo("shop")} />
            </div>

            <div
              className="relative z-10 h-px mx-auto max-w-7xl"
              style={{ background: `linear-gradient(to right, transparent, ${server === "anarchy" ? "#ff450040" : "#f9731640"}, transparent)` }}
            />

            <div ref={shopRef}>
              <ShopSection server={server} onAddToCart={addToCart} />
            </div>

            <div
              className="relative z-10 h-px mx-auto max-w-7xl"
              style={{ background: `linear-gradient(to right, transparent, ${server === "anarchy" ? "#ff450040" : "#f9731640"}, transparent)` }}
            />

            <div ref={rulesRef}>
              <RulesSection server={server} />
            </div>

            <div
              className="relative z-10 h-px mx-auto max-w-7xl"
              style={{ background: `linear-gradient(to right, transparent, ${server === "anarchy" ? "#ff450040" : "#f9731640"}, transparent)` }}
            />

            <div ref={contactsRef}>
              <ContactsSection server={server} />
            </div>
          </main>

          <Footer server={server} />

          {/* Cart panel */}
          <CartPanel
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            items={cartItems}
            onRemove={removeFromCart}
            server={server}
          />
        </>
      )}
    </div>
  );
}
