import { 
    ANIMAL_DATA_REQUEST, 
    ANIMAL_DATA_SUCCESS, 
    ANIMAL_DATA_FAIL,
    ANIMAL_CREATE_REQUEST,
    ANIMAL_CREATE_SUCCESS,
    ANIMAL_CREATE_FAIL,
    ANIMAL_UPDATE_REQUEST,
    ANIMAL_UPDATE_SUCCESS,
    ANIMAL_UPDATE_FAIL,
    ANIMAL_DELETE_REQUEST,
    ANIMAL_DELETE_SUCCESS,
    ANIMAL_DELETE_FAIL,
} from '../constants/animalConstants'

export const animalDataReducer = (state = { animalList: [] }, action) => {
    switch(action.type) {
        case ANIMAL_DATA_REQUEST:
            return { loading: true };
        case ANIMAL_DATA_SUCCESS:
            return { loading: false, animalList: action.payload };
        case ANIMAL_DATA_FAIL:
            return { loading: false, error: action.paylaod };
        default: 
            return state;
    }
}

export const animalCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ANIMAL_CREATE_REQUEST:
            return { loading: true };
        case ANIMAL_CREATE_SUCCESS:
            return { loading: false, success: true};
        case ANIMAL_CREATE_FAIL:
            return { loading: false, error: action.payload};

        default:
            return state;
    }
}

export const animalUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case ANIMAL_UPDATE_REQUEST:
            return { loading: true };
        case ANIMAL_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case ANIMAL_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false};

        default:
            return state;
    }
}

export const animalDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case ANIMAL_DELETE_REQUEST:
            return { loading: true };
        case ANIMAL_DELETE_SUCCESS:
            return { loading: false, success: true};
        case ANIMAL_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false};

        default:
            return state;
    }
}

