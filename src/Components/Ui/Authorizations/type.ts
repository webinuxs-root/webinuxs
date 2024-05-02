export enum ActionType {
    JOIN_ACCOUNT,
    LOGIN_ACCOUNT,
    CLOSE_DIALOG
}

export type Action =
    | {
        type: ActionType.JOIN_ACCOUNT;
    }
    | {
        type: ActionType.LOGIN_ACCOUNT;
    } | {
        type: ActionType.CLOSE_DIALOG;
    };


export interface State {
    open: boolean;
    current: "join" | "login" | null
}

export interface AuthTypes {
    login: () => void;
    join: () => void;
    close: () => void;
}