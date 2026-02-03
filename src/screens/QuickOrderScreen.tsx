import React, {useEffect, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCartItemQuantity,
  selectTotalSKUs,
  selectTotalQuantity,
  selectTotalAmount,
  hydrateCart,
} from '../store/slices/cartSlice';
import {
  setSearchQuery,
  setSelectedCategory,
  selectAllProducts,
  selectSearchQuery,
  selectSelectedCategory,
} from '../store/slices/productSlice';
import {ProductItem} from '../components/ProductItem';
import {SearchInput} from '../components/SearchInput';
import {CategoryFilter} from '../components/CategoryFilter';
import {EmptyState} from '../components/EmptyState';
import {CartSummary} from '../components/CartSummary';
import type {Product, Category} from '../types/product';
import {loadCartFromStorage, saveCartToStorage} from '../utils/cartStorage';

interface ProductItemWrapperProps {
  product: Product;
  onIncrement: (product: Product) => void;
  onDecrement: (productId: number) => void;
}

const ProductItemWrapper: React.FC<ProductItemWrapperProps> = ({
  product,
  onIncrement,
  onDecrement,
}) => {
  const quantity = useAppSelector(state =>
    selectCartItemQuantity(product.id)(state),
  );

  return (
    <ProductItem
      product={product}
      quantity={quantity}
      onIncrement={() => onIncrement(product)}
      onDecrement={() => onDecrement(product.id)}
    />
  );
};

export const QuickOrderScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectAllProducts);
  const searchQuery = useAppSelector(selectSearchQuery);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const cartItems = useAppSelector(selectCartItems);
  const totalSKUs = useAppSelector(selectTotalSKUs);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalAmount = useAppSelector(selectTotalAmount);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await loadCartFromStorage();
        if (savedCart.length > 0) {
          dispatch(hydrateCart(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    loadCart();
  }, [dispatch]);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await saveCartToStorage(cartItems);
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    saveCart();
  }, [cartItems]);

  const handleSearchChange = useCallback(
    (text: string) => {
      dispatch(setSearchQuery(text));
    },
    [dispatch],
  );

  const handleCategoryChange = useCallback(
    (category: Category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch],
  );

  const handleIncrement = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );

  const handleDecrement = useCallback(
    (productId: number) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch],
  );

  const renderProduct = useCallback(
    ({item}: {item: Product}) => {
      return (
        <ProductItemWrapper
          product={item}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      );
    },
    [handleIncrement, handleDecrement],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Quick Order</Text>
          <Text style={styles.subtitle}>Search & add products to cart</Text>
        </View>

        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search by product name..."
            debounceMs={300}
          />
        </View>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState message="No products found" />}
          showsVerticalScrollIndicator={false}
        />

        <CartSummary
          totalSKUs={totalSKUs}
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
});
