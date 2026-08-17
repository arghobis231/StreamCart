import React, { useState } from 'react';
import {
  ScreenId,
  ProductItem,
  ProductVariant,
} from '../../types';
import {
  X,
  Star,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  ShoppingCart,
  Maximize2,
  Tv,
  ArrowRight,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface ProductSpotlightModalProps {
  product: ProductItem;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: ProductItem, variant: ProductVariant, quantity: number) => void;
  onBuyNow: (product: ProductItem, variant: ProductVariant, quantity: number) => void;
}

export const ProductSpotlightModal: React.FC<ProductSpotlightModalProps> = ({
  product,
  onClose,
  onNavigate,
  onAddToCart,
  onBuyNow,
}) => {
  const defaultVariant: ProductVariant = { id: 'default', name: 'Standard', colorHex: '#000000', inStock: true };
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product?.variants?.[0] || defaultVariant
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const highlights = product.highlights || [];
  const variants = product.variants || [];

  const handleAdd = () => {
    onAddToCart(product, selectedVariant || defaultVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedVariant || defaultVariant, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 font-mono text-zinc-900 select-none">
      <div className="bg-white border-2 border-zinc-900 rounded-md w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Top Bar */}
        <div className="p-3 border-b-2 border-zinc-900 bg-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-xs uppercase tracking-wider">
              IN-STREAM PRODUCT SPOTLIGHT (SCREEN 6)
            </span>
            <WireframeBadge variant="live">LIVE ON-AIR</WireframeBadge>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-zinc-200 border border-zinc-300 transition-colors"
              title="Close and Return to Stream"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-6 overflow-y-auto">
          {/* Left 5-Cols: Product Image Gallery & Floating PIP Livestream */}
          <div className="md:col-span-5 space-y-4">
            {/* Main Product Image Wireframe Placeholder */}
            <WireframeBox
              label="[ 4K PRODUCT MACRO SHOT ]"
              sublabel={`SKU: ${product.sku}`}
              className="h-56 md:h-64 rounded-md border-zinc-800 bg-zinc-100"
            />

            {/* Thumbnail selector wireframe strip */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <WireframeBox
                  key={i}
                  label={`[ Shot ${i} ]`}
                  className="h-14 rounded border-zinc-400 text-[9px]"
                />
              ))}
            </div>

            {/* Floating Picture-in-Picture Mini Livestream Window */}
            <div className="border-2 border-zinc-900 rounded-md bg-zinc-950 text-white p-2.5 space-y-2 shadow-md">
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 font-bold text-red-500">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>LIVE IN BACKGROUND</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-white underline text-[9px]"
                >
                  Return Fullscreen
                </button>
              </div>

              <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-400 relative">
                <span>[ PIP HOST CAM : Sarah Connor ]</span>
              </div>
            </div>
          </div>

          {/* Right 7-Cols: Product Details, Variant Selection, Stock & CTAs */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              {/* Category, Rating & SKU */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 uppercase font-bold">{product.category}</span>
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{product.rating} ({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Badge */}
              <div>
                <h2 className="text-lg md:text-xl font-black text-zinc-900 tracking-tight">
                  {product.title}
                </h2>
                {product.badge && (
                  <div className="mt-1">
                    <WireframeBadge variant="warning">{product.badge}</WireframeBadge>
                  </div>
                )}
              </div>

              {/* Pricing & Flash Discount Banner */}
              <div className="p-3 rounded border-2 border-zinc-900 bg-zinc-50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-500">Livestream Exclusive Price:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-zinc-900">${product.salePrice}</span>
                    <span className="text-sm text-zinc-500 line-through">${product.originalPrice}</span>
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded border border-red-300">
                      SAVE {product.discountPercentage}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-bold text-emerald-800">✓ Free 2-Day Shipping</div>
                  <div className="text-[10px] text-zinc-500">Only {product.stock} units in inventory</div>
                </div>
              </div>

              {/* Variant Selector (Colors / Editions) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-zinc-800">
                  Select Edition / Colorway:
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const isSel = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded border-2 text-xs font-bold flex items-center gap-2 transition-all ${
                          isSel
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                            : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span>{v.name}</span>
                        {isSel && <Check className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Highlights / Specifications */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-200">
                <div className="text-xs font-bold uppercase text-zinc-800">Product Highlights:</div>
                <ul className="text-xs space-y-1 text-zinc-700">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Controller & Action CTAs */}
            <div className="pt-4 border-t-2 border-zinc-900 space-y-3">
              <div className="flex items-center justify-between gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-zinc-700">Qty:</span>
                  <div className="flex items-center border-2 border-zinc-700 rounded bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-zinc-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-zinc-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500">Subtotal:</div>
                  <div className="text-base font-black text-zinc-900">
                    ${(product.salePrice * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <WireframeButton
                  variant="outline"
                  size="lg"
                  onClick={handleAdd}
                  icon={<ShoppingCart className="w-4 h-4" />}
                >
                  {addedToast ? '✓ Added to Cart!' : 'Add to Cart'}
                </WireframeButton>

                <WireframeButton
                  variant="primary"
                  size="lg"
                  onClick={handleBuy}
                  icon={<Zap className="w-4 h-4 fill-current text-amber-400" />}
                >
                  Instant 1-Click Buy Now
                </WireframeButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
