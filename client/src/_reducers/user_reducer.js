//바로 action에서 안가져오고 type파일에서 가져옴
import { LOGIN_USER } from "../_actions/types";
import { REGISTER_USER } from "../_actions/types";
import { AUTH_USER } from "../_actions/types";

export default function (state = {}, action) {//이전 state (비어있음), action => 다음 state 리턴
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }//...: spreadOpreraion 위에 파라미터(state = {}부분) 그대로 가져옴
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;

        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;

        default:
            return state;
            break;
    }
}