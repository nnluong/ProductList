
# Quick Order – Product Search & Cart

Build one simple mobile screen so that pharmacy staff can search for products and create a quick order.

---

## 🚀 How to Run the App

### Prerequisites
- Node.js (18+ recommended)
- npm or yarn
- Xcode 14.2 (for iOS)
- CocoaPods (`sudo gem install cocoapods`)
- Watchman (recommended)

### 1. Install dependencies
```
npm install
cd ios && pod install && cd ..
```

### 2. Start Metro Bundler
```
npm start
```

### 3. Run on iOS Simulator
```
npx react-native run-ios --simulator="iPhone SE (3rd generation)"
```

### 4. Run on Android Emulator
```
npx react-native run-android
```

---

## Project Structure & State Management

- **src/types/product.ts**: Product, CartItem, Category types
- **src/data/products.json**: Sample product data
- **src/store/**: Redux Toolkit store
  - **slices/cartSlice.ts**: Cart logic (add, remove, update, clear, hydrate)
  - **slices/productSlice.ts**: Product search/filter logic
- **src/components/**: UI components (ProductItem, SearchInput, CategoryFilter, CartSummary, EmptyState) are reusable
- **src/screens/QuickOrderScreen.tsx**: Main screen
- **src/utils/cartStorage.ts**: AsyncStorage helpers for cart persistence
- **src/hooks/redux.ts**: Typed Redux hooks
- **App.tsx**: App entry, Redux Provider

### State/Logic Organization
- **Redux Toolkit** for all state (cart, products, filters)
- **Debounced search** (300ms) in SearchInput
- **Cart persisted** to AsyncStorage (load/save on app open/close)
- **Selectors** for derived state (totals, filtered products)
- **Unit tests** for cart logic in `__tests__/cartSlice.test.ts`

---

## Trade-offs & Improvements

### Trade-offs
- **AsyncStorage** for persistence (simple, but not encrypted)
- **Debounce** is fixed at 300ms (could be user-configurable)
- **No backend**: All data is local JSON for demo
- **Minimal UI**: Focused on functionality, not custom design

### Improvements (with more time)
- Use a real backend/API for products and orders
- Add product images and richer product info
- Add authentication
- Improve error handling and loading states
- Polish UI/UX (animations, dark mode)
- Add e2e/UI tests (Detox)

---

## 🧪 Testing

Run unit tests:
```
npm test
```

---
