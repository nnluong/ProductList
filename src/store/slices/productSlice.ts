import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';
import type {Product, Category} from '../../types/product';
import productsData from '../../data/products.json';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: Category;
}

const initialState: ProductState = {
  products: productsData as Product[],
  filteredProducts: productsData as Product[],
  searchQuery: '',
  selectedCategory: 'All',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },

    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },

    applyFilters: state => {
      let filtered = state.products;

      if (state.selectedCategory !== 'All') {
        filtered = filtered.filter(
          product => product.category === state.selectedCategory,
        );
      }

      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query),
        );
      }

      state.filteredProducts = filtered;
    },
  },
});

export const selectAllProducts = (state: RootState) =>
  state.product.filteredProducts;

export const selectSearchQuery = (state: RootState) =>
  state.product.searchQuery;

export const selectSelectedCategory = (state: RootState) =>
  state.product.selectedCategory;

export const {setSearchQuery, setSelectedCategory} = productSlice.actions;

export default productSlice.reducer;
