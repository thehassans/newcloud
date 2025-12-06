import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, billingCycle) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.billingCycle === billingCycle
        );
        
        if (existingIndex > -1) {
          // Update quantity
          const newItems = [...items];
          newItems[existingIndex].quantity += 1;
          set({ items: newItems });
        } else {
          set({ items: [...items, { product, billingCycle, quantity: 1 }] });
        }
      },
      
      removeItem: (productId, billingCycle) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.billingCycle === billingCycle)
          ),
        });
      },
      
      updateQuantity: (productId, billingCycle, quantity) => {
        const items = get().items;
        const index = items.findIndex(
          (item) => item.product.id === productId && item.billingCycle === billingCycle
        );
        
        if (index > -1) {
          const newItems = [...items];
          newItems[index].quantity = quantity;
          set({ items: newItems });
        }
      },
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Add computed property for total
Object.defineProperty(useCartStore.getState(), 'total', {
  get() {
    return useCartStore.getState().items.reduce((total, item) => {
      const price = item.product[`price_${item.billingCycle}`] || item.product.price_monthly || 0;
      return total + price * item.quantity;
    }, 0);
  },
  enumerable: true,
  configurable: true
});

export const useThemeStore = create(
  persist(
    (set) => ({
      gradientMode: true,
      
      toggleGradient: () => set((state) => {
        const newMode = !state.gradientMode;
        document.body.classList.toggle('theme-simple', !newMode);
        return { gradientMode: newMode };
      }),
      
      setGradientMode: (mode) => set({ gradientMode: mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useCurrencyStore = create(
  persist(
    (set) => ({
      selectedCurrency: 'USD',
      currencies: [],
      
      setCurrency: (currency) => set({ selectedCurrency: currency }),
      setCurrencies: (currencies) => set({ currencies }),
    }),
    {
      name: 'currency-storage',
    }
  )
);
