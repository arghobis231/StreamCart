import React, { useState } from 'react';
import {
  ScreenId,
  ProductItem,
  ProductVariant,
  CartItem,
  LiveOrder,
} from '../../types';
import {
  X,
  ShoppingCart,
  Trash2,
  Lock,
  CreditCard,
  CheckCircle,
  Truck,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface CartAndCheckoutOverlayProps {
  cartItems: CartItem[];
  onUpdateCartQuantity: (index: number, quantity: number) => void;
  onRemoveCartItem: (index: number) => void;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  onPlaceOrder: (order: LiveOrder) => void;
}

export const CartAndCheckoutOverlay: React.FC<CartAndCheckoutOverlayProps> = ({
  cartItems,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onClose,
  onNavigate,
  onPlaceOrder,
}) => {
  const [customerName, setCustomerName] = useState('Marcus Dev');
  const [customerEmail, setCustomerEmail] = useState('marcus.dev@example.com');
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Suite 4B, Springfield, OR 97477');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [promoCode, setPromoCode] = useState('TECHLIVE25');
  const [isOrdered, setIsOrdered] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  const discount = promoCode.toUpperCase() === 'TECHLIVE25' ? subtotal * 0.25 : 0;
  const shipping = 0; // Free in live stream
  const total = Math.max(0, subtotal - discount + shipping);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `#LS-${Math.floor(90000 + Math.random() * 9999)}`;
    const newOrder: LiveOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName,
      productTitle: cartItems[0]?.product.title || 'Livestream Drop Item',
      variant: cartItems[0]?.variant.name || 'Standard',
      amount: total,
      timestamp: 'Just now',
      status: 'Confirmed',
    };
    setPlacedOrderNumber(orderNum);
    onPlaceOrder(newOrder);
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 font-mono text-zinc-900 select-none">
      <div className="bg-white border-2 border-zinc-900 rounded-md w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div className="p-3 border-b-2 border-zinc-900 bg-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-zinc-900" />
            <span className="font-bold text-xs uppercase tracking-wider">
              CART & QUICK IN-STREAM CHECKOUT (SCREEN 7)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-200 border border-zinc-300"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation State */}
        {isOrdered ? (
          <div className="p-8 text-center space-y-4 max-w-lg mx-auto my-auto">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-900 bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <WireframeBadge variant="success">ORDER CONFIRMED</WireframeBadge>
              <h2 className="text-xl font-black mt-2">Thank you for your purchase, {customerName}!</h2>
              <p className="text-xs text-zinc-600 mt-1">
                Your order <span className="font-bold font-mono">{placedOrderNumber}</span> for{' '}
                <span className="font-bold text-zinc-900">${total.toFixed(2)}</span> has been broadcast live to the Director Studio!
              </p>
            </div>

            <div className="p-3 bg-zinc-50 border border-zinc-300 rounded text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Delivery:</span>
                <span className="font-bold">2-Day Priority (Aug 16)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping Address:</span>
                <span className="font-medium truncate max-w-xs">{shippingAddress}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <WireframeButton
                variant="outline"
                size="md"
                onClick={() => {
                  onClose();
                  onNavigate('viewer');
                }}
              >
                Back to Livestream
              </WireframeButton>

              <WireframeButton
                variant="primary"
                size="md"
                onClick={() => {
                  onClose();
                  onNavigate('studio');
                }}
              >
                View Live in Director Studio (Hero)
              </WireframeButton>
            </div>
          </div>
        ) : (
          /* Two-Column Checkout Layout */
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 overflow-y-auto">
            {/* Left 6-Cols: Cart Items List & Floating Background PIP */}
            <div className="lg:col-span-6 space-y-4">
              <WireframeCard title="Cart Items" subtitle={`${cartItems.length} items queued for purchase`}>
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-500">
                    Your cart is empty. Feature or select products from the livestream catalogue.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-3 p-2.5 rounded border border-zinc-300 bg-zinc-50"
                      >
                        <WireframeBox label="[ X ]" className="w-12 h-12 rounded shrink-0" />

                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-zinc-900 truncate">
                            {item.product.title}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            Edition: {item.variant.name} • ${item.product.salePrice} each
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-zinc-400 rounded bg-white text-xs">
                              <button
                                onClick={() => onUpdateCartQuantity(idx, Math.max(1, item.quantity - 1))}
                                className="px-2 py-0.5 font-bold hover:bg-zinc-100"
                              >
                                -
                              </button>
                              <span className="px-2.5 py-0.5 font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateCartQuantity(idx, item.quantity + 1)}
                                className="px-2 py-0.5 font-bold hover:bg-zinc-100"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveCartItem(idx)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right font-bold text-xs text-zinc-900">
                          ${(item.product.salePrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </WireframeCard>

              {/* Order Cost Breakdown */}
              <div className="p-3 bg-zinc-100 border-2 border-zinc-700 rounded space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Live Promo ({promoCode}):</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Livestream Express Shipping:</span>
                  <span className="text-emerald-800 font-bold">FREE ($0.00)</span>
                </div>
                <div className="pt-2 border-t-2 border-zinc-800 flex justify-between font-black text-sm text-zinc-900">
                  <span>Total Due:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Floating Mini Video Reminder */}
              <div className="border border-zinc-400 rounded bg-zinc-900 text-white p-2 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>Livestream active in background</span>
                </div>
                <span className="text-zinc-400">Audio playing</span>
              </div>
            </div>

            {/* Right 6-Cols: Customer Information, Shipping Address & 1-Click Payment */}
            <div className="lg:col-span-6 space-y-4">
              <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
                <WireframeCard title="Customer & Shipping Information" subtitle="Fast checkout without leaving the live show">
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white border border-zinc-400 rounded px-2.5 py-1.5 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-white border border-zinc-400 rounded px-2.5 py-1.5 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Shipping Address</label>
                      <textarea
                        rows={2}
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full bg-white border border-zinc-400 rounded px-2.5 py-1.5 font-mono"
                      />
                    </div>
                  </div>
                </WireframeCard>

                {/* Payment Method Selector */}
                <WireframeCard title="Payment Method" subtitle="Encrypted 256-bit instant checkout">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 rounded border-2 text-center font-bold text-[11px] ${
                          paymentMethod === 'card'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-2 rounded border-2 text-center font-bold text-[11px] ${
                          paymentMethod === 'apple_pay'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        Apple Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 rounded border-2 text-center font-bold text-[11px] ${
                          paymentMethod === 'cod'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        COD
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div>
                        <label className="block font-bold mb-1">Card Details</label>
                        <div className="flex items-center gap-2 bg-white border border-zinc-400 rounded px-2.5 py-1.5">
                          <CreditCard className="w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full font-mono text-xs focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </WireframeCard>

                {/* Primary CTA */}
                <WireframeButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<Lock className="w-4 h-4" />}
                >
                  PLACE ORDER (${total.toFixed(2)})
                </WireframeButton>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
