import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import flowReducer from './flow.slice'
import onboardingReducer from './onboarding.slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['onboarding', 'flow'],
}

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  flow: flowReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
