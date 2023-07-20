import {all, takeEvery} from 'redux-saga/effects';

/**
 * when it listen the change it will run appSaga
 */
import appSaga from './appSaga';
import demoSaga from './demoSaga';
import transactionSaga from './transactionSaga';


export default sagas = function*(){
    yield all([
        takeEvery('CHANGE_APP_MODE',appSaga),
        takeEvery('GET_COMMENTS',demoSaga),
        takeEvery('FETCH_ALL_TRANSACTIONS_REQUEST',transactionSaga),

    ])
}
