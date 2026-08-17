import React, { useState } from 'react';
import {
  X,
  Star,
  Zap,
  ShoppingBag,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  Share2,
} from 'lucide-react';
import { ProductItem } from '../types';

interface ProductSpotlightModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onInstantBuy: (product: ProductItem) => void;
}

export const ProductSpotlightModal: React.FC<ProductSpotlightModalProps> = ({
  product,
  onClose,
  onInstantBuy,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.variants?.[0]?.name || 'Standard');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black bg-indigo-600 text-white shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Truck className="w-3.5 h-3.5" /> Free Express Shipping
              </span>
              <span>In Stock: {product.stock} units</span>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {product.category}
              </span>
              <h3 className="text-lg font-black text-white leading-snug mt-0.5">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold ml-1">{product.rating}</span>
                </div>
                <span className="text-zinc-500 text-xs">• {product.reviewsCount} stream reviews</span>
                <span className="text-zinc-500 text-xs">• {product.soldCount} purchased</span>
              </div>
            </div>

            {/* Price block */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-400 font-mono">${product.salePrice}</span>
                <span className="text-xs text-zinc-500 line-through ml-2">${product.originalPrice}</span>
              </div>
              <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1 rounded-full">
                Save {product.discountPercentage}% Live
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Highlights */}
            {product.highlights && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Product Features
                </span>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-800 flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onInstantBuy(product);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-extrabold shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now (${product.salePrice})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
