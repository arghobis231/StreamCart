import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  ShoppingBag,
  Clock,
  Truck,
  CreditCard,
  Lock,
  ChevronRight,
  Radio,
  ExternalLink,
  Package,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { ProductItem, ProductVariant, ScreenId, LiveOrder } from '../types';

export interface ConsumerCartItem {
  id: string;
  product: ProductItem;
  variant: ProductVariant;
  quantity: number;
  addedAt: string;
}

interface CartViewProps {
  cartItems: ConsumerCartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: (orders: LiveOrder[], totalPaid: number) => void;
  onNavigate: (screen: ScreenId) => void;
  onQuickAddProduct?: (product: ProductItem) => void;
  availableProducts?: ProductItem[];
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onNavigate,
  onQuickAddProduct,
  availableProducts = [],
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; label: string } | null>({
    code: 'TECHLIVE25',
    percent: 25,
    label: '25% Livestream Flash Drop Special',
  });
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card' | 'shoppay'>('apple_pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ orderNumber: string; total: number; count: number } | null>(null);

  // Available Promo Codes
  const activePromoCodes: Record<string, { percent: number; label: string }> = {
    TECHLIVE25: { percent: 25, label: '25% Livestream Flash Drop Special' },
    GLOW35: { percent: 35, label: '35% Glass Skin Routine Masterclass' },
    BREW20: { percent: 20, label: '20% Barista Specialty Coffee Drop' },
    ROGUE15: { percent: 15, label: '15% Pro Gamer Battlestation Discount' },
    STREAMVIP: { percent: 30, label: '30% VIP Host Loyalty Reward' },
  };

  // Math Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  const discountMultiplier = appliedPromo ? appliedPromo.percent / 100 : 0;
  const discountAmount = rawSubtotal * discountMultiplier;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);

  // Free shipping over $75
  const freeShippingThreshold = 75;
  const isFreeShipping = subtotalAfterDiscount >= freeShippingThreshold || cartItems.length === 0;
  const shippingCost = isFreeShipping ? 0 : 9.99;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);
  const freeShippingProgress = Math.min(100, (subtotalAfterDiscount / freeShippingThreshold) * 100);

  const estimatedTax = subtotalAfterDiscount * 0.0825; // 8.25%
  const finalTotal = subtotalAfterDiscount + shippingCost + estimatedTax;

  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoCodeInput).trim().toUpperCase();
    if (!code) return;

    if (activePromoCodes[code]) {
      setAppliedPromo({
        code,
        percent: activePromoCodes[code].percent,
        label: activePromoCodes[code].label,
      });
      setPromoCodeInput('');
      setPromoError(null);
      setPromoSuccess(true);
      setTimeout(() => setPromoSuccess(false), 2500);
    } else {
      setPromoError('Invalid coupon code. Try TECHLIVE25, GLOW35, or BREW20.');
      setTimeout(() => setPromoError(null), 3000);
    }
  };

  const handleExecuteCheckout = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderNum = `#SC-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrders: LiveOrder[] = cartItems.map((item, idx) => ({
        id: `ord-${Date.now()}-${idx}`,
        orderNumber: `${generatedOrderNum}-${idx + 1}`,
        customerName: 'Argho Biswas',
        productTitle: item.product.title,
        variant: item.variant?.name || 'Standard',
        amount: Number((item.product.salePrice * item.quantity * (1 - discountMultiplier)).toFixed(2)),
        timestamp: 'Just now',
        status: 'Confirmed',
        paymentMethod: paymentMethod === 'apple_pay' ? 'Apple Pay' : paymentMethod === 'card' ? 'Visa •••• 4242' : 'Shop Pay',
      }));

      onCheckout(newOrders, finalTotal);
      setConfirmedOrder({
        orderNumber: generatedOrderNum,
        total: finalTotal,
        count: totalUnits,
      });
    }, 1200);
  };

  if (confirmedOrder) {
    return (
      <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 flex items-center justify-center select-none min-h-0">
        <div className="max-w-lg w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Purchase Confirmed & Locked</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Order #{confirmedOrder.orderNumber} Placed!</h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
              Thank you for shopping live, <strong className="text-white">Argho Biswas</strong>! Your drops have been reserved and receipt sent to <strong className="text-teal-400">arghobiswas144@gmail.com</strong>.
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 text-xs space-y-2 text-left">
            <div className="flex justify-between text-zinc-400">
              <span>Items Purchased:</span>
              <span className="font-semibold text-white">{confirmedOrder.count} items</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Total Paid:</span>
              <span className="font-bold text-emerald-400 font-mono">${confirmedOrder.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Estimated Delivery:</span>
              <span className="font-medium text-zinc-200">2-3 Business Days (Express Air)</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Fulfillment Status:</span>
              <span className="font-bold text-teal-400 flex items-center gap-1">
                <Truck className="w-3 h-3" /> Preparing for Dispatch
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                setConfirmedOrder(null);
                onNavigate('orders');
              }}
              className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-blue-400" />
              <span>View in Orders Tab</span>
            </button>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                onNavigate('viewer');
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Back to Live Stream</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-4 lg:p-8 space-y-8 select-none max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight">Consumer Shopping Cart</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {totalUnits} {totalUnits === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Review items added during live broadcast drops, apply stream promo codes, and complete checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {cartItems.length > 0 && (
            <button
              onClick={onClearCart}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('viewer')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Return to Live Stream</span>
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        /* Empty State */
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-10 lg:p-16 text-center space-y-6 max-w-2xl mx-auto shadow-xl">
          <div className="w-20 h-20 bg-zinc-800/80 rounded-full flex items-center justify-center mx-auto text-zinc-500 border border-zinc-700">
            <ShoppingCart className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg lg:text-xl font-black text-white">Your consumer cart is currently empty</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Explore ongoing livestreams to grab exclusive flash drops, limited-quantity discounts, and live host specials.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('viewer')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Join Live Stream Drop</span>
            </button>

            <button
              onClick={() => onNavigate('discover')}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-teal-400" />
              <span>Browse All Streams (6 Live)</span>
            </button>
          </div>

          {/* Quick Add Suggestions */}
          {availableProducts.length > 0 && onQuickAddProduct && (
            <div className="pt-8 border-t border-zinc-800 text-left space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Featured Live Drops Available Right Now
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Flash Pricing Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableProducts.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl flex items-center gap-3 group transition-all"
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-14 h-14 rounded-xl object-cover bg-zinc-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                        {prod.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-black text-emerald-400 font-mono">${prod.salePrice}</span>
                        <span className="text-[10px] text-zinc-500 line-through">${prod.originalPrice}</span>
                      </div>
                      <button
                        onClick={() => onQuickAddProduct(prod)}
                        className="mt-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Main Cart Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-400" />
                  <span className="font-bold text-white">
                    {isFreeShipping ? (
                      <span className="text-emerald-400">🎉 Congratulations! You have unlocked FREE Express Shipping!</span>
                    ) : (
                      <span>
                        Add <strong className="text-emerald-400 font-mono">${remainingForFreeShipping.toFixed(2)}</strong> more to get <strong className="text-teal-400">FREE Express Air Delivery</strong>
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 font-semibold">{freeShippingProgress.toFixed(0)}%</span>
              </div>

              <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Table / Cards */}
            <div className="space-y-3">
              {cartItems.map((item) => {
                const itemTotal = item.product.salePrice * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="p-4 lg:p-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-20 h-20 rounded-xl object-cover bg-zinc-950 border border-zinc-800"
                        />
                        {item.product.badge && (
                          <span className="absolute -top-1.5 -left-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-red-600 text-white shadow-md">
                            {item.product.badge}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm font-bold text-white truncate max-w-md">
                          {item.product.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {item.variant && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-semibold text-zinc-300">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                                style={{ backgroundColor: item.variant.colorHex || '#71717A' }}
                              />
                              {item.variant.name}
                            </span>
                          )}

                          <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Live Flash Drop Price
                          </span>
                        </div>

                        {/* Live Host Demonstration Indicator */}
                        <div className="mt-2 p-2 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                            <span className="text-[11px] text-zinc-200 truncate">
                              Featured live on air in active broadcast
                            </span>
                          </div>
                          <button
                            onClick={() => onNavigate('viewer')}
                            className="text-[11px] font-bold text-red-400 hover:text-red-300 shrink-0 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Watch Live</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                      <div className="text-left sm:text-right">
                        <div className="text-base font-black text-white font-mono">
                          ${itemTotal.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          ${item.product.salePrice.toFixed(2)} each
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete Item Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Security Guarantee Banner */}
            <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl flex items-center justify-between gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted Instant Checkout • 30-Day Money-Back Guarantee</span>
              </div>
              <span className="text-zinc-500 font-mono text-[11px]">StreamCart SecurePay</span>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-5 shadow-2xl">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Order Summary</span>
              </h2>

              {/* Promo Code Box */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-teal-400" />
                  <span>Livestream Coupon Code</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. TECHLIVE25)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 uppercase font-mono"
                  />
                  <button
                    onClick={() => handleApplyPromo()}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoError && (
                  <p className="text-[11px] text-red-400 font-medium">{promoError}</p>
                )}

                {promoSuccess && (
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon applied successfully!
                  </p>
                )}

                {/* Quick One-Click Coupon Chips */}
                <div className="pt-2">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block mb-1.5">
                    Click to activate live codes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(activePromoCodes).map(([code, info]) => {
                      const isCurrent = appliedPromo?.code === code;
                      return (
                        <button
                          key={code}
                          onClick={() => handleApplyPromo(code)}
                          className={`text-[10px] px-2 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 ring-1 ring-emerald-500/30'
                              : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          {code} ({info.percent}% OFF)
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({totalUnits} items)</span>
                  <span className="font-semibold text-zinc-200 font-mono">${rawSubtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {appliedPromo.code} ({appliedPromo.percent}% OFF)
                    </span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-zinc-500" /> Shipping
                  </span>
                  <span className="font-mono">
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Sales Tax</span>
                  <span className="font-mono text-zinc-300">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
                  <span>Estimated Total</span>
                  <span className="font-mono text-emerald-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-zinc-300 block">Payment Method</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-zinc-800 border-teal-500 text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-xs font-bold">Apple Pay</span>
                    <span className="text-[9px] text-zinc-500 font-mono">1-Click</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-zinc-800 border-teal-500 text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="text-[10px] text-zinc-300">Credit Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('shoppay')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'shoppay'
                        ? 'bg-zinc-800 border-teal-500 text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-xs font-bold text-purple-400">ShopPay</span>
                    <span className="text-[9px] text-zinc-500 font-mono">Instant</span>
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleExecuteCheckout}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 via-blue-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs lg:text-sm font-extrabold shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authorizing Payment & Reserving Drops...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${finalTotal.toFixed(2)} with {paymentMethod === 'apple_pay' ? 'Apple Pay' : paymentMethod === 'card' ? 'Credit Card' : 'ShopPay'}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-zinc-500 leading-tight">
                By completing checkout, you agree to StreamCart Live Terms of Service and flash drop merchant fulfillment guarantee.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
