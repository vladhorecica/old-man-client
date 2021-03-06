import * as UserService from '../services/UserService';

export const ME_ACTION = "@@ME_ACTION";
export const LOGOUT_ACTION = "@@LOGOUT_ACTION";
export const SET_USER_ACTION = "@@SET_USER_ACTION";
export const SET_USERS_ACTION = "@@SET_USERS_ACTION";
export const REMOVE_USER_ACTION = "@@REMOVE_USER_ACTION";


export const DEFAULT_LIMIT = 50;

export const authAction = (username, password, callbackObj = null) => dispatch => {
    UserService.loadMe({username, password})
        .then((user) => {
            if (callbackObj) {
                callbackObj.onSuccess();
            }

            dispatch(setMe(user));
        })
        .catch(() => {
            if (callbackObj) {
                callbackObj.onFailure();
            }
        });
};

export const logoutAction = () => dispatch => {
    dispatch({
        type: LOGOUT_ACTION
    });
};

export const setMe = (me) => dispatch => {
    dispatch({
        type: ME_ACTION,
        payload: me
    })
};

export const setUser = (user) => dispatch => {
    dispatch({
        type: SET_USER_ACTION,
        payload: user
    })
};

export const removeUser = (id) => dispatch => {
    dispatch({
        type: REMOVE_USER_ACTION,
        payload: id
    })
};

export const setUsersData = (total, current, data) => dispatch => {
    dispatch({
        type: SET_USERS_ACTION,
        total,
        current,
        data
    });
};


export const createUserAction = (data, callbackObj) => {
    return (dispatch, getState) => {
        UserService.createUser(data)
            .then((user) => {
                dispatch(setUser(user));

                if (callbackObj)
                    callbackObj.onSuccess();
            });
    }
};

export const deleteUserAction = (id) => {
    return (dispatch, getState) => {
        const auth = getState().userReducer.auth;

        UserService.removeUser(id, auth)
            .then(id => dispatch(removeUser(id)));
    }
};

export const loadUsersAction = () => {
    return (dispatch, getState) => {
        const state = getState();
        const auth = state.userReducer.auth;
        let query = state.userReducer.pageData;

        if (query.offset !== DEFAULT_LIMIT) {
            query.offset += DEFAULT_LIMIT;
        }

        UserService.loadUsers(query, auth)
            .then((response) => {
                dispatch(setUsersData(
                    response.meta.total,
                    response.meta.offset,
                    response.data
                ));
            })
    }
};

export const getAllUsers = (offset, limit, auth) => {
    return UserService.loadUsers({offset, limit}, auth)
        .then(response => response);
};
