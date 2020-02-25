import React, {useReducer} from 'react';
import {AlertContext} from "./alertContext";
import {AlertReducer} from "./AlertReducer";
import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const AlertState = ({children}) => {

    const [state, dispatch] = useReducer(AlertReducer, null);

    // Метод который скрывает Alert
    const hide = () => dispatch({
        type: HIDE_ALERT
    });

    // метод показывает Alert
    const show = (text, type = 'secondary') => {
      dispatch({
          type: SHOW_ALERT,
          payload: {text, type}
      })
    };


    return(
        // Добавляем методы что б они были доступны во всем приложении
        <AlertContext.Provider value={{
            hide,
            show,
            alert: state
        }}>
            {children}
        </AlertContext.Provider>
    )
};