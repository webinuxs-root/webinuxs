import { dispatch } from "./store";

//Types
import { ActionType, AuthTypes } from "./type";

//Generating Function
const auth: AuthTypes = {} as AuthTypes;

//Auth Login
auth.login = () => {
    dispatch({ type: ActionType.LOGIN_ACCOUNT })
}

//Auth Join
auth.join = () => {
    dispatch({ type: ActionType.JOIN_ACCOUNT })
}

//Auth Close
auth.close = () => {
    dispatch({ type: ActionType.CLOSE_DIALOG })
}

export default auth;