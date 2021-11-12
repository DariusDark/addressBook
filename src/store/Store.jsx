import { createStore } from 'redux';
import { reducer } from './reducers/Reducers';

const store = createStore(reducer);

export default store;