import { createStore } from 'redux';
import { devToolEnhancer } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

export function configureStore() {
  return createStore(rootReducer, devToolEnhancer);
}
