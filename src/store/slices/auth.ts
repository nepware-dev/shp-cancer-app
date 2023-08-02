import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user?: Record<string, any>;
  token?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: state => {
      state.isAuthenticated = true;
    },
    setUser: (state, {payload}: PayloadAction<AuthState['user']>) => {
      state.user = payload;
    },
    setToken: (state, {payload}: PayloadAction<AuthState['token']>) => {
      state.token = payload;
    },
    setRefreshToken: (
      state,
      {payload}: PayloadAction<AuthState['refreshToken']>,
    ) => {
      state.refreshToken = payload;
    },
    setIdToken: (state, {payload}: PayloadAction<AuthState['idToken']>) => {
      state.idToken = payload;
    },
    setLogout: () => initialState,
  },
});

export const {
  setLogin,
  setUser,
  setToken,
  setRefreshToken,
  setIdToken,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
