import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

interface CartSummaryProps {
  totalSKUs: number;
  totalQuantity: number;
  totalAmount: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalSKUs,
  totalQuantity,
  totalAmount,
}) => {
  if (totalSKUs === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>SKUs</Text>
          <Text style={styles.statValue}>{totalSKUs}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Qty</Text>
          <Text style={styles.statValue}>{totalQuantity}</Text>
        </View>

        <View style={styles.divider} />

        <View style={[styles.statItem, styles.totalItem]}>
          <Text style={styles.statLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>
            {totalAmount.toLocaleString('vi-VN')} ₫
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  totalItem: {
    flex: 1.5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
});
