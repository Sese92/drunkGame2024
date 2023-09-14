import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as configurationReducer } from './features/gameConfiguration/configuration.store';
import { reducer as jotaReducer } from './features/jota/jota.store';
import { reducer as busReducer } from './features/bus/bus.store';

const appReducer = combineReducers({
  configuration: configurationReducer,
  jota: jotaReducer,
  bus: busReducer,
});

const reducer = (state, action) => {
  return appReducer(state, action);
};

const store = configureStore({
  reducer,
});

export { store };
