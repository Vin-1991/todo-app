import { createStore, combineReducers } from 'redux';
import { todos, visibilityFilter } from './reducers';
import { todoBuckets } from './bucketReducers';

export default createStore(combineReducers({ todoBuckets, todos, visibilityFilter }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())