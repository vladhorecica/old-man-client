import {
    ME_ACTION,
    SET_USER_ACTION,
    SET_USERS_ACTION,
    REMOVE_USER_ACTION,
    DEFAULT_LIMIT,
    LOGOUT_ACTION
} from '../actions/userAction';

const initialUserState = {
    auth: {
        me: undefined
    },
    pageData: {
        offset: 0,
        limit: DEFAULT_LIMIT
    },
    users: []
};

export default (state = initialUserState, action) => {
    switch (action.type) {
        case ME_ACTION:
            return {
                ...state,
                auth: {
                    me: action.payload
                }
            };

        case SET_USER_ACTION:
            return {
                ...state,
                users:[
                    ...state.users,
                    action.payload
                ]
            };

        case REMOVE_USER_ACTION:
            delete state.users[action.payload];
            return {
                ...state
            };

        case SET_USERS_ACTION:
            return {
                ...state,
                pageData: {
                    offset: action.current,
                    total: action.total
                },
                users: [...state.users, ...action.data]
            };

        case LOGOUT_ACTION:
            return {
                ...state,
                auth: {
                    me: undefined
                }
            };

        default:
            return state
    }
};
