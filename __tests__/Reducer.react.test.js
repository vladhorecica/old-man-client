import reducers from '../src/reducers/rootReducer';
import {
    DEFAULT_LIMIT,
    ME_ACTION
} from "../src/actions/userAction";

describe('USER Reducer', () => {
    const initialState = {
        userReducer: {
            auth: {
                me: undefined
            },
            pageData: {
                offset: 0,
                limit: DEFAULT_LIMIT
            },
            users: []
        }
    };

    it('Init reducer', () => {
        let state = reducers(undefined, {});

        expect(state).toEqual(initialState);
    });

    it('ME_ACTION', () => {
        const me = {
            username: 'test',
            token:'test123.321'
        };

        let state = reducers(
            { userReducer: initialState },
            { type: ME_ACTION, payload: me }
        );

        expect(state).toEqual({
            userReducer: {
                ...initialState,
                auth: { me }
            }
        });
    });
});
