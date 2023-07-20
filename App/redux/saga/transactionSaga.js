import { takeLatest, call, put } from 'redux-saga/effects';
import getAllTransactions from '../actions/getTransaction'
// Define the worker function to handle the API call
// export default function* fetchAllTransactions() {
//     try {
//         const response = yield call(getAllTransactions);
//         console.log("--------------<",response);
//         yield put({ type: 'FETCH_ALL_TRANSACTIONS_SUCCESS', payload: response });
//     } catch (error) {
//         yield put({ type: 'FETCH_ALL_TRANSACTIONS_ERROR', error });
//     }
// }

// // Define the watcher function to listen for the action
// export default function* watchFetchAllTransactions() {
//     yield takeLatest('FETCH_ALL_TRANSACTIONS_REQUEST', fetchAllTransactions);
// }

export default function* (action) {
    // try {
        console.log("Comment Saga transaction - Actions",action);
        const response = yield call(getAllTransactions);
        console.log("--------------<",response);
        yield put({ type: 'FETCH_ALL_TRANSACTIONS_SUCCESS', payload: response });
    // } catch (error) {
    //     yield put({ type: 'FETCH_ALL_TRANSACTIONS_ERROR', error });
    // }
}

// Define the watcher function to listen for the action
// export default function* watchFetchAllTransactions() {
//     yield takeLatest('FETCH_ALL_TRANSACTIONS_REQUEST', fetchAllTransactions);
// }