import { useState } from "react";
import Icon from "@/components/ui/icon";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  duration?: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: string;
  badge?: string;
  badgeColor?: string;
  type: "privilege" | "item";
  features?: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "vip",
    name: "VIP",
    description: "Базовые привилегии для комфортной игры",
    basePrice: 149,
    icon: "⭐",
    badge: "Популярное",
    badgeColor: "#ff4500",
    type: "privilege",
    features: ["Префикс [VIP]", "x2 опыт", "Цветной ник", "Приоритет входа"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Расширенные возможности и уникальный контент",
    basePrice: 299,
    icon: "💎",
    badge: "Хит",
    badgeColor: "#7c3aed",
    type: "privilege",
    features: ["Префикс [Premium]", "x3 опыт", "Частный дом", "Полёт в лобби", "Кастомный скин"],
  },
  {
    id: "legend",
    name: "Legend",
    description: "Максимальный статус с эксклюзивными бонусами",
    basePrice: 599,
    icon: "👑",
    badge: "Лучшее",
    badgeColor: "#f59e0b",
    type: "privilege",
    features: ["Префикс [Legend]", "x5 опыт", "2 частных дома", "Полёт везде", "Доступ к /god", "Уникальные эффекты"],
  },
  {
    id: "kit-starter",
    name: "Стартовый набор",
    description: "Железная броня и инструменты для начала",
    basePrice: 79,
    icon: "🛡️",
    type: "item",
  },
  {
    id: "kit-diamonds",
    name: "Алмазный набор",
    description: "Алмазное снаряжение полного комплекта",
    basePrice: 199,
    icon: "💠",
    badge: "Новинка",
    badgeColor: "#06b6d4",
    type: "item",
  },
  {
    id: "coins",
    name: "1000 монет",
    description: "Игровая валюта для покупок на сервере",
    basePrice: 99,
    icon: "🪙",
    type: "item",
  },
];

const DURATIONS = [
  { label: "30 дней", days: 30, multiplier: 1 },
  { label: "60 дней", days: 60, multiplier: 1.8 },
  { label: "90 дней", days: 90, multiplier: 2.5 },
  { label: "Навсегда", days: 0, multiplier: 4 },
];

interface Props {
  server: "anarchy" | "classic";
  onAddToCart: (item: CartItem) => void;
}

export default function ShopSection({ server, onAddToCart }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[0]);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";
  const glowColor = server === "anarchy" ? "rgba(255,69,0,0.4)" : "rgba(249,115,22,0.4)";

  const handleBuy = (product: Product) => {
    if (product.type === "privilege") {
      setSelectedProduct(product);
      setSelectedDuration(DURATIONS[0]);
    } else {
      addToCart(product, undefined);
    }
  };

  const addToCart = (product: Product, duration: typeof DURATIONS[0] | undefined) => {
    const price = duration
      ? Math.round(product.basePrice * duration.multiplier)
      : product.basePrice;

    const item: CartItem = {
      id: `${product.id}-${duration?.days ?? "item"}-${Date.now()}`,
      name: duration ? `${product.name} · ${duration.label}` : product.name,
      price,
      duration: duration?.label,
      icon: product.icon,
    };

    onAddToCart(item);
    setAddedIds(prev => new Set(prev).add(product.id));
    setTimeout(() => setAddedIds(prev => { const next = new Set(prev); next.delete(product.id); return next; }), 1500);
    setSelectedProduct(null);
  };

  return (
    <section id="shop" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block font-rajdhani text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4"
            style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}30`, color: themeColor }}
          >
            Магазин
          </div>
          <h2 className="section-title text-white text-5xl mb-4" style={{ textShadow: `0 0 40px ${glowColor}` }}>
            ПРИВИЛЕГИИ<br />
            <span style={{ color: themeColor }}>И ПРЕДМЕТЫ</span>
          </h2>
          <p className="text-white/40 font-montserrat max-w-md mx-auto">
            Усиль своего персонажа и получи уникальные возможности на сервере
          </p>
        </div>

        {/* Privileges */}
        <div className="mb-8">
          <h3 className="font-oswald text-white/50 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span style={{ color: themeColor }}>—</span> Привилегии
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.filter(p => p.type === "privilege").map(product => (
              <div key={product.id} className="product-card relative">
                {product.badge && (
                  <div
                    className="absolute top-3 right-3 font-oswald text-xs uppercase px-2.5 py-1 rounded-full text-white tracking-wider z-10"
                    style={{ background: product.badgeColor }}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="p-6">
                  <div className="text-4xl mb-4">{product.icon}</div>
                  <h4 className="font-oswald font-bold text-white text-xl uppercase mb-1">{product.name}</h4>
                  <p className="text-white/40 text-sm font-montserrat mb-4 leading-relaxed">{product.description}</p>

                  {product.features && (
                    <ul className="space-y-1.5 mb-6">
                      {product.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-white/60 text-xs font-montserrat">
                          <span style={{ color: themeColor }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/08">
                    <div>
                      <span className="text-white/30 text-xs font-montserrat">от </span>
                      <span className="font-oswald font-bold text-white text-xl">{product.basePrice} ₽</span>
                      <span className="text-white/30 text-xs font-montserrat"> /мес</span>
                    </div>
                    <button
                      className="font-oswald uppercase text-sm px-5 py-2.5 rounded-lg font-semibold text-white transition-all"
                      style={{
                        background: addedIds.has(product.id)
                          ? "rgba(16,185,129,0.8)"
                          : `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})`,
                        boxShadow: `0 0 15px ${glowColor}`,
                      }}
                      onClick={() => handleBuy(product)}
                    >
                      {addedIds.has(product.id) ? "✓ Добавлено" : "Купить"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-oswald text-white/50 text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span style={{ color: themeColor }}>—</span> Предметы
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.filter(p => p.type === "item").map(product => (
              <div key={product.id} className="product-card relative flex items-center gap-4 p-4">
                {product.badge && (
                  <div
                    className="absolute top-2 right-2 font-oswald text-xs uppercase px-2 py-0.5 rounded-full text-white tracking-wider"
                    style={{ background: product.badgeColor }}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="text-3xl flex-shrink-0">{product.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-oswald font-semibold text-white text-base uppercase">{product.name}</h4>
                  <p className="text-white/40 text-xs font-montserrat truncate">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-oswald font-bold text-white">{product.basePrice} ₽</span>
                    <button
                      className="font-oswald uppercase text-xs px-3 py-1.5 rounded-lg font-semibold text-white"
                      style={{
                        background: addedIds.has(product.id)
                          ? "rgba(16,185,129,0.8)"
                          : `${themeColor}cc`,
                      }}
                      onClick={() => handleBuy(product)}
                    >
                      {addedIds.has(product.id) ? "✓" : "+ В корзину"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duration modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setSelectedProduct(null)}>
          <div
            className="w-full max-w-md mx-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,2,0,0.99)",
              border: `1px solid ${themeColor}40`,
              boxShadow: `0 0 60px ${glowColor}`,
            }}
          >
            <div className="p-6 border-b border-white/08">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedProduct.icon}</span>
                  <div>
                    <h3 className="font-oswald text-white font-bold text-xl uppercase">{selectedProduct.name}</h3>
                    <p className="text-white/40 text-xs font-montserrat">Выберите срок действия</p>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-white/40 hover:text-white/80">
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {DURATIONS.map(dur => {
                const price = Math.round(selectedProduct.basePrice * dur.multiplier);
                const isSelected = selectedDuration.days === dur.days;
                return (
                  <button
                    key={dur.days}
                    className="w-full flex items-center justify-between p-4 rounded-xl transition-all"
                    style={{
                      background: isSelected ? `${themeColor}20` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isSelected ? themeColor : "rgba(255,255,255,0.08)"}`,
                    }}
                    onClick={() => setSelectedDuration(dur)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: isSelected ? themeColor : "rgba(255,255,255,0.2)" }}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full" style={{ background: themeColor }} />}
                      </div>
                      <span className="font-oswald text-white uppercase font-semibold">{dur.label}</span>
                      {dur.days === 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-oswald uppercase"
                          style={{ background: "#f59e0b30", color: "#f59e0b" }}>
                          Выгодно
                        </span>
                      )}
                    </div>
                    <span className="font-oswald font-bold text-white text-lg">{price} ₽</span>
                  </button>
                );
              })}

              <button
                className="w-full font-oswald uppercase font-bold text-white py-4 rounded-xl text-base tracking-wider mt-4 glow-btn"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
                onClick={() => addToCart(selectedProduct, selectedDuration)}
              >
                🛒 Добавить в корзину · {Math.round(selectedProduct.basePrice * selectedDuration.multiplier)} ₽
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
