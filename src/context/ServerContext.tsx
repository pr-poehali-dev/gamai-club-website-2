import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "@/components/ShopSection";

interface ServerContextType {
  server: "anarchy" | "classic" | null;
  setServer: (s: "anarchy" | "classic") => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}

const ServerContext = createContext<ServerContextType | null>(null);

export function ServerProvider({ children }: { children: ReactNode }) {
  const [server, setServerState] = useState<"anarchy" | "classic" | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const setServer = (s: "anarchy" | "classic") => {
    setServerState(s);
    sessionStorage.setItem("gamai_server", s);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("gamai_server") as "anarchy" | "classic" | null;
    if (saved) setServerState(saved);
  }, []);

  const addToCart = (item: CartItem) => setCartItems(prev => [...prev, item]);
  const removeFromCart = (id: string) => setCartItems(prev => prev.filter(i => i.id !== id));

  return (
    <ServerContext.Provider value={{ server, setServer, cartItems, addToCart, removeFromCart, cartOpen, setCartOpen }}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServer() {
  const ctx = useContext(ServerContext);
  if (!ctx) throw new Error("useServer must be used inside ServerProvider");
  return ctx;
}
