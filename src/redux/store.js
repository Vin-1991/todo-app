import { createStore, combineReducers } from 'redux';
import { todos } from './todoReducers';
import { todoBuckets } from './bucketReducers';

export default createStore(combineReducers({ todoBuckets, todos }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())