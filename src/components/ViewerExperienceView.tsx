import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Eye,
  Heart,
  Flame,
  ThumbsUp,
  ShoppingBag,
  Send,
  Sparkles,
  Tag,
  Check,
  CheckCircle2,
  Lock,
  CreditCard,
  ArrowRight,
  X,
  Star,
  ShieldCheck,
  Zap,
  Clock,
  ChevronLeft,
  ChevronRight,
  Share2,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  CheckCheck,
  HelpCircle,
  TrendingUp,
  Award,
  Layers,
  ShoppingBasket,
  Gift,
  Search,
  ExternalLink,
} from 'lucide-react';
import { ProductItem, ChatMessage, ScreenId, LiveOrder } from '../types';

interface ConsumerLiveChannel {
  id: string;
  name: string;
  hostName: string;
  hostAvatar: string;
  hostFollowers: string;
  isVerified: boolean;
  category: string;
  title: string;
  viewers: number;
  promoCode: string;
  discountPercent: number;
  discountLabel: string;
  badge: string;
  videoUrl: string;
  products: ProductItem[];
  chatHistory: { user: string; text: string; time: string; isHost?: boolean; isBuyer?: boolean; badge?: string }[];
  pollQuestion: string;
  pollOptions: { text: string; votes: number }[];
}

interface ViewerExperienceViewProps {
  products?: ProductItem[];
  activeFeaturedProductId?: string;
  chatMessages?: ChatMessage[];
  initialChannelId?: string;
  onSendMessage?: (text: string) => void;
  onPlaceOrder?: (order: LiveOrder) => void;
  onNavigate: (screen: ScreenId) => void;
  onSimulateLike?: () => void;
  onAddToCart?: (product: ProductItem) => void;
  onQuickAddToCart?: (product: ProductItem) => void;
}

export const ViewerExperienceView: React.FC<ViewerExperienceViewProps> = ({
  products: platformProducts = [],
  activeFeaturedProductId = 'prod-1',
  chatMessages: globalChatMessages = [],
  initialChannelId,
  onSendMessage,
  onPlaceOrder,
  onNavigate,
  onSimulateLike,
  onAddToCart,
  onQuickAddToCart,
}) => {
  // 5 Active Consumer Live Streams
  const liveChannels: ConsumerLiveChannel[] = [
    {
      id: 'channel-tech',
      name: 'CyberTech Arena',
      hostName: 'Alex Vance',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      hostFollowers: '142K',
      isVerified: true,
      category: 'Electronics & Audio',
      title: 'Tech Friday: Unboxing 4K Drones & Pro Studio ANC Gear',
      viewers: 2840,
      promoCode: 'TECHLIVE25',
      discountPercent: 25,
      discountLabel: '25% OFF EXCLUSIVE',
      badge: '⚡ FLASH DROP LIVE',
      videoUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80',
      products: platformProducts,
      chatHistory: [
        { user: 'Alex Vance', text: '🔥 Welcome everyone! Code TECHLIVE25 is active for 25% off all drops!', time: '1m ago', isHost: true },
        { user: 'TechJunkie99', text: 'How is the battery life on the Titanium ANC headphones?', time: '45s ago' },
        { user: 'Sarah_K', text: 'Just ordered the Space Titanium variant! Can’t wait 🎉', time: '30s ago', isBuyer: true, badge: 'BUYER' },
        { user: 'Marcus_Dev', text: 'Is the 22ms low latency dongle included in the box?', time: '12s ago' },
      ],
      pollQuestion: 'Which drop should we discount 40% next?',
      pollOptions: [
        { text: 'Aura Titanium Headphones', votes: 1420 },
        { text: 'Orbit Gasket Keyboard', votes: 980 },
        { text: 'Phantom 4K Drone', votes: 1650 },
      ],
    },
    {
      id: 'channel-beauty',
      name: 'Glow & Radiance Lab',
      hostName: 'Dr. Chloe Rivera',
      hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      hostFollowers: '380K',
      isVerified: true,
      category: 'Beauty & Skincare',
      title: 'Glass Skin Routine: Triple Peptide Glow Serum & Sonic Sculptor',
      viewers: 4920,
      promoCode: 'GLOW35',
      discountPercent: 35,
      discountLabel: '35% OFF DERM BUNDLE',
      badge: '✨ BUY 1 GET 1 ESSENCE',
      videoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      products: [
        platformProducts.find((p) => p.id === 'prod-3') || platformProducts[0],
        {
          id: 'prod-beauty-2',
          sku: 'FACIAL-SCULPT-01',
          title: 'Rose Quartz Sonic Microcurrent Facial Sculptor',
          category: 'Beauty Tech',
          originalPrice: 120,
          salePrice: 64,
          discountPercentage: 46,
          stock: 25,
          initialStock: 80,
          soldCount: 55,
          imageUrl: 'https://images.unsplash.com/photo-1608248597359-2531dcf75647?w=800&auto=format&fit=crop&q=80',
          badge: '⚡ BESTSELLER',
          description: '6,000 vibrations/min with dual microcurrent lifting rollers for lymphatic drainage and jawline sculpting.',
          highlights: ['Dual Microcurrent Lifting Nodes', 'Natural Brazilian Rose Quartz', 'Waterproof IPX7 Design'],
          variants: [
            { id: 'vb1', name: 'Rose Quartz Gold', colorHex: '#F472B6', inStock: true },
            { id: 'vb2', name: 'Obsidian Black', colorHex: '#18181B', inStock: true },
          ],
          status: 'active_drop',
          rating: 4.95,
          reviewsCount: 840,
        },
        {
          id: 'prod-beauty-3',
          sku: 'HYDRA-MASK-03',
          title: 'Deep Ocean Peptide Barrier Overnight Sleeping Mask (80ml)',
          category: 'Skincare',
          originalPrice: 68,
          salePrice: 36,
          discountPercentage: 47,
          stock: 40,
          initialStock: 100,
          soldCount: 60,
          imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
          badge: 'DERM APPROVED',
          description: 'Ceramide-rich overnight recovery balm clinically proven to restore skin moisture barrier while you sleep.',
          highlights: ['5 Biomimetic Ceramides', 'Non-Comedogenic & Fragrance-Free', 'Wake up with glowing plumping effect'],
          variants: [{ id: 'vb3', name: '80ml Jar', colorHex: '#38BDF8', inStock: true }],
          status: 'upcoming',
          rating: 4.88,
          reviewsCount: 420,
        },
      ],
      chatHistory: [
        { user: 'Dr. Chloe Rivera', text: 'Welcome skin lovers! Ask anything about peptide layering ✨', time: '2m ago', isHost: true },
        { user: 'Emma_Glow', text: 'Can I use this serum with retinol at night?', time: '1m ago' },
        { user: 'Jessica_R', text: 'The glow renewal essence is literally magic! Repurchased!', time: '20s ago', isBuyer: true, badge: 'VIP' },
        { user: 'Hannah_92', text: 'Applying the code GLOW35 right now!', time: '5s ago' },
      ],
      pollQuestion: 'What is your primary skincare focus today?',
      pollOptions: [
        { text: 'Glass Skin Barrier Hydration', votes: 2410 },
        { text: 'Jawline Sculpting Microcurrent', votes: 1890 },
      ],
    },
    {
      id: 'channel-fashion',
      name: 'Luxe Runway & Streetwear',
      hostName: 'Maya Chen',
      hostAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      hostFollowers: '210K',
      isVerified: true,
      category: 'Fashion & Luxury',
      title: 'Limited Edition Runway Drop: Silk Bombers & Ceramic Chrono Watches',
      viewers: 3180,
      promoCode: 'LUXE20',
      discountPercent: 20,
      discountLabel: '20% OFF RUNWAY DROP',
      badge: '🔥 LIMITED 30 PCS',
      videoUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80',
      products: [
        platformProducts.find((p) => p.id === 'prod-2') || platformProducts[0],
        {
          id: 'prod-fash-2',
          sku: 'SILK-BOMBER-01',
          title: 'Heavyweight Oversized Japanese Silk-Blend Bomber Jacket',
          category: 'Streetwear Luxury',
          originalPrice: 320,
          salePrice: 189,
          discountPercentage: 40,
          stock: 14,
          initialStock: 45,
          soldCount: 31,
          imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
          badge: 'HANDCRAFTED',
          description: 'High-density matte silk outer shell with quilted thermal insulation and custom gunmetal hardware.',
          highlights: ['Japanese Silk Blend Fabric', 'Oversized Boxy Silhouette', 'Water-Repellent Nano Coating'],
          variants: [
            { id: 'vf1', name: 'Midnight Onyx (M)', colorHex: '#09090B', inStock: true },
            { id: 'vf2', name: 'Midnight Onyx (L)', colorHex: '#09090B', inStock: true },
            { id: 'vf3', name: 'Olive Drab (M)', colorHex: '#3F6212', inStock: true },
          ],
          status: 'active_drop',
          rating: 4.98,
          reviewsCount: 190,
        },
      ],
      chatHistory: [
        { user: 'Maya Chen', text: 'Hey fashion fam! Only 14 silk bombers left in this drop batch!', time: '1m ago', isHost: true },
        { user: 'Kev_Street', text: 'Does the bomber fit true to size or oversized?', time: '35s ago' },
        { user: 'Maya Chen', text: 'Definitely intentionally boxy oversized, size down for slim fit!', time: '20s ago', isHost: true },
        { user: 'David_L', text: 'Copped the Vanguard ceramic watch with code LUXE20! Incredible deal 🔥', time: '10s ago', isBuyer: true, badge: 'BUYER' },
      ],
      pollQuestion: 'Which colorway should we release next drop?',
      pollOptions: [
        { text: 'Vintage Sand Matte', votes: 1280 },
        { text: 'Cyber Chrome Silver', votes: 1540 },
      ],
    },
    {
      id: 'channel-coffee',
      name: 'Artisan Specialty Roastery',
      hostName: 'Chef Julian Morales',
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      hostFollowers: '95K',
      isVerified: true,
      category: 'Gourmet Culinary',
      title: 'Precision Pour-Over Masterclass: Ethiopian Geisha & Conical Grinders',
      viewers: 1740,
      promoCode: 'BREW20',
      discountPercent: 20,
      discountLabel: '20% OFF COFFEE GEAR',
      badge: '☕ TASTING PACK INCLUDED',
      videoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80',
      products: [
        {
          id: 'prod-coffee-1',
          sku: 'GRINDER-SMART-01',
          title: 'Precision 48mm Titanium Conical Burr Smart Coffee Grinder',
          category: 'Barista Gear',
          originalPrice: 240,
          salePrice: 168,
          discountPercentage: 30,
          stock: 18,
          initialStock: 50,
          soldCount: 32,
          imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
          badge: 'BARISTA CHOICE',
          description: 'Zero-retention single-dose grinder with 60 micro-stepped grind settings from espresso to French press.',
          highlights: ['48mm DLC Titanium Conical Burrs', 'Zero-Retention Bellows System', 'Ultra-Quiet Brushless DC Motor'],
          variants: [
            { id: 'vc1', name: 'Matte Cast Black', colorHex: '#18181B', inStock: true },
            { id: 'vc2', name: 'Brushed Silver', colorHex: '#E2E8F0', inStock: true },
          ],
          status: 'active_drop',
          rating: 4.92,
          reviewsCount: 310,
        },
        {
          id: 'prod-coffee-2',
          sku: 'KETTLE-GOOSE-02',
          title: 'Smart Variable Temperature Gooseneck Precision Kettle (0.9L)',
          category: 'Barista Gear',
          originalPrice: 130,
          salePrice: 89,
          discountPercentage: 31,
          stock: 22,
          initialStock: 60,
          soldCount: 38,
          imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
          badge: '⚡ FLASH DROP',
          description: 'PID controller with 1-degree precision temperature hold, built-in brew stopwatch, and ergonomic balanced handle.',
          highlights: ['1200W Rapid Boil Element', 'PID 1°F Temperature Accuracy', '60-Minute Keep Warm Mode'],
          variants: [{ id: 'vc3', name: 'Onyx Matte', colorHex: '#09090B', inStock: true }],
          status: 'upcoming',
          rating: 4.89,
          reviewsCount: 220,
        },
      ],
      chatHistory: [
        { user: 'Chef Julian', text: 'Welcome coffee lovers! Showing the single-dose 48mm grinder right now ☕', time: '1m ago', isHost: true },
        { user: 'BrewMaster_Tom', text: 'Can this grind fine enough for standard 9-bar espresso?', time: '40s ago' },
        { user: 'Chef Julian', text: 'Yes! Step 1 to 15 is dialed in for 18g espresso in 28 seconds.', time: '20s ago', isHost: true },
        { user: 'Elena_B', text: 'Just bought the matte black grinder! Huge upgrade for my morning brew 🎉', time: '5s ago', isBuyer: true, badge: 'BUYER' },
      ],
      pollQuestion: 'What brew method do you make daily?',
      pollOptions: [
        { text: 'Pour Over (V60 / Chemex)', votes: 940 },
        { text: 'Espresso & Lattes', votes: 820 },
      ],
    },
    {
      id: 'channel-gaming',
      name: 'Pro Gamer Battlestation',
      hostName: 'Marcus "Rogue" Drake',
      hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      hostFollowers: '520K',
      isVerified: true,
      category: 'Gaming & Battlestation',
      title: 'Ultimate 8000Hz Battlestation: Gasket Keyboards & Ultralight Mice',
      viewers: 5410,
      promoCode: 'ROGUE15',
      discountPercent: 15,
      discountLabel: '15% OFF GAMER BUNDLE',
      badge: '🎮 FREE KEYCAPS PACK',
      videoUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
      products: [
        platformProducts.find((p) => p.id === 'prod-4') || platformProducts[0],
        platformProducts.find((p) => p.id === 'prod-1') || platformProducts[0],
        {
          id: 'prod-game-3',
          sku: 'MOUSE-CARBON-03',
          title: 'Valkyrie 8KHz Ultralight Carbon Fiber Wireless Gaming Mouse',
          category: 'Gaming Tech',
          originalPrice: 129,
          salePrice: 79,
          discountPercentage: 38,
          stock: 30,
          initialStock: 90,
          soldCount: 60,
          imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
          badge: '⚡ ESPORTS GRADE',
          description: '39g ultra-lightweight magnesium/carbon chassis with 8000Hz polling rate and Nordic 52840 MCU.',
          highlights: ['39g Ultra-Lightweight Construction', 'True 8000Hz HyperPolling', 'PAW3395 26,000 DPI Optical Sensor'],
          variants: [
            { id: 'vg1', name: 'Raw Carbon Fiber', colorHex: '#18181B', inStock: true },
            { id: 'vg2', name: 'Cyber White', colorHex: '#F4F4F5', inStock: true },
          ],
          status: 'active_drop',
          rating: 4.96,
          reviewsCount: 680,
        },
      ],
      chatHistory: [
        { user: 'Marcus Rogue', text: 'Yo gamers! Testing the 8K polling rate live on stream right now!', time: '1m ago', isHost: true },
        { user: 'Pixel_Hunter', text: 'Does the Orbit 75% support hot-swap 5-pin switches?', time: '30s ago' },
        { user: 'Marcus Rogue', text: '100% hot-swappable with Gateron, Cherry, and Kailh switches!', time: '15s ago', isHost: true },
        { user: 'Neo_Apex', text: 'Ordered the keyboard + mouse bundle! Code ROGUE15 saved me $30 🔥', time: '8s ago', isBuyer: true, badge: 'BUYER' },
      ],
      pollQuestion: 'Which switch type do you prefer for gaming?',
      pollOptions: [
        { text: 'Linear Smooth (Speed Silver / Red)', votes: 2940 },
        { text: 'Tactile Thocky (Holy Panda / Brown)', votes: 2470 },
      ],
    },
  ];

  // Active Stream Selection State
  const [selectedChannelId, setSelectedChannelId] = useState<string>(initialChannelId || 'channel-tech');

  useEffect(() => {
    if (initialChannelId) {
      setSelectedChannelId(initialChannelId);
    }
  }, [initialChannelId]);

  const activeChannel = liveChannels.find((c) => c.id === selectedChannelId) || liveChannels[0];

  // Active View Tab: 'stream' (Live interactive) vs 'showcase' (Catalogue of items)
  const [viewTab, setViewTab] = useState<'stream' | 'showcase'>('stream');

  // Consumer Chat & Interaction State
  const [chatInput, setChatInput] = useState('');
  const [localChat, setLocalChat] = useState(activeChannel.chatHistory);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPollVote, setSelectedPollVote] = useState<number | null>(null);
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const [purchaseToasts, setPurchaseToasts] = useState<{ id: number; text: string }[]>([]);

  // Shopping Bag / Cart State
  const [cart, setCart] = useState<{ product: ProductItem; variant: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Instant Checkout Modal State
  const [checkoutProduct, setCheckoutProduct] = useState<ProductItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('Standard');
  const [quantity, setQuantity] = useState(1);
  const [appliedPromo, setAppliedPromo] = useState(activeChannel.promoCode);
  const [promoDiscount, setPromoDiscount] = useState(activeChannel.discountPercent / 100);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<LiveOrder | null>(null);

  // Customer Shipping & Payment Info
  const [customerName, setCustomerName] = useState('Alex Rivera');
  const [customerEmail, setCustomerEmail] = useState('alex.rivera@example.com');
  const [shippingAddress, setShippingAddress] = useState('1044 Broadway Ave, Apt 4B, New York, NY 10003');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card' | 'google_pay'>('apple_pay');

  // Active Featured Product within Current Channel
  const currentFeaturedProduct =
    activeChannel.products.find((p) => p.id === activeFeaturedProductId) || activeChannel.products[0];

  // Sync channel change
  useEffect(() => {
    setLocalChat(activeChannel.chatHistory);
    setAppliedPromo(activeChannel.promoCode);
    setPromoDiscount(activeChannel.discountPercent / 100);
    setSelectedPollVote(null);
  }, [selectedChannelId]);

  // Periodic simulated live purchase toasts
  useEffect(() => {
    const names = ['Sophia L.', 'Marcus D.', 'Elena R.', 'Liam K.', 'David P.', 'Chloe M.', 'Noah T.'];
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomProd = activeChannel.products[Math.floor(Math.random() * activeChannel.products.length)];
      const id = Date.now();
      const toastText = `🎉 ${randomName} just purchased ${randomProd.title.split(' ')[0]} ${randomProd.title.split(' ')[1]}!`;
      setPurchaseToasts((prev) => [...prev.slice(-3), { id, text: toastText }]);
      setTimeout(() => {
        setPurchaseToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, [activeChannel]);

  // Handle Chat Dispatch
  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      user: customerName || 'You (Shopper)',
      text: chatInput.trim(),
      time: 'Just now',
      badge: 'YOU',
    };
    setLocalChat((prev) => [...prev, newMsg]);
    onSendMessage(chatInput.trim());
    setChatInput('');
  };

  // Trigger Reaction Emojis
  const triggerReaction = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = 15 + Math.random() * 70;
    setFloatingReactions((prev) => [...prev.slice(-15), { id, emoji, left }]);
    onSimulateLike();
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2200);
  };

  // Open Direct Checkout Modal
  const handleOpenCheckout = (product: ProductItem) => {
    setCheckoutProduct(product);
    setSelectedVariant(product.variants?.[0]?.name || 'Standard');
    setQuantity(1);
    setAppliedPromo(activeChannel.promoCode);
    setPromoDiscount(activeChannel.discountPercent / 100);
    setPromoError('');
    setOrderComplete(null);
  };

  // Add Item to Shopping Bag
  const handleAddToCart = (product: ProductItem) => {
    const variant = product.variants?.[0]?.name || 'Standard';
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.variant === variant);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    triggerReaction('🛍️');
  };

  // Apply Coupon
  const handleApplyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === activeChannel.promoCode.toUpperCase()) {
      setAppliedPromo(activeChannel.promoCode);
      setPromoDiscount(activeChannel.discountPercent / 100);
      setPromoError('');
    } else if (normalized === 'STREAM20') {
      setAppliedPromo('STREAM20');
      setPromoDiscount(0.20);
      setPromoError('');
    } else if (normalized === 'VIP50') {
      setAppliedPromo('VIP50');
      setPromoDiscount(0.50);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code for this stream');
    }
  };

  // Complete Order
  const handleCompletePurchase = () => {
    if (!checkoutProduct) return;
    setIsProcessing(true);

    setTimeout(() => {
      const unitPrice = checkoutProduct.salePrice * (1 - promoDiscount);
      const totalAmount = unitPrice * quantity;
      const orderNumber = `#SC-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: LiveOrder = {
        id: `ord-${Date.now()}`,
        orderNumber,
        productTitle: `${checkoutProduct.title} (${selectedVariant})`,
        customerName: customerName || 'Alex Rivera',
        amount: totalAmount,
        timestamp: 'Just now',
        status: 'Completed',
        variant: selectedVariant,
        paymentMethod:
          paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : paymentMethod === 'google_pay'
            ? 'Google Pay'
            : 'Visa •••• 4242',
      };

      onPlaceOrder(newOrder);
      setIsProcessing(false);
      setOrderComplete(newOrder);

      // Add positive chat confirmation
      setLocalChat((prev) => [
        ...prev,
        {
          user: customerName || 'Alex Rivera',
          text: `🎉 Just secured ${quantity}x ${checkoutProduct.title.split(' ')[0]} via 1-Click Buy!`,
          time: 'Just now',
          isBuyer: true,
          badge: 'VERIFIED BUYER',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-zinc-900 dark:text-white select-none overflow-hidden h-full">
      {/* 1. Top Channel Discovery & Live Stream Switcher Rail */}
      <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 flex items-center justify-between gap-3 shrink-0 overflow-x-auto z-20">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
            title="Browse all live streams and upcoming drops"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Discover Streams</span>
          </button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 dark:bg-red-600/20 dark:text-red-400 border border-red-300 dark:border-red-500/30 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>5 Live</span>
          </div>
        </div>

        {/* Channels Carousel Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {liveChannels.map((channel) => {
            const isSelected = channel.id === selectedChannelId;
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                    : 'bg-white dark:bg-zinc-800/80 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-700/80 dark:hover:text-white border border-zinc-300 dark:border-zinc-700/50'
                }`}
              >
                <img
                  src={channel.hostAvatar}
                  alt={channel.hostName}
                  className="w-5 h-5 rounded-full object-cover border border-zinc-300 dark:border-white/20"
                />
                <span>{channel.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-black/30 text-white'
                      : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                  }`}
                >
                  {channel.viewers.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Live Stage vs Full Showcase */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-zinc-200 dark:bg-zinc-950 p-0.5 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <button
              onClick={() => setViewTab('stream')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'stream'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Live Stage</span>
            </button>
            <button
              onClick={() => setViewTab('showcase')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'showcase'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Showcase ({activeChannel.products.length})</span>
            </button>
          </div>

          {/* Shopping Bag Button with Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl bg-white hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
            title="View Shopping Bag"
          >
            <ShoppingBasket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[10px] font-black flex items-center justify-center animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Live Stream & Interactive Hub */}
      {viewTab === 'stream' ? (
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative overflow-hidden">
          {/* LEFT: Video Viewport Stage */}
          <div className="flex-1 flex flex-col relative bg-black min-h-0 overflow-hidden preserve-dark" data-theme-preserve="dark">
            {/* Top Stream Header HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
              {/* Host Profile Info */}
              <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md p-1.5 pr-4 rounded-full border border-white/10 shadow-xl">
                <img
                  src={activeChannel.hostAvatar}
                  alt={activeChannel.hostName}
                  className="w-9 h-9 rounded-full object-cover border border-indigo-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-white tracking-tight">{activeChannel.hostName}</h3>
                    {activeChannel.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-300">{activeChannel.hostFollowers} Followers • {activeChannel.category}</p>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isFollowing
                      ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/40'
                  }`}
                >
                  {isFollowing ? 'Following' : '+ Follow'}
                </button>
              </div>

              {/* Viewers & Audio Controls */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-zinc-200 flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeChannel.viewers.toLocaleString()} Watching</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
              </div>
            </div>

            {/* Video Canvas Backdrop */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <img
                src={activeChannel.videoUrl}
                alt="Live Broadcast"
                className="w-full h-full object-cover opacity-90 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60 pointer-events-none" />

              {/* Live Ticker Promo Pill */}
              <div className="absolute top-18 left-4 z-10 flex items-center gap-2 bg-gradient-to-r from-amber-500/90 to-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-300/40 text-xs font-extrabold text-white shadow-2xl animate-pulse">
                <Gift className="w-4 h-4 text-amber-200" />
                <span>STREAM CODE: {activeChannel.promoCode} ({activeChannel.discountLabel})</span>
              </div>

              {/* Real-time Purchase Toasts */}
              <div className="absolute top-32 left-4 z-20 space-y-2 pointer-events-none">
                {purchaseToasts.map((toast) => (
                  <div
                    key={toast.id}
                    className="bg-emerald-950/90 border border-emerald-500/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-200 shadow-xl flex items-center gap-2 animate-bounce"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{toast.text}</span>
                  </div>
                ))}
              </div>

              {/* Floating Emoji Reactions Canvas */}
              {floatingReactions.map((r) => (
                <div
                  key={r.id}
                  style={{ left: `${r.left}%`, bottom: '120px' }}
                  className="absolute pointer-events-none text-3xl animate-float-up z-30 select-none drop-shadow-lg"
                >
                  {r.emoji}
                </div>
              ))}

              {/* Interactive Live Poll Card Overlay (if active) */}
              <div
                className="absolute top-20 right-4 z-20 w-72 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 shadow-2xl hidden md:block preserve-dark"
                data-theme-preserve="dark"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Live Audience Poll</span>
                  </div>
                  <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded font-bold border border-indigo-400/30">
                    VOTE NOW
                  </span>
                </div>
                <p className="text-xs font-bold text-white mb-2.5">{activeChannel.pollQuestion}</p>
                <div className="space-y-1.5">
                  {activeChannel.pollOptions.map((opt, idx) => {
                    const totalVotes = activeChannel.pollOptions.reduce((s, o) => s + o.votes, 0) + (selectedPollVote !== null ? 1 : 0);
                    const currentVotes = opt.votes + (selectedPollVote === idx ? 1 : 0);
                    const pct = Math.round((currentVotes / totalVotes) * 100);
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPollVote(idx)}
                        className={`w-full relative overflow-hidden text-left p-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                          selectedPollVote === idx
                            ? 'border-indigo-500 bg-indigo-950/80 text-white'
                            : 'border-white/15 bg-white/10 hover:bg-white/20 text-zinc-100'
                        }`}
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-indigo-600/40 rounded-xl transition-all duration-500 pointer-events-none"
                          style={{ width: `${pct}%` }}
                        />
                        <div className="relative flex items-center justify-between z-10">
                          <span className="font-semibold text-xs truncate max-w-[160px] text-white">{opt.text}</span>
                          <span className="font-bold text-[11px] text-indigo-300">{pct}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM FLOATING FEATURED PRODUCT DROP CARD */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
                <div
                  className="bg-zinc-950/95 border border-zinc-700/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto ring-1 ring-white/15 preserve-dark"
                  data-theme-preserve="dark"
                >
                  {/* Product Info & Image */}
                  <div className="flex items-center gap-3.5 w-full md:w-auto">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-700">
                      <img
                        src={currentFeaturedProduct.imageUrl}
                        alt={currentFeaturedProduct.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 text-[9px] font-black bg-red-600 text-white px-1 py-0.2 rounded">
                        #{currentFeaturedProduct.id.replace('prod-', '')}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {activeChannel.badge}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{currentFeaturedProduct.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight truncate max-w-xs md:max-w-md mt-0.5">
                        {currentFeaturedProduct.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-black text-white">
                          ${(currentFeaturedProduct.salePrice * (1 - activeChannel.discountPercent / 100)).toFixed(2)}
                        </span>
                        <span className="text-xs text-zinc-400 line-through">
                          ${currentFeaturedProduct.originalPrice}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                          SAVE ${(currentFeaturedProduct.originalPrice - currentFeaturedProduct.salePrice * (1 - activeChannel.discountPercent / 100)).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: 1-Click Instant Buy & Add to Bag */}
                  <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => handleAddToCart(currentFeaturedProduct)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-zinc-300" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => handleOpenCheckout(currentFeaturedProduct)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-indigo-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/40 border border-white/20 transition-all transform hover:scale-[1.02] cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>⚡ 1-Click Instant Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Real-time Live Chat, Reactions & Questions Hub */}
          <div className="w-full lg:w-96 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 h-80 lg:h-auto">
            {/* Chat Header */}
            <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Live Stream Chat & Q&A</h4>
              </div>
              <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-semibold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                Real-Time
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
              {localChat.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl text-xs transition-all ${
                    msg.isHost
                      ? 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-950/80 dark:to-purple-950/80 border border-indigo-200 dark:border-indigo-500/30'
                      : msg.isBuyer
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-bold ${
                          msg.isHost
                            ? 'text-indigo-700 dark:text-indigo-300'
                            : msg.isBuyer
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-zinc-900 dark:text-zinc-200'
                        }`}
                      >
                        {msg.user}
                      </span>
                      {msg.isHost && (
                        <span className="text-[9px] font-black bg-indigo-600 text-white px-1.5 py-0.2 rounded">
                          HOST
                        </span>
                      )}
                      {msg.badge && !msg.isHost && (
                        <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                          {msg.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{msg.time}</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Quick Hype / Question Tap Chips */}
            <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { label: '🔥 HYPE', text: '🔥🔥 This drop is insane!' },
                { label: '📦 Shipping?', text: 'Is next-day express shipping available?' },
                { label: '🎉 Bought one!', text: 'Just secured mine with the live code!' },
                { label: '✨ Warranty?', text: 'Does this come with the 2-year warranty?' },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChatInput(chip.text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-[11px] font-semibold shrink-0 transition-colors border border-zinc-300 dark:border-zinc-700/50 cursor-pointer shadow-sm"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Floating Reactions Bar & Chat Input */}
            <div className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              {/* Emoji Reaction Burst Bar */}
              <div className="flex items-center justify-between gap-1 pb-1">
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">React:</span>
                <div className="flex items-center gap-1.5">
                  {['❤️', '🔥', '👏', '💎', '🚀'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => triggerReaction(emoji)}
                      className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-base transition-transform active:scale-125 cursor-pointer shadow-sm"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSendChat} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question or comment live..."
                  className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-sm"
                  title="Send Message"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* 3. SHOWCASE CATALOGUE TAB (Browse & Buy all products in this stream) */
        <div className="flex-1 p-6 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 space-y-6 text-zinc-900 dark:text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                  LIVE CATALOGUE
                </span>
                <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">{activeChannel.title}</h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Browse and buy items featured in this stream with active promo code <strong className="text-amber-600 dark:text-amber-400">{activeChannel.promoCode}</strong>.
              </p>
            </div>

            <button
              onClick={() => setViewTab('stream')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer self-start md:self-auto shadow-md shadow-indigo-600/20"
            >
              <Radio className="w-3.5 h-3.5 text-white" />
              <span>Return to Live Stage</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChannel.products.map((prod) => {
              const discountedPrice = prod.salePrice * (1 - activeChannel.discountPercent / 100);
              return (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-md shadow-md">
                          {prod.discountPercentage}% OFF
                        </span>
                        {prod.badge && (
                          <span className="text-[10px] font-bold bg-black/70 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-md border border-white/10">
                            {prod.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-amber-400 flex items-center gap-1 border border-white/10">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{prod.category}</span>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5 leading-snug line-clamp-2">
                          {prod.title}
                        </h4>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{prod.description}</p>

                      {/* Stock Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                          <span>Stock Availability</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{prod.stock} units remaining</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, (prod.stock / (prod.initialStock || 50)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Buy CTAs */}
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-base font-black text-zinc-900 dark:text-white">${discountedPrice.toFixed(2)}</div>
                      <div className="text-xs text-zinc-400 line-through">${prod.originalPrice}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 hover:text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenCheckout(prod)}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span>Instant Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SHOPPING BAG / CART SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 h-full flex flex-col justify-between p-6 shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBasket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Your Shopping Bag</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    {cart.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="py-4 space-y-3 max-h-[55vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Your bag is currently empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                    >
                      Browse Live Drops
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-black shrink-0 border border-zinc-300 dark:border-zinc-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.product.title}</h5>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Variant: {item.variant}</p>
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          ${(item.product.salePrice * (1 - promoDiscount)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Qty: {item.quantity}</span>
                        <button
                          onClick={() => setCart((prev) => prev.filter((_, i) => i !== idx))}
                          className="p-1 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                  <span>Stream Discount ({activeChannel.promoCode})</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">-{activeChannel.discountPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-zinc-900 dark:text-white">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cart
                      .reduce((sum, i) => sum + i.product.salePrice * (1 - promoDiscount) * i.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    handleOpenCheckout(cart[0].product);
                  }}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Proceed to Fast Checkout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. 1-CLICK INSTANT CHECKOUT & ORDER CONFIRMATION MODAL */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl overflow-hidden shadow-2xl text-zinc-900 dark:text-white">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">1-Click Live Stream Instant Buy</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Encrypted 256-bit secure consumer checkout</p>
                </div>
              </div>

              <button
                onClick={() => setCheckoutProduct(null)}
                className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {orderComplete ? (
              /* Order Complete Celebratory View */
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Payment Successful & Confirmed
                  </span>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mt-2">Thank you for your purchase!</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                    Your order <strong className="text-zinc-900 dark:text-white">{orderComplete.orderNumber}</strong> has been placed and transmitted to the merchant fulfillment hub.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left space-y-2.5 max-w-md mx-auto">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">Item:</span>
                    <span className="font-bold text-zinc-900 dark:text-white truncate max-w-[200px]">{orderComplete.productTitle}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">Total Paid:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">${orderComplete.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">Payment:</span>
                    <span className="text-zinc-800 dark:text-zinc-300 font-medium">{orderComplete.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">Estimated Delivery:</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">2 - 3 Business Days</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCheckoutProduct(null);
                      setOrderComplete(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    Continue Watching Stream
                  </button>
                  <button
                    onClick={() => {
                      setCheckoutProduct(null);
                      onNavigate('orders');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-xs font-bold border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
                  >
                    View All Orders
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Checkout Form */
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Product Summary Row */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={checkoutProduct.imageUrl}
                    alt={checkoutProduct.title}
                    className="w-16 h-16 rounded-xl object-cover bg-black shrink-0 border border-zinc-300 dark:border-zinc-700"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {checkoutProduct.category}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{checkoutProduct.title}</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-black text-zinc-900 dark:text-white">
                        ${(checkoutProduct.salePrice * (1 - promoDiscount)).toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-400 line-through">
                        ${checkoutProduct.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        ({Math.round(promoDiscount * 100)}% Stream Discount Applied)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Variant & Quantity Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Variant Swatches */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Select Variant:</label>
                    <div className="flex flex-wrap gap-2">
                      {checkoutProduct.variants?.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            selectedVariant === v.name
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/30"
                            style={{ backgroundColor: v.colorHex }}
                          />
                          <span>{v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Quantity:</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white flex items-center justify-center font-bold border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-black text-zinc-900 dark:text-white w-6 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white flex items-center justify-center font-bold border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Stream Promo Code:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={appliedPromo}
                      onChange={(e) => setAppliedPromo(e.target.value)}
                      placeholder="e.g. TECHLIVE25"
                      className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-900 dark:text-white uppercase font-bold focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyPromoCode(appliedPromo)}
                      className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white text-xs font-bold border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError ? (
                    <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{promoError}</p>
                  ) : (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" />
                      <span>{Math.round(promoDiscount * 100)}% Live Stream Promo Active</span>
                    </p>
                  )}
                </div>

                {/* Consumer Shipping Information */}
                <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Fast Shipping Destination:</label>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      FREE EXPRESS SHIPPING
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Full Name"
                      className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Email Address"
                      className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street Address, City, State, ZIP"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* 1-Tap Payment Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">Select Instant Payment Method:</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'apple_pay', label: 'Apple Pay', sub: 'Instant Biometrics' },
                      { id: 'google_pay', label: 'Google Pay', sub: '1-Tap GPay' },
                      { id: 'card', label: 'Credit Card', sub: '•••• 4242' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          paymentMethod === pm.id
                            ? 'bg-zinc-100 dark:bg-zinc-950 border-indigo-500 ring-2 ring-indigo-500/30'
                            : 'bg-white dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-extrabold text-zinc-900 dark:text-white">{pm.label}</div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{pm.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing Calculation Summary */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>Item Price ({quantity}x)</span>
                    <span className="text-zinc-900 dark:text-white font-semibold">${(checkoutProduct.salePrice * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>Live Stream Discount ({appliedPromo})</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      -${(checkoutProduct.salePrice * promoDiscount * quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>Shipping & Handling</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm font-black text-zinc-900 dark:text-white">
                    <span>Total Amount:</span>
                    <span className="text-lg text-emerald-600 dark:text-emerald-400">
                      ${(checkoutProduct.salePrice * (1 - promoDiscount) * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Complete Order Button */}
                <button
                  type="button"
                  onClick={handleCompletePurchase}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-indigo-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-xl shadow-indigo-600/30 border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-white">Authorizing Secure Instant Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-white" />
                      <span className="text-white">
                        Authorize & Place Live Order ($
                        {(checkoutProduct.salePrice * (1 - promoDiscount) * quantity).toFixed(2)})
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
