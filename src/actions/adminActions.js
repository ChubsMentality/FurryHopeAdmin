import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAIL,
    GET_ANIMAL_REGISTRATIONS_REQUEST,
    GET_ANIMAL_REGISTRATIONS_SUCCESS,
    GET_ANIMAL_REGISTRATIONS_FAIL,
    REGISTER_ANIMAL_REQUEST,
    REGISTER_ANIMAL_SUCCESS,
    REGISTER_ANIMAL_FAIL,
    GET_ADOPTIONS_REQUEST,
    GET_ADOPTIONS_SUCCESS,
    GET_ADOPTIONS_FAIL,
    GET_SPECIFIC_ADOPTION_REQUEST,
    GET_SPECIFIC_ADOPTION_SUCCESS,
    GET_SPECIFIC_ADOPTION_FAIL,
    DELETE_ADOPTION_REQUEST,
    DELETE_ADOPTION_SUCCESS,
    DELETE_ADOPTION_FAIL,
    UPDATE_ADOPTION_APPLICATION_REQUEST,
    UPDATE_ADOPTION_APPLICATION_SUCCESS,
    UPDATE_ADOPTION_APPLICATION_FAIL,
    DELETE_ADMIN_ACCOUNT_REQUEST,
    DELETE_ADMIN_ACCOUNT_SUCCESS,
    DELETE_ADMIN_ACCOUNT_FAIL,
    DELETE_USER_ACCOUNT_REQUEST,
    DELETE_USER_ACCOUNT_SUCCESS,
    DELETE_USER_ACCOUNT_FAIL,
    GET_STRAY_REPORTS_REQUEST,
    GET_STRAY_REPORTS_SUCCESS,
    GET_STRAY_REPORTS_FAIL,
    GET_DISMISSED_REPORTS_REQUEST,
    GET_DISMISSED_REPORTS_SUCCESS,
    GET_DISMISSED_REPORTS_FAIL,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAIL,
    DISMISS_STRAY_REPORT_REQUEST,
    DISMISS_STRAY_REPORT_SUCCESS,
    DISMISS_STRAY_REPORT_FAIL,
    GET_INTERVIEW_SCHED_REQUEST,
    GET_INTERVIEW_SCHED_SUCCESS,
    GET_INTERVIEW_SCHED_FAIL,
    SEND_INTERVIEW_MESSAGE_REQUEST,
    SEND_INTERVIEW_MESSAGE_SUCCESS,
    SEND_INTERVIEW_MESSAGE_FAIL,
    HAS_BEEN_INTERVIEWED_REQUEST,
    HAS_BEEN_INTERVIEWED_SUCCESS,
    HAS_BEEN_INTERVIEWED_FAIL,
    GET_DONATIONS_REQUEST,
    GET_DONATIONS_SUCCESS,
    GET_DONATIONS_FAIL,
    DELETE_DONATION_REQUEST,
    DELETE_DONATION_SUCCESS,
    DELETE_DONATION_FAIL,
    RECEIVED_DONATION_REQUEST,
    RECEIVED_DONATION_SUCCESS,
    RECEIVED_DONATION_FAIL,
    ADD_TO_INVENTORY_REQUEST,
    ADD_TO_INVENTORY_SUCCESS,
    ADD_TO_INVENTORY_FAIL,
    GET_INVENTORY_REQUEST,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_FAIL,
    GET_FEEDBACKS_REQUEST,
    GET_FEEDBACKS_SUCCESS,
    GET_FEEDBACKS_FAIL,
    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAIL,
    FEEDBACK_VIEWED_REQUEST,
    FEEDBACK_VIEWED_SUCCESS,
    FEEDBACK_VIEWED_FAIL,
    REPORT_VIEWED_REQUEST,
    REPORT_VIEWED_SUCCESS,
    REPORT_VIEWED_FAIL,
    GET_PENDING_PETS_REQUEST,
    GET_PENDING_PETS_SUCCESS,
    GET_PENDING_PETS_FAIL,
    GET_REGISTERED_PETS_REQUEST,
    GET_REGISTERED_PETS_SUCCESS,
    GET_REGISTERED_PETS_FAIL,
    GET_NOTREGISTERED_PETS_REQUEST,
    GET_NOTREGISTERED_PETS_SUCCESS,
    GET_NOTREGISTERED_PETS_FAIL,
    DELETE_REGISTRATION_REQUEST,
    DELETE_REGISTRATION_SUCCESS,
    DELETE_REGISTRATION_FAIL,
    SAVE_REQUIREMENTS_REQUEST,
    SAVE_REQUIREMENTS_SUCCESS,
    SAVE_REQUIREMENTS_FAIL,
    REJECT_REGISTRATION_REQUEST,
    REJECT_REGISTRATION_SUCCESS,
    REJECT_REGISTRATION_FAIL,
    DISABLE_ADMIN_REQUEST,
    DISABLE_ADMIN_SUCCESS,
    DISABLE_ADMIN_FAIL,
    ENABLE_ADMIN_REQUEST,
    ENABLE_ADMIN_SUCCESS,
    ENABLE_ADMIN_FAIL,
    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
    ANIMAL_CAPTURED_REQUEST,
    ANIMAL_CAPTURED_SUCCESS,
    ANIMAL_CAPTURED_FAIL,
    TOGGLE_MENU_OFF,
    TOGGLE_MENU_ON,
} from '../constants/adminConstants'
import axios from 'axios'

// const URL = 'https://furryhopebackend.herokuapp.com/'
const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'
// start

export const viewedReport = (id) => async (dispatch) => {
    try {
        dispatch({
            type: REPORT_VIEWED_REQUEST
        })

        const { data } = await axios.put(`${URL}api/admins/reportBeenRead/${id}`)

        dispatch({
            type: REPORT_VIEWED_SUCCESS
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: REPORT_VIEWED_FAIL,
            payload: message
        })
    }
}

// Action to login the admin
export const login = (email, password) => async (dispatch) => {
    try {
        // dispatch calls "USER_LOGIN_REQUEST" from adminReducers.js
        dispatch({ type: ADMIN_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }

        // POST - Authenticating the user (the file is in the backend (controllers))
        const { data } = await axios.post(`${URL}api/admins/loginAdmin`, // Route authenticating an admin
            {
                email,
                password,
            }, config);

        // If the API call is successfull, dispatch calls a reducer with a type of "USER_LOGIN_SUCCESS"
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

        // Stores the admin's login credential into the browser's local storage
        localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
        // If it fails, the dispatch with the type of "USER_LOGIN_FAIL is called"
        // And set the payload to error
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

// Action to logout the admin
export const logout = () => async (dispatch) => {
    localStorage.removeItem("adminInfo");
    dispatch({ type: ADMIN_LOGOUT });
}

// Action to add an admin
export const addAnAdmin = (fullName, email, contactNo, address, password, jobPosition, role, profilePicture) => async (dispatch) => {
    try {
        dispatch({ type: ADD_ADMIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // Adding an admin account to the database
        const { data } = await axios.post(`${URL}api/admins`, // Route for adding an admin account
            {
                fullName,
                email,
                contactNo,
                address,
                password,
                jobPosition,
                role,
                profilePicture,
            }, config);

        dispatch({ type: ADD_ADMIN_SUCCESS, payload: data });
        //localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: ADD_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getAnimalRegistrations = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ANIMAL_REGISTRATIONS_REQUEST
        })

        const { data } = await axios.get(`${URL}api/admins/getAllRegistrations`)

        dispatch({
            type: GET_ANIMAL_REGISTRATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: GET_ANIMAL_REGISTRATIONS_FAIL,
            payload: message
        })
    }
}


//getRegisteredPets

export const getAdoptionApplications = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ADOPTIONS_REQUEST
        })

        const { data } = await axios.get(`${URL}api/admins/adoptions`)
        
        dispatch({
            type: GET_ADOPTIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
                : error.message
        
                dispatch({
                    type: GET_ADOPTIONS_FAIL,
            payload: message
        })        
    }
}

export const getSpecificAdoption = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SPECIFIC_ADOPTION_REQUEST
        })

        const { data } = await axios.get(`${URL}api/admins/adoptions/${id}`)

        dispatch({
            type: GET_SPECIFIC_ADOPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        
            dispatch({
            type: GET_SPECIFIC_ADOPTION_FAIL,
            payload: message,
        })
    }
}

export const deleteAdoptionApplication = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ADOPTION_REQUEST
        })

        const { data } = await axios.delete(`${URL}api/admins/adoptions/${id}`)
        
        dispatch({
            type: DELETE_ADOPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                
                dispatch({
                    type: DELETE_ADOPTION_FAIL,
                    payload: message
                })
            }
}

export const updateAdoptionApplication = (animalId, adoptionId, adoptionStatus, applicationStatus, petFollowUp, followUpDate, email) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ADOPTION_APPLICATION_REQUEST,
        })
        
        // Updating the adoption status
        const { data: updateAdoptionData } = await axios.put(`${URL}api/admins/updateAdoptionStatus/${animalId}`, { adoptionStatus })
        
        // Updating the application status
        const { data } = await axios.put(`${URL}api/admins/updateApplication/${adoptionId}`, { adoptionStatus, applicationStatus, petFollowUp, followUpDate, email })
        
        dispatch({
            type: UPDATE_ADOPTION_APPLICATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        
        dispatch({
            type: UPDATE_ADOPTION_APPLICATION_FAIL,
            payload: message
        })
    }
}

export const deleteAdminAccount = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ADMIN_ACCOUNT_REQUEST,
        })
        
        const { data } = await axios.delete(`${URL}api/admins/deleteAdmin/${id}`)
        
        dispatch({
            type: DELETE_ADMIN_ACCOUNT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        
        dispatch({
            type: DELETE_ADMIN_ACCOUNT_FAIL,
            payload: message
        })
    }
}

export const deleteUserAccount = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_ACCOUNT_REQUEST,
        })
        
        const { data } = await axios.delete(`${URL}api/admins/deleteUser/${id}`)
        
        dispatch({
            type: DELETE_USER_ACCOUNT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                
                dispatch({
            type: DELETE_USER_ACCOUNT_FAIL,
            payload: message
        })
    }
}

export const getStrayAnimalReports = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_STRAY_REPORTS_REQUEST
        })
        
        const { data } = await axios.get(`${URL}api/admins/getReports`)
        
        dispatch({
            type: GET_STRAY_REPORTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_STRAY_REPORTS_FAIL,
            payload: message
        })
    }
}

export const getDismissedReports = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_DISMISSED_REPORTS_REQUEST
        })
        
        const { data } = await axios.get(`${URL}api/admins/dismissedReports`)
        
        dispatch({
            type: GET_DISMISSED_REPORTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_DISMISSED_REPORTS_FAIL,
            payload: message
        })
    }
}

export const deleteReport = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REPORT_REQUEST
        })
        
        const { data } = await axios.delete(`${URL}api/admins/deleteReport/${id}`)
        
        dispatch({
            type: DELETE_REPORT_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_DISMISSED_REPORTS_FAIL,
            payload: message
        })
    }
}

export const dismissReport = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DISMISS_STRAY_REPORT_REQUEST
        })
        
        const status = 'Dismissed'
        const { data } = await axios.put(`${URL}api/admins/dismissReport/${id}`, {status})
        
        dispatch({
            type: DISMISS_STRAY_REPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: DISMISS_STRAY_REPORT_FAIL,
            payload: message
        })
    }
}

export const getInterviewSchedule = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_INTERVIEW_SCHED_REQUEST
        })

        const { data } = await axios.get(`${URL}api/admins/getInterviewSched/${id}`)

        dispatch({
            type: GET_INTERVIEW_SCHED_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_INTERVIEW_SCHED_FAIL,
            payload: message
        })
    }
} 

export const submitInterviewSchedule = (id, recipientEmail, message, date, time) => async (dispatch) => {
    try {
        dispatch({
            type: SEND_INTERVIEW_MESSAGE_REQUEST
        })
        
        const { data } = await axios.post(`${URL}api/admins/createInterviewSched/${id}`, { recipientEmail, message, date, time })
        
        dispatch({
            type: SEND_INTERVIEW_MESSAGE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: SEND_INTERVIEW_MESSAGE_FAIL,
            payload: message
        })
    }
}

export const getDonations = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_DONATIONS_REQUEST,
        })
        
        const { data } = await axios.get(`${URL}api/admins/getDonations`) 
        
        dispatch({
            type: GET_DONATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message

            dispatch({
                type: GET_DONATIONS_FAIL,
                payload: message
            })
        }
    }
    
    export const deleteDonationHandler = (id) => async (dispatch) => {
        try {
            dispatch({
            type: DELETE_DONATION_REQUEST
        })
        
        const { data } = await axios.delete(`${URL}api/admins/deleteDonation/${id}`)
        
        dispatch({
            type: DELETE_DONATION_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: DELETE_DONATION_FAIL,
            payload: message,
        })
    }
}

export const updateBeenInterviewed = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HAS_BEEN_INTERVIEWED_REQUEST
        })
        
        const { data } = await axios.put(`${URL}api/admins/hasBeenInterviewed/${id}`)
        
        dispatch({
            type: HAS_BEEN_INTERVIEWED_SUCCESS,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            
            dispatch({
                type: HAS_BEEN_INTERVIEWED_FAIL,
                payload: message,
            })
        }
    }
    
export const receivedDonation = (id, proofOfDonation) => async (dispatch) => {
    try {
        dispatch({
            type: RECEIVED_DONATION_REQUEST
        })
        
        const { data } = await axios.put(`${URL}api/admins/updateReceivedDonation/${id}`, { proofOfDonation })
        
        dispatch({
            type: RECEIVED_DONATION_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: RECEIVED_DONATION_FAIL,
            payload: message
        })
    }
}

export const addToInventory = (dataItems, donatedBy, email, contactNo, donatedByPicture, dateOfDonation, proofOfDonation, received, donationId) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_TO_INVENTORY_REQUEST
        })
        
        const { data } = await axios.post(`${URL}api/admins/addToDonationInventory`, { dataItems, donatedBy, email, contactNo, donatedByPicture, dateOfDonation, proofOfDonation, received, donationId })
        
        dispatch({
            type: ADD_TO_INVENTORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: ADD_TO_INVENTORY_FAIL,
            payload: message
        })
    }
}

export const getDonationInventory = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_INVENTORY_REQUEST
        })
        
        const { data } = await axios.get(`${URL}api/admins/getDonationInventory`)
        
        dispatch({
            type: GET_INVENTORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_INVENTORY_FAIL,
            payload: message
        })    
    }
}

export const getFeedbacks = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_FEEDBACKS_REQUEST
        })

        const { data } = await axios.get(`${URL}api/admins/getFeedbacks`)
        
        dispatch({
            type: GET_FEEDBACKS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
                ? error.response.data.message
                : error.message
                
                dispatch({
                    type: GET_FEEDBACKS_FAIL,
                    payload: message
                })   
            }
        }
        
export const deleteFeedback = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_FEEDBACK_REQUEST,
        })

        const { data } = await axios.delete(`${URL}api/admins/getFeedback/${id}`)

        dispatch({
            type: DELETE_FEEDBACK_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: DELETE_FEEDBACK_FAIL,
            payload: message
        })
    }
}

export const feedbackHasBeenRead = (id, profilePicture, message, email) => async (dispatch) => {
    try {
        dispatch({
            type: FEEDBACK_VIEWED_REQUEST
        })
        
        const { data } = await axios.put(`${URL}api/admins/feedBackRead/${id}`, { profilePicture, message, email })
        
        dispatch({
            type: FEEDBACK_VIEWED_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message

        dispatch({
            type: FEEDBACK_VIEWED_FAIL,
            payload: message
        })
    }
}

export const getPendingRegistrations = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PENDING_PETS_REQUEST,
        })

        const { data } = await axios.get(`${URL}api/admins/pendingRegistrations`)
        
        dispatch({
            type: GET_PENDING_PETS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_PENDING_PETS_FAIL,
            payload: message
        })
    }
}

export const getRegisteredPets = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_REGISTERED_PETS_REQUEST,
        })
        
        const { data } = await axios.get(`${URL}api/admins/getRegisteredPets`)
        
        dispatch({
            type: GET_REGISTERED_PETS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
                : error.message

                dispatch({
                    type: GET_REGISTERED_PETS_FAIL,
                    payload: message
                })
            }
        }
        
export const getNotRegisteredPets = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_NOTREGISTERED_PETS_REQUEST,
        })
        
        const { data } = await axios.get(`${URL}api/admins/getNotRegisteredPets`)
        
        dispatch({
            type: GET_NOTREGISTERED_PETS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: GET_NOTREGISTERED_PETS_FAIL,
            payload: message
        })        
    }
}

export const deleteRegistration = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REGISTRATION_REQUEST
        })
        
        const { data } = await axios.delete(`${URL}api/admins/deleteRegistration/${id}`)

        dispatch({
            type: DELETE_REGISTRATION_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: DELETE_REGISTRATION_FAIL,
            payload: message
        })        
    }
}

export const updateRequirements = (id, regFeeComplete, certOfResidencyComplete, ownerPictureComplete, petPhotoComplete, proofOfAntiRabiesComplete, photocopyCertOfAntiRabiesComplete) => async (dispatch) => {
    try {
        dispatch({
            type: SAVE_REQUIREMENTS_REQUEST,
        })
        
        const { data } = await axios.put(`${URL}api/admins/updateRequirements/${id}`, { regFeeComplete, certOfResidencyComplete, ownerPictureComplete, petPhotoComplete, proofOfAntiRabiesComplete, photocopyCertOfAntiRabiesComplete })
        
        dispatch({
            type: SAVE_REQUIREMENTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
        dispatch({
            type: SAVE_REQUIREMENTS_FAIL,
            payload: message
        })  
    }
}

export const rejectRegistration = (id) => async (dispatch) => {
    try {
        dispatch({
            type: REJECT_REGISTRATION_REQUEST
        })

        const { data } = await axios.put(`${URL}api/admins/rejectRegistration/${id}`)
        
        dispatch({
            type: REJECT_REGISTRATION_SUCCESS
        })
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message

        dispatch({
            type: REJECT_REGISTRATION_FAIL,
            payload: message
        }) 
    }
}

export const registerAnimal = (id) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_ANIMAL_REQUEST,
        })

        const { data } = await axios.put(`${URL}api/admins/registerAnimal/${id}`)

        dispatch({
            type: REGISTER_ANIMAL_SUCCESS,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: REGISTER_ANIMAL_FAIL,
            payload: message
        })
    }
} 

export const disableAdmin = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DISABLE_ADMIN_REQUEST,
        })

        const { data } = await axios.put(`${URL}api/admins/disableAdmin/${id}`)

        dispatch({
            type: DISABLE_ADMIN_SUCCESS
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: DISABLE_ADMIN_FAIL,
            payload: message
        })
    }
}

export const enableAdmin = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ENABLE_ADMIN_REQUEST,
        })

        const { data } = await axios.put(`${URL}api/admins/enableAdmin/${id}`)

        dispatch({
            type: ENABLE_ADMIN_SUCCESS
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: ENABLE_ADMIN_FAIL,
            payload: message
        })
    }
}

export const updateAdmin = (id, fullName, email, contactNo, address, jobPosition, role, profilePicture) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_ADMIN_REQUEST
        })

        const { data } = await axios.put(`${URL}api/admins/updateAdmin/${id}`, { fullName, email, contactNo, address, jobPosition, role, profilePicture })

        dispatch({
            type: UPDATE_ADMIN_SUCCESS,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: UPDATE_ADMIN_FAIL,
            payload: message
        })
    }
}

export const animalCaptured = (id, email) => async (dispatch) => {
    try {
        dispatch({
            type: ANIMAL_CAPTURED_REQUEST
        })

        const { data } = await axios.put(`${URL}api/admins/animalCaptured/${id}`, { email })

        dispatch({
            type: ANIMAL_CAPTURED_SUCCESS
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: ANIMAL_CAPTURED_FAIL,
            payload: message
        })
    }
}

export const toggleMenuOff = () => async (dispatch) => {
    dispatch({ type: TOGGLE_MENU_OFF })
}

export const toggleMenuOn = () => async (dispatch) => {
    dispatch({ type: TOGGLE_MENU_ON })
}