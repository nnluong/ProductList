import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import type {Product} from '../types/product';

interface ProductItemProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{product.name}</Text>
          {product.isPrescription && (
            <View style={styles.rxBadge}>
              <Text style={styles.rxText}>Rx</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>
          {product.price.toLocaleString('vi-VN')} ₫
        </Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.button, quantity === 0 && styles.buttonDisabled]}
          onPress={onDecrement}
          disabled={quantity === 0}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.buttonText,
              quantity === 0 && styles.buttonTextDisabled,
            ]}>
            −
          </Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity
          style={[styles.button, quantity >= 99 && styles.buttonDisabled]}
          onPress={onIncrement}
          disabled={quantity >= 99}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.buttonText,
              quantity >= 99 && styles.buttonTextDisabled,
            ]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
  },
  rxBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rxText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  category: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#059669',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#9ca3af',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    minWidth: 30,
    textAlign: 'center',
  },
});
