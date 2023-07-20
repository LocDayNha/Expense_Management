import { put } from "redux-saga/effects";
/**
 * funtion*  khi mà gọi cái funtion này thì nó sẽ dừng lại ơ cái yield
 * khi nào  goi biến next thì nó ms  done
 */
function* updateMode(darkMode) {
    yield put({ type: 'CHANGE_APP_MODE_SUCCESS', payload: darkMode })

}
export default function* (action) {
    console.log("App Saga - actions", action);
    yield call(updateMode, action.payload.darkMode)
}