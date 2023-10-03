import { combineReducers } from "redux";
import user from './user_reducer';
// import comment from './comment_reducer';


/*store에 여러가지 reducer이 있음
reducer은 state가 어떻게 변하는지 보여주고 마지막 값을 리턴해주는 역할.
state이 user, subscribe등 여러가지에 대한게 존재해서 이에 따라 reducer도 여러가지

combineReducer을 이용해 Root Reducer에서 하나로 합쳐준다.
*/
const rootReducer = combineReducers({
    user,
    //comment,
})

export default rootReducer;