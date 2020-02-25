import React, {useContext} from 'react';
import {AlertContext} from "../context/alert/alertContext";

// копмонент для вывода сообщение об ошибке в случае если данные поиска не были введены

export const Alert = () => {

    const {alert, hide} = useContext(AlertContext);
    if(!alert) return null;

    return(
        <div className={`alert alert-${alert.type || 'secondary'} alert-dismissible`}
             role="alert">
            {alert.text}
            <button type="button" onClick={hide} className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
};