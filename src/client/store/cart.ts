import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../common/types';

interface CardItemType {
  quantity: number;
  item: Item;
}

interface CartState {
  items: {
    [key: number]: CardItemType;
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
      if (!state[item.id]) {
        state[item.id] = {
          quantity: 0,
          item,
        };
      }
      state[item.id].quantity++;
    },
    removeItemFromCard(state, { payload: itemId }) {
      if (!state[itemId]) return;
      state[itemId].quantity--;
      if (state[itemId] === 0) state[itemId] = undefined;
    },
  },
});

export const { addItemToCart, removeItemFromCard } = cartSlice.actions;
export default cartSlice.reducer;
