import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import type {Category} from '../types/product';
import {CATEGORIES} from '../types/product';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {CATEGORIES.map(category => {
          const isSelected = category === selectedCategory;
          return (
            <TouchableOpacity
              key={category}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelectCategory(category)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  chipTextSelected: {
    color: '#fff',
  },
});
