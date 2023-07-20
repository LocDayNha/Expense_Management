import { combineReducers } from 'redux';
import appReducer from './appReducer';
import demoReducer from './demoReducer';
import transactionReducer from './transactionReducer';



// file rootReducer will combine all reducer that have declared
export default rootReducer = combineReducers({
    appReducer:appReducer,
    demoReducer:demoReducer,
    transactionReducer:transactionReducer,
});