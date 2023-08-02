import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import storage from './storage';
import rootReducer, {type rootState} from './rootReducer';

const middlewares = [];

if (__DEV__) {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: [...middlewares],
});
const persistor = persistStore(store);

export type {rootState as RootState};

export {store, persistor};
