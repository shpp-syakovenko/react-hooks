import React,{useReducer} from 'react';
import axios from 'axios';
import {GithubContext} from "./githubContext";
import {GithubReducer} from "./GithubReducer";
import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from "../types";

// Две константы которые записаны в отдельном файле
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const GithubState = ({children}) => {
    // Начальный state
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: []
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Ищем всех пользователей на github
    const search = async value => {
        setLoading();
        const response = await axios.get(`https://api.github.com/search/users?q=${value}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    // Результат записываем в state
      dispatch({
          type: SEARCH_USERS,
          payload: response.data.items
      })
    };

    // Получаем данные конкретного пользователя
    const getUser = async name => {
        setLoading();
        const response = await axios.get(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
        // Все его данные записываем в state
        dispatch({
            type: GET_USER,
            payload: response.data
        })
    };

    // Получаем все репозитории конкретного пользователя по его имени
    const getRepos = async name => {
        setLoading();
        const response = await axios.get(`https://api.github.com/users/${name}/repos?per_page=5&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
       dispatch({
           type: GET_REPOS,
           payload: response.data
       })
    };

    // Очищаем state от всех данных
    const clearUsers = () => dispatch({type: CLEAR_USERS});

    // Загрузка при поиске
    const setLoading = () => dispatch({type: SET_LOADING});

    const { user, users, repos, loading } = state;

    return(
        <GithubContext.Provider value={{
            search, getUser, getRepos, clearUsers, setLoading,
            user, users, repos, loading
        }}>
            {children}
        </GithubContext.Provider>
    )
};