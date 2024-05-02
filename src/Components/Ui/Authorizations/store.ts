"use client"
import { useState, useEffect } from "react";
import { ActionType, Action, State } from "./type";

//Creating A Reducer
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.JOIN_ACCOUNT:
            return {
                ...state,
                open: true,
                current: "join"
            };

        case ActionType.LOGIN_ACCOUNT:
            return {
                ...state,
                open: true,
                current: "login"
            };

        case ActionType.CLOSE_DIALOG:
            return {
                ...state,
                open: false,
                current: null
            };
        default:
            return {
                ...state,
                open: false,
                current: null
            };
    }
};

//Creating a global State
let memoryState: State = { current: null, open: false };

//Listeners
const listeners: Array<(state: State) => void> = [];

//Dispatching
export const dispatch = (action: Action) => {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
};

//Use Store Hook
export const useStore = (): State => {
    const [state, setState] = useState<State>(memoryState);
    useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);

    return state;
};
