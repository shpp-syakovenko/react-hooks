import {HIDE_ALERT, SHOW_ALERT} from "../types";

// Обьект с функциями ключи которого будут action.type
const handlers = {
    [SHOW_ALERT]: (state, action) => action.payload,
    [HIDE_ALERT]: () => null,
    DEFAULT: state => state
};

export const AlertReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT; // handler ЭТО ФУНКЦИЯ!!!! точнее одна с обьекта handlers
    return handler(state, action)
};