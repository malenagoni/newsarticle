import { SAVE_ACTICLES, SEARCH_ARTICLES } from "../actions/actions";

export interface initialStateInterface {
    articles: any
};

const initialState = {
    articles: [],
};

export const rootReducer = (state : initialStateInterface = initialState, action:any) => {
    switch (action.type) {
        case SAVE_ACTICLES: 
            return { 
                ...state, 
                articles: action.payload 
            };
        case SEARCH_ARTICLES: 
            return { 
                ...state, 
                articles: action.payload 
            };
        default: 
            return state;
    }
}