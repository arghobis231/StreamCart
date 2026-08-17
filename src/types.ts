export type AppMode = 'creator' | 'shopper';

export type ScreenId =
  // Creator Mode Screens
  | 'dashboard'
  | 'livestreams'
  | 'products'
  | 'studio'
  | 'orders'
  | 'audience'
  | 'analytics'
  | 'settings'
  | 'summary'
  // Shopper Mode Screens
  | 'home'
  | 'live-now'
  | 'discover'
  | 'shopper-products'
  | 'following'
  | 'wishlist'
  | 'my-orders'
  | 'cart'
  | 'profile'
  // Shared / Utility Screens
  | 'viewer'
  | 'spotlight'
  | 'checkout'
  | 'notifications'
  | 'schedule';

export type CameraId = 'cam1' | 'cam2' | 'cam3' | 'cam4';

export type SceneId = 'main' | 'demo' | 'macro' | 'interview' | 'ending';

export type LayoutMode = 'single' | 'pip' | 'split' | 'grid';

export type BroadcastStatus = 'LIVE' | 'PRE_SHOW' | 'PAUSED' | 'ENDED';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  inStock: boolean;
}

export interface ProductItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  stock: number;
  initialStock: number;
  soldCount: number;
  imageUrl?: string;
  secondaryImageUrl?: string;
  badge?: string;
  description: string;
  highlights: string[];
  variants: ProductVariant[];
  status: 'active_drop' | 'queued' | 'sold_out' | 'upcoming' | 'draft';
  isSelectedForStream?: boolean;
  cartCount?: number;
  dropDurationSeconds?: number;
  rating: number;
  reviewsCount: number;
}

export interface ChatMessage {
  id: string;
  user: string;
  avatar?: string;
  avatarText?: string;
  text: string;
  timestamp: string;
  isVip?: boolean;
  isModerator?: boolean;
  isHost?: boolean;
  badge?: string;
  intent?: 'question' | 'purchase' | 'hype' | 'spec' | 'discount';
  isPinned?: boolean;
}

export interface ViewerQuestion {
  id: string;
  user: string;
  question: string;
  timestamp: string;
  isAnswered: boolean;
  isPinned: boolean;
  isIgnored?: boolean;
  votes: number;
}

export interface LiveOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  productTitle: string;
  amount: number;
  timestamp: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Completed';
  variant?: string;
  paymentMethod?: string;
}

export interface ScheduledLivestream {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  productIds: string[];
  thumbnailPlaceholder?: string;
  chatEnabled: boolean;
  qaEnabled: boolean;
  recordStream: boolean;
  promoCode: string;
  discountValue: string;
  status: 'Upcoming' | 'Draft' | 'Completed' | 'Live';
}

export interface StreamStats {
  ccv: number;
  peakCcv: number;
  totalViews: number;
  gmv: number;
  totalOrders: number;
  cvr: number;
  aov: number;
  cartVelocity: number;
  likesCount: number;
  sharesCount: number;
  durationSeconds: number;
  bitrate: number;
  fps: number;
  streamHealth: 'EXCELLENT' | 'GOOD' | 'UNSTABLE';
}

export interface ActiveOverlays {
  showProductSpotlight: boolean;
  showFlashTimer: boolean;
  showLowerThird: boolean;
  showLiveChatBubble: boolean;
  showPurchaseToasts: boolean;
  showLivePoll: boolean;
  showStockAlert: boolean;
  showPrompterOverlay?: boolean;
  customPromoBannerText?: string;
  promoBannerText?: string;
}

export interface StudioNotification {
  id: string;
  type: 'order' | 'stock' | 'milestone' | 'follower' | 'question' | 'payout' | 'system' | 'stock_alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'stock' | 'milestone' | 'follower' | 'question' | 'payout' | 'system' | 'stock_alert';
  title: string;
  description: string;
  message?: string;
  timestamp: string;
  isUnread?: boolean;
  isRead?: boolean;
  category?: 'orders' | 'inventory' | 'audience' | 'system';
  actionLabel?: string;
  actionScreen?: ScreenId;
}

export interface CartItem {
  product: ProductItem;
  variant: ProductVariant;
  quantity: number;
}

export interface FlashDealState {
  isActive: boolean;
  product: ProductItem;
  secondsRemaining: number;
  discountBonusPercent: number;
  unitsCap: number;
  unitsClaimed: number;
  promoCode: string;
}

export interface LivePollOption {
  id: string;
  text: string;
  votes: number;
}

export interface LivePoll {
  id: string;
  question: string;
  options: LivePollOption[];
  totalVotes: number;
  isActive: boolean;
  timeRemaining: number;
}

export interface LivePurchaseAlert {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  productTitle: string;
  productPrice: number;
  timestamp: string;
  variantSelected: string;
}

export interface AIPrompterResult {
  headline: string;
  bulletPoints: string[];
  cta: string;
  urgencyCue: string;
}

export interface AIChatTriageResult {
  summary: string;
  sentiment: 'Hype' | 'Neutral' | 'Inquiry' | 'Concern';
  suggestedAction: string;
}

export interface AIStrategyResult {
  timingScore: number;
  recommendation: string;
}

export type BannerType =
  | 'countdown'
  | 'limited_offer'
  | 'stock_alert'
  | 'bogo_promo'
  | 'announcement'
  | 'custom';

export type BannerTheme =
  | 'fire'
  | 'purple'
  | 'emerald'
  | 'amber'
  | 'cyber'
  | 'midnight'
  | 'sunset'
  | 'indigo';

export type BannerPositionPreset =
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'bottom_left'
  | 'bottom_center'
  | 'bottom_right'
  | 'custom';

export interface DynamicBannerItem {
  id: string;
  type: BannerType;
  title: string;
  subtitle?: string;
  badgeText?: string;
  promoCode?: string;
  discountPercent?: number;
  initialSeconds: number;
  secondsRemaining: number;
  isTimerRunning: boolean;
  theme: BannerTheme;
  animation: 'pulse' | 'bounce' | 'glow' | 'shine' | 'none';
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  scale: number; // 0.75 to 1.3
  isVisible: boolean;
  isPinned?: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: string;
  bio: string;
  followingCount?: number;
  wishlistCount?: number;
  ordersCount?: number;
  totalSaved?: number;
  rewardPoints?: number;
  tier?: string;
}

export interface FollowedCreator {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  isVerified: boolean;
  category: string;
  followersCount: string;
  isLive: boolean;
  liveChannelId?: string;
  currentStreamTitle?: string;
  viewersCount?: number;
  featuredProductName?: string;
  nextStreamSchedule?: string;
  isFollowed?: boolean;
  isFollowing?: boolean;
}

export interface WishlistItem {
  id: string;
  productId?: string;
  product: ProductItem;
  addedAt: string;
  notes?: string;
  priceDropAlert?: boolean;
  liveStreamAlert?: boolean;
  isLiveNow?: boolean;
  liveChannelId?: string;
  streamChannelId?: string;
  liveHostName?: string;
}

export interface ShopperOrderItem {
  id?: string;
  productId?: string;
  product?: ProductItem;
  title?: string;
  variant?: string;
  variantName?: string;
  imageUrl?: string;
  price?: number;
  quantity?: number;
  creatorName?: string;
  streamTitle?: string;
}

export interface ShopperOrder {
  id: string;
  orderNumber: string;
  placedAt?: string;
  orderDate?: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  creatorName?: string;
  creatorAvatar?: string;
  channelTitle?: string;
  channelId?: string;
  streamTitle?: string;
  totalAmount?: number;
  shippingAddress?: {
    fullName: string;
    street: string;
    cityStateZip: string;
    country: string;
  };
  items: ShopperOrderItem[];
  subtotal?: number;
  discountApplied?: number;
  promoCode?: string;
  shippingFee?: number;
  tax?: number;
  total?: number;
  paymentMethod: string;
}

