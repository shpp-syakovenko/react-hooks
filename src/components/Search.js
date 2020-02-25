import React,{ useContext, useState } from 'react';
import {AlertContext} from "../context/alert/alertContext";
import {GithubContext} from "../context/github/githubContext";

// Компонент поиска пользователей на github

export const Search = () => {
    const [value, setValue] =  useState('');
    const {show, hide} = useContext(AlertContext);
    const github = useContext(GithubContext);

    const onSubmit = (event) => {
        if(event.key !== 'Enter'){
            return
        }

        github.clearUsers();

        if(value.trim()){
            github.search(value.trim()); // отправка запроса
            hide();
        }else{
            show('Вы не ввели данные!!!');
        }
    };

    return(
        <div className="form-group">
            <input
                type="text"
                className='form-control'
                placeholder='Введите ник пользователя...'
                onKeyPress={onSubmit}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    )
};