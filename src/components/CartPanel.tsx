import Icon from "@/components/ui/icon";
import type { CartItem } from "./ShopSection";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  server: "anarchy" | "classic";
}

export default function CartPanel({ isOpen, onClose, items, onRemove, server }: Props) {
  const themeColor = server === "anarchy" ? "#ff4500" : "#f97316";
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[8500]"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className="cart-panel"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          borderColor: `${themeColor}30`,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/08">
            <div>
              <h3 className="font-oswald text-white font-bold text-xl uppercase tracking-wide">Корзина</h3>
              <p className="text-white/30 font-rajdhani text-sm">{items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors">
              <Icon name="X" size={22} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="text-5xl mb-4">🛒</div>
                <p className="font-oswald text-white/30 uppercase tracking-wide">Корзина пуста</p>
                <p className="text-white/20 font-montserrat text-sm mt-2">Добавьте товары из магазина</p>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-oswald text-white text-sm uppercase font-semibold truncate">{item.name}</p>
                    <p className="font-oswald text-sm font-bold" style={{ color: themeColor }}>{item.price} ₽</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/08 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-oswald text-white/60 uppercase tracking-wide text-sm">Итого</span>
                <span className="font-oswald font-black text-white text-2xl">{total} ₽</span>
              </div>
              <button
                className="w-full font-oswald uppercase font-bold text-white py-4 rounded-xl text-base tracking-wider glow-btn"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${server === "anarchy" ? "#cc2200" : "#c05c00"})` }}
              >
                Оформить заказ
              </button>
              <p className="text-center text-white/20 font-montserrat text-xs">
                Безопасная оплата · Моментальная выдача
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
