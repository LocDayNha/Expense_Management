import {createStore, applyMiddleware}from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './saga/rootSaga';

const sagaMiddleware =createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
//trong rootSaga có nhiều saga con , each saga con được đảm nhận 1 nhiệm vụ
export default {
    store
}