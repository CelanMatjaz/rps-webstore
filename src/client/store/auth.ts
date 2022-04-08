import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../common/types';

interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload: user }) {
      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
