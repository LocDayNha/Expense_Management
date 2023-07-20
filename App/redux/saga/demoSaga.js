import { call, put } from 'redux-saga/effects';
import getComments from '../actions/getComment';

export default function* (action) {
    console.log('Comment Saga - Actions', action);
    const comments = yield call(getComments) //call api
    console.log("comments", comments);
    yield put({ type: 'GET_COMMENTS_SUCCESS', payload: comments })
    
}