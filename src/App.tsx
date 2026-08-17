import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  AppMode,
  ProductItem,
  ProductVariant,
  ChatMessage,
  ViewerQuestion,
  LiveOrder,
  ScheduledLivestream,
  StudioNotification,
  StreamStats,
  BroadcastStatus,
  UserProfile,
  FollowedCreator,
  WishlistItem,
  ShopperOrder,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_SCHEDULED_STREAMS,
  INITIAL_ORDERS,
  INITIAL_QUESTIONS,
  INITIAL_CHAT,
  INITIAL_NOTIFICATIONS,
  INITIAL_STATS,
} from './data/mockData';
import {
  INITIAL_FOLLOWED_CREATORS,
  INITIAL_WISHLIST,
  INITIAL_SHOPPER_ORDERS,
} from './data/shopperData';

// Core Navigation & Layout Components
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

// Creator Studio Views
import { DashboardView } from './components/DashboardView';
import { LivestreamsView } from './components/LivestreamsView';
import { ProductsView } from './components/ProductsView';
import { DirectorStudioView } from './components/DirectorStudioView';
import { OrdersView } from './components/OrdersView';
import { AudienceView } from './components/AudienceView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { SummaryView } from './components/SummaryView';

// Shopper & Live Shopping Views
import { ShopperHomeView } from './components/ShopperHomeView';
import { LiveNowView } from './components/LiveNowView';
import { DiscoverStreamsView } from './components/DiscoverStreamsView';
import { ShopperProductsView } from './components/ShopperProductsView';
import { FollowingView } from './components/FollowingView';
import { WishlistView } from './components/WishlistView';
import { ShopperOrdersView } from './components/ShopperOrdersView';
import { ShopperProfileView } from './components/ShopperProfileView';
import { ViewerExperienceView } from './components/ViewerExperienceView';
import { CartView, ConsumerCartItem } from './components/CartView';

// Modals & Drawers
import { ProductSpotlightModal } from './components/ProductSpotlightModal';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  // 1. Platform Mode State ('creator' | 'shopper')
  const [appMode, setAppMode] = useState<AppMode>(() => {
    try {
      const saved = localStorage.getItem('streamcart_app_mode');
      if (saved === 'creator' || saved === 'shopper') return saved;
    } catch {}
    return 'shopper'; // Buyer-first discovery as default, with instant 1-click toggle to Creator Studio
  });

  // 2. Active Screen Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    try {
      const savedMode = localStorage.getItem('streamcart_app_mode');
      return savedMode === 'creator' ? 'dashboard' : 'home';
    } catch {}
    return 'home';
  });

  // 3. Application Data States
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [activeFeaturedProductId, setActiveFeaturedProductId] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [scheduledStreams, setScheduledStreams] = useState<ScheduledLivestream[]>(INITIAL_SCHEDULED_STREAMS);
  const [orders, setOrders] = useState<LiveOrder[]>(INITIAL_ORDERS);
  const [questions, setQuestions] = useState<ViewerQuestion[]>(INITIAL_QUESTIONS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [notifications, setNotifications] = useState<StudioNotification[]>(INITIAL_NOTIFICATIONS);
  const [stats, setStats] = useState<StreamStats>(INITIAL_STATS);

  // 4. Shopper Specific Persistent States
  const [followedCreators, setFollowedCreators] = useState<FollowedCreator[]>(() => {
    try {
      const saved = localStorage.getItem('streamcart_followed_creators');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FOLLOWED_CREATORS;
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('streamcart_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_WISHLIST;
  });

  const [shopperOrders, setShopperOrders] = useState<ShopperOrder[]>(() => {
    try {
      const saved = localStorage.getItem('streamcart_shopper_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SHOPPER_ORDERS;
  });

  // 5. User Profile State (Argho Biswas with custom photo support & persistence)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('streamcart_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Argho Biswas',
      username: '@arghobiswas',
      email: 'arghobiswas144@gmail.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      role: 'VIP Shopper & Stream Director',
      bio: 'Live Commerce Enthusiast • Tech & Audiophile Collector • Flash Drop Hunter',
      followingCount: INITIAL_FOLLOWED_CREATORS.length,
      wishlistCount: INITIAL_WISHLIST.length,
      ordersCount: INITIAL_SHOPPER_ORDERS.length,
      totalSaved: 420.0,
      rewardPoints: 3450,
      tier: 'Diamond VIP',
    };
  });

  // 6. Consumer Shopping Cart State
  const [cartItems, setCartItems] = useState<ConsumerCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('streamcart_consumer_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[0], // Aura Studio Wireless ANC Headphones
        variant: INITIAL_PRODUCTS[0].variants[0],
        quantity: 1,
        addedAt: '2 mins ago',
      },
      {
        id: 'cart-init-2',
        product: INITIAL_PRODUCTS[3], // Orbit 75% Mechanical Keyboard
        variant: INITIAL_PRODUCTS[3].variants[0],
        quantity: 1,
        addedAt: 'Just now',
      },
    ];
  });

  // 7. Broadcast Status & Theme States
  const [broadcastStatus, setBroadcastStatus] = useState<BroadcastStatus>('LIVE');
  const [selectedConsumerChannelId, setSelectedConsumerChannelId] = useState<string>('channel-tech');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // UI Modals & Drawers
  const [spotlightProduct, setSpotlightProduct] = useState<ProductItem | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Sync theme to root DOM
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Mode Switch Handler with intelligent screen routing
  const handleSwitchMode = (newMode: AppMode) => {
    setAppMode(newMode);
    try {
      localStorage.setItem('streamcart_app_mode', newMode);
    } catch {}

    const creatorScreens: ScreenId[] = ['dashboard', 'livestreams', 'products', 'studio', 'orders', 'audience', 'analytics', 'settings'];
    const shopperScreens: ScreenId[] = ['home', 'live-now', 'discover', 'shopper-products', 'following', 'wishlist', 'my-orders', 'profile'];

    if (newMode === 'shopper' && creatorScreens.includes(currentScreen)) {
      setCurrentScreen('home');
    } else if (newMode === 'creator' && shopperScreens.includes(currentScreen)) {
      setCurrentScreen('dashboard');
    }
  };

  // Follow / Unfollow Creator Handler
  const handleToggleFollow = (creatorId: string) => {
    setFollowedCreators((prev) => {
      const existing = prev.find((c) => c.id === creatorId);
      let updated: FollowedCreator[];
      if (existing) {
        updated = prev.map((c) => (c.id === creatorId ? { ...c, isFollowing: !c.isFollowing } : c));
      } else {
        updated = prev;
      }
      try {
        localStorage.setItem('streamcart_followed_creators', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setUserProfile((prev) => {
      const activeFollows = followedCreators.filter((c) => (c.id === creatorId ? !c.isFollowing : c.isFollowing)).length;
      return { ...prev, followingCount: activeFollows };
    });
  };

  // Wishlist Toggle Handler
  const handleToggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      let updated: WishlistItem[];
      if (existingIndex >= 0) {
        updated = prev.filter((_, idx) => idx !== existingIndex);
      } else {
        const newItem: WishlistItem = {
          id: `wish-${Date.now()}`,
          product,
          addedAt: 'Just now',
          priceDropAlert: true,
          liveStreamAlert: true,
          isLiveNow: product.id === activeFeaturedProductId || product.status === 'active_drop',
          streamChannelId: 'channel-tech',
        };
        updated = [newItem, ...prev];
      }
      try {
        localStorage.setItem('streamcart_wishlist', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setUserProfile((prev) => ({
      ...prev,
      wishlistCount: wishlist.some((w) => w.product.id === product.id)
        ? wishlist.length - 1
        : wishlist.length + 1,
    }));
  };

  const handleRemoveFromWishlist = (wishlistId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((w) => w.id !== wishlistId);
      try {
        localStorage.setItem('streamcart_wishlist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Profile Management Handlers
  const handleUpdateUserProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    try {
      localStorage.setItem('streamcart_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadAvatar = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const updated = { ...userProfile, avatarUrl: result };
        setUserProfile(updated);
        try {
          localStorage.setItem('streamcart_user_profile', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Cart Management Handlers
  const handleUpdateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
      try {
        localStorage.setItem('streamcart_consumer_cart', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('streamcart_consumer_cart', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('streamcart_consumer_cart');
    } catch {}
  };

  const handleQuickAddProductToCart = (prod: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === prod.id);
      let updated: ConsumerCartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prev,
          {
            id: `cart-${Date.now()}`,
            product: prod,
            variant: prod.variants?.[0] || { id: 'v-std', name: 'Standard', colorHex: '#71717A', inStock: true },
            quantity: 1,
            addedAt: 'Just now',
          },
        ];
      }
      try {
        localStorage.setItem('streamcart_consumer_cart', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleCartCheckout = (newOrders: LiveOrder[], totalPaid: number) => {
    newOrders.forEach((ord) => handlePlaceOrder(ord));
    handleClearCart();
  };

  const cartUnitsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Live Timer for Stream Duration & CCV natural oscillation
  useEffect(() => {
    if (broadcastStatus !== 'LIVE') return;
    const timer = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        durationSeconds: prev.durationSeconds + 1,
        ccv: Math.max(2350, prev.ccv + Math.floor((Math.random() - 0.48) * 12)),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [broadcastStatus]);

  // Product Management Handlers
  const handleUpdateProduct = (updated: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProduct = (newProd: ProductItem) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSelectFeaturedProduct = (productId: string) => {
    setActiveFeaturedProductId(productId);
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        status: p.id === productId ? 'active_drop' : p.status === 'active_drop' ? 'queued' : p.status,
      }))
    );
  };

  // Chat & Q&A Handlers
  const handleSendChatMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      user: userProfile.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHost: appMode === 'creator',
      badge: appMode === 'creator' ? '★ HOST' : '💎 VIP',
      avatar: userProfile.avatarUrl,
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const handleAnswerQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isAnswered: !q.isAnswered } : q))
    );
  };

  const handlePinQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => ({
        ...q,
        isPinned: q.id === id ? !q.isPinned : false,
      }))
    );
  };

  const handleDismissQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Order Placement & Real-time Synchronization across Creator & Shopper feeds
  const handlePlaceOrder = (order: LiveOrder) => {
    setOrders((prev) => [order, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      gmv: prev.gmv + order.amount,
      likesCount: prev.likesCount + 30,
    }));

    // Synchronize to Shopper Orders record
    const matchingProduct = products.find((p) => p.title === order.productTitle) || products[0];
    const newShopperOrder: ShopperOrder = {
      id: `shop-ord-${Date.now()}`,
      orderNumber: order.orderNumber,
      orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      creatorName: 'Alex Vance',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      channelTitle: 'CyberTech Arena',
      channelId: 'channel-tech',
      streamTitle: 'Next-Gen CyberTech Live Drop: Ultra ANC & Pro Battle-Gear',
      totalAmount: order.amount,
      paymentMethod: order.paymentMethod,
      trackingNumber: `1Z99999999${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: '3-4 Business Days',
      carrier: 'UPS Express Air',
      items: [
        {
          id: `item-${Date.now()}`,
          product: matchingProduct,
          variant: order.variant,
          quantity: 1,
          price: order.amount,
        },
      ],
    };

    setShopperOrders((prev) => {
      const updated = [newShopperOrder, ...prev];
      try {
        localStorage.setItem('streamcart_shopper_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Update product stock and sold count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.title === order.productTitle || p.id === activeFeaturedProductId) {
          return {
            ...p,
            stock: Math.max(0, p.stock - 1),
            soldCount: p.soldCount + 1,
          };
        }
        return p;
      })
    );

    // Create Notification Alert
    const newNotif: StudioNotification = {
      id: `notif-${Date.now()}`,
      type: 'order',
      title: `Live Order: ${order.orderNumber}`,
      message: `${order.customerName} purchased ${order.productTitle} ($${order.amount.toFixed(2)})`,
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Live Simulation Trigger Handlers
  const handleSimulateOrder = () => {
    const buyers = ['Marcus Vance', 'Chloe Sterling', 'Kai Takahashi', 'Elena Rostova', 'Liam Davies', 'Ava Montgomery'];
    const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
    const activeProd = products.find((p) => p.id === activeFeaturedProductId) || products[0];
    const orderNum = `#SC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: LiveOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: randomBuyer,
      productTitle: activeProd.title,
      variant: activeProd.variants?.[0]?.name || 'Standard Edition',
      amount: activeProd.salePrice,
      timestamp: 'Just now',
      status: 'Completed',
      paymentMethod: 'Apple Pay',
    };

    handlePlaceOrder(newOrder);
  };

  const handleSimulateLike = () => {
    setStats((prev) => ({ ...prev, likesCount: prev.likesCount + 1 }));
  };

  const handleSimulateQuestion = () => {
    const sampleQuestions = [
      'Does the 4K Drone support obstacle avoidance in night mode?',
      'Is there an international warranty included with this livestream drop?',
      'Can you demo the ANC noise cancelling with background audio playing?',
    ];
    const randomQ = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    const newQuestion: ViewerQuestion = {
      id: `q-${Date.now()}`,
      user: 'Chloe_SF',
      question: randomQ,
      timestamp: 'Just now',
      votes: 14,
      isAnswered: false,
      isPinned: false,
    };
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  // Broadcast Controls
  const handleToggleBroadcast = () => {
    setBroadcastStatus((prev) => (prev === 'LIVE' ? 'PAUSED' : 'LIVE'));
  };

  const handleEndStream = () => {
    setBroadcastStatus('ENDED');
    setCurrentScreen('summary');
  };

  const handleAddStream = (newStream: ScheduledLivestream) => {
    setScheduledStreams((prev) => [newStream, ...prev]);
  };

  const handleJoinConsumerStream = (channelId: string) => {
    setSelectedConsumerChannelId(channelId);
    setCurrentScreen('viewer');
  };

  const handleDeleteStream = (id: string) => {
    setScheduledStreams((prev) => prev.filter((s) => s.id !== id));
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans antialiased">
      {/* 1. Primary Left Navigation Sidebar */}
      <Sidebar
        appMode={appMode}
        onSwitchMode={handleSwitchMode}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        broadcastStatus={broadcastStatus}
        liveViewerCount={stats.ccv}
        unreadNotificationsCount={unreadNotifsCount}
        unreadOrdersCount={orders.length}
        cartItemCount={cartUnitsCount}
        wishlistCount={wishlist.length}
        userProfile={userProfile}
        onUploadAvatar={handleUploadAvatar}
        theme={theme}
        onToggleTheme={setTheme}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Hub */}
        <TopHeader
          appMode={appMode}
          onSwitchMode={handleSwitchMode}
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          broadcastStatus={broadcastStatus}
          onToggleBroadcast={handleToggleBroadcast}
          unreadNotificationsCount={unreadNotifsCount}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          onSimulateOrder={handleSimulateOrder}
          onSimulateLike={handleSimulateLike}
          onSimulateQuestion={handleSimulateQuestion}
          cartItemCount={cartUnitsCount}
          wishlistCount={wishlist.length}
          userProfile={userProfile}
          theme={theme}
          onToggleTheme={setTheme}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Shopper Views */}
          {currentScreen === 'home' && (
            <ShopperHomeView
              onNavigate={setCurrentScreen}
              onJoinStream={handleJoinConsumerStream}
              onQuickAddToCart={handleQuickAddProductToCart}
              products={products}
            />
          )}

          {currentScreen === 'live-now' && (
            <LiveNowView
              onNavigate={setCurrentScreen}
              onJoinStream={handleJoinConsumerStream}
            />
          )}

          {currentScreen === 'shopper-products' && (
            <ShopperProductsView
              products={products}
              onNavigate={setCurrentScreen}
              onAddToCart={handleQuickAddProductToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistProductIds={wishlist.map((w) => w.product.id)}
            />
          )}

          {currentScreen === 'following' && (
            <FollowingView
              creators={followedCreators}
              onNavigate={setCurrentScreen}
              onToggleFollow={handleToggleFollow}
              onJoinStream={handleJoinConsumerStream}
            />
          )}

          {currentScreen === 'wishlist' && (
            <WishlistView
              wishlist={wishlist}
              onNavigate={setCurrentScreen}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onAddToCart={handleQuickAddProductToCart}
              onJoinStream={handleJoinConsumerStream}
            />
          )}

          {currentScreen === 'my-orders' && (
            <ShopperOrdersView
              orders={shopperOrders}
              onNavigate={setCurrentScreen}
              onJoinStream={handleJoinConsumerStream}
            />
          )}

          {currentScreen === 'profile' && (
            <ShopperProfileView
              userProfile={userProfile}
              onUpdateProfile={handleUpdateUserProfile}
              onUploadAvatar={handleUploadAvatar}
              onNavigate={setCurrentScreen}
            />
          )}

          {/* Shared Commerce & Live Stage Views */}
          {currentScreen === 'cart' && (
            <CartView
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onCheckout={handleCartCheckout}
              onNavigate={setCurrentScreen}
              onQuickAddProduct={handleQuickAddProductToCart}
              availableProducts={products}
            />
          )}

          {currentScreen === 'discover' && (
            <DiscoverStreamsView
              onJoinStream={handleJoinConsumerStream}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'viewer' && (
            <ViewerExperienceView
              products={products}
              activeFeaturedProductId={activeFeaturedProductId}
              chatMessages={chatMessages}
              initialChannelId={selectedConsumerChannelId}
              onSendMessage={handleSendChatMessage}
              onPlaceOrder={handlePlaceOrder}
              onNavigate={setCurrentScreen}
              onSimulateLike={handleSimulateLike}
            />
          )}

          {/* Creator Studio Views */}
          {currentScreen === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentScreen}
              stats={stats}
              scheduledStreams={scheduledStreams}
              products={products}
              recentOrders={orders}
            />
          )}

          {currentScreen === 'livestreams' && (
            <LivestreamsView
              onNavigate={setCurrentScreen}
              scheduledStreams={scheduledStreams}
              products={products}
              onAddStream={handleAddStream}
              onDeleteStream={handleDeleteStream}
            />
          )}

          {currentScreen === 'products' && (
            <ProductsView
              products={products}
              onNavigate={setCurrentScreen}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onFeatureProduct={handleSelectFeaturedProduct}
              activeFeaturedProductId={activeFeaturedProductId}
            />
          )}

          {currentScreen === 'studio' && (
            <DirectorStudioView
              products={products}
              chatMessages={chatMessages}
              questions={questions}
              orders={orders}
              stats={stats}
              broadcastStatus={broadcastStatus}
              activeFeaturedProductId={activeFeaturedProductId}
              onSelectFeaturedProduct={handleSelectFeaturedProduct}
              onSendMessage={handleSendChatMessage}
              onAnswerQuestion={handleAnswerQuestion}
              onPinQuestion={handlePinQuestion}
              onDismissQuestion={handleDismissQuestion}
              onToggleBroadcast={handleToggleBroadcast}
              onEndStream={handleEndStream}
              onNavigate={setCurrentScreen}
              onOpenProductSpotlight={(p) => setSpotlightProduct(p)}
              onSimulateOrder={handleSimulateOrder}
              onSimulateLike={handleSimulateLike}
            />
          )}

          {currentScreen === 'orders' && (
            <OrdersView orders={orders} onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'audience' && (
            <AudienceView onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'analytics' && (
            <AnalyticsView onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              onNavigate={setCurrentScreen}
              userProfile={userProfile}
              onUpdateProfile={handleUpdateUserProfile}
              onUploadAvatar={handleUploadAvatar}
              theme={theme}
              onToggleTheme={setTheme}
            />
          )}

          {currentScreen === 'summary' && (
            <SummaryView
              stats={stats}
              products={products}
              orders={orders}
              onNavigate={setCurrentScreen}
            />
          )}
        </main>
      </div>

      {/* 3. Product Spotlight Modal */}
      {spotlightProduct && (
        <ProductSpotlightModal
          product={spotlightProduct}
          onClose={() => setSpotlightProduct(null)}
          onInstantBuy={(p) => {
            setSpotlightProduct(null);
            handleQuickAddProductToCart(p);
            setCurrentScreen('cart');
          }}
        />
      )}

      {/* 4. Notification & Alert Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
        onClearNotifications={handleClearNotifications}
      />
    </div>
  );
}
