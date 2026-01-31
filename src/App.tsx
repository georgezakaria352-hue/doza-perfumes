import { useState } from 'react';
import { TempleGate } from './components/TempleGate';
import { CheckoutModal } from './components/CheckoutModal';
import { ProfileView } from './views/ProfileView';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { PerfumesView } from './views/PerfumesView';
import { ContactView } from './views/ContactView';
import { OurStoryView } from './views/OurStoryView';
import { AuthView } from './views/AuthView';
import type { Product } from './data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ShoppingBag } from 'lucide-react';
import { CartModal } from './components/CartModal';

function AppContent() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'perfumes' | 'story' | 'contact' | 'profile' | 'auth'>('home');
  const [perfumesSection, setPerfumesSection] = useState<string | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product; size: string; price: number; quantity: number }[]>([]);

  const addToCart = (product: Product, size: string, price: number, openCheckout = false) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { product, size, price, quantity: 1 }]);
    }

    if (openCheckout) {
      setIsCheckoutOpen(true);
    } else {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const handleEnterTemple = () => {
    setHasEntered(true);
    setCurrentView('perfumes');
  };

  const handleNavigate = (view: 'home' | 'perfumes' | 'story' | 'contact' | 'profile', subSection?: string) => {
    if (view === 'home') {
      setHasEntered(false);
      setCurrentView('home');
    } else {
      setHasEntered(true); // Ensure visuals are visible
      setCurrentView(view as any);
      if (view === 'perfumes' && subSection) {
        setPerfumesSection(subSection);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-stone-200 selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Temple Gate */}
      <AnimatePresence>
        {(!hasEntered) && (
          <TempleGate onEnter={handleEnterTemple} />
        )}
      </AnimatePresence>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onContinueToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBack={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        cart={cart}
        clearCart={() => setCart([])}
      />

      {/* Main Content Area - Visible only after entering */}
      {hasEntered && (
        <>
          {/* Navbar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <Navbar currentView={currentView} onNavigate={handleNavigate} />
          </motion.div>

          {/* Views */}
          <motion.main
            className="relative z-10 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {currentView === 'perfumes' && <PerfumesView onAddToCart={addToCart} initialSection={perfumesSection} />}

            {currentView === 'story' && <OurStoryView />}

            {currentView === 'contact' && <ContactView />}

            {currentView === 'profile' && <ProfileView />}

            {currentView === 'auth' && <AuthView onSuccess={() => setCurrentView('profile')} />}
          </motion.main>
        </>
      )}

      {/* Floating Cart Button - Hidden on Home */}
      {currentView !== 'home' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#D4AF37] p-4 rounded-full hover:bg-[#F2D06B] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)] group active:scale-95"
          >
            <ShoppingBag className="text-black group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#0F0F0F]">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </AudioProvider>
    </LanguageProvider>
  )
}

export default App;
