import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../common/types';

export interface CartItemType {
  quantity: number;
  item: Item;
}

interface CartState {
  items: {
    [key: number]: CartItemType;
  };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, { payload: item }: { payload: Item }) {
      if (state.items[item.id] === undefined) {
        state.items[item.id] = {
          quantity: 0,
          item,
        };
      }
      state.items[item.id].quantity++;
    },
    removeItemFromCart(state, { payload: itemId }) {
      if (!state[itemId]) return;
      state[itemId].quantity--;
      if (state[itemId] === 0) state[itemId] = undefined;
    },
    removeAllItemsFromCart(state) {
      state.items = {};
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItemsFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
