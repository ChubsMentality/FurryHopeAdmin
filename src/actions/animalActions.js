import axios from 'axios'
import { quickSort } from '../components/SubComponents/Quicksort'
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
} from '../constants/animalConstants';

import {
    GET_ANIMAL_REGISTRATIONS_REQUEST,
    GET_ANIMAL_REGISTRATIONS_SUCCESS,
    GET_ANIMAL_REGISTRATIONS_FAIL,
    GET_ADOPTIONS_REQUEST,
    GET_ADOPTIONS_SUCCESS,
    GET_ADOPTIONS_FAIL,
} from '../constants/adminConstants'

// START
const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

export const getAnimalData = () => async (dispatch) => {
    try {
        dispatch({
            type: ANIMAL_DATA_REQUEST,
        });

        // Gets all of the animals inside the database
        const { data } = await axios.get(`${URL}api/animals`);

        dispatch({
            type: ANIMAL_DATA_SUCCESS,
            payload: data, 
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message 
                : error.message;

        dispatch({
            type: ANIMAL_DATA_FAIL,
            payload: message,
        });
    }
}

export const createAnimalAction = 
    (name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear) => async (dispatch) => {
        try {
            dispatch({
                type: ANIMAL_CREATE_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${URL}api/animals/create`,
                { name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear },
                config
            );

            dispatch({
                type: ANIMAL_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message = 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: ANIMAL_CREATE_FAIL,
                payload: message
            });
        }
    };

export const updateAnimalAction = 
    (id, name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear) => async (dispatch) => {
        try {
            dispatch({
                type: ANIMAL_UPDATE_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.put(
                `${URL}api/animals/${id}`,
                { name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear },
                config
            );

            dispatch({
                type: ANIMAL_UPDATE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            const message = 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            dispatch({
                type: ANIMAL_UPDATE_FAIL,
                payload: message
            });
        }
    };

export const deleteAnimalAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ANIMAL_DELETE_REQUEST
        });

        const { data } = await axios.delete(`${URL}api/animals/${id}`);

        dispatch({
            type: ANIMAL_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: ANIMAL_DELETE_FAIL,
            payload: message
        });    
    }
}

