import {applyMiddleware, compose, createStore} from 'redux';
import {allReducer} from './reducers';
import { APP_ENVIORMENT } from 'configs/variables.config';
import ReduxThunk from 'redux-thunk';
import { saveBasketState } from 'utils/functions.util';

const composeEnhancers = (APP_ENVIORMENT !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
 
export const store = createStore(
    allReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

store.subscribe(() => {
    saveBasketState(store.getState().shoppingReducer);
});