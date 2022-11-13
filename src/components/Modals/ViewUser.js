import React, { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import '../../css/ViewUser.css'

const ViewUser = (props) => {
    const [user, setUser] = useState()
    const [animalPreference, setAnimalPreference] = useState()
    const [sizePreference, setSizePreference] = useState()
    const [genderPreference, setGenderPreference] = useState()
    const [colorPreferences, setColorPreferences] = useState()
    const [breedPreferences, setBreedPreferences] = useState()
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    const getUser = async () => {
        try {
            const { data } = await axios.get(`${URL}api/users/getUserById/${props.id}`)
            setUser(data)
            setAnimalPreference(data.animalPreference)
            setSizePreference(data.sizePreference)
            setGenderPreference(data.genderPreference)
            setBreedPreferences(data.breedPreferences)
            setColorPreferences(data.colorPreferences)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    user && console.log(user)

    return (
        <div className='viewUser-modal'>
            <IoClose className='viewUser-closeModal' color='#111' onClick={() => props.toggleModal()}/>
            <div className="viewUser-left">
                <div className="viewUser-profContainer">
                    <img src={user && user.profilePicture} alt="User's Profile Picture" className="viewUser-profilePic" />

                    <div className="viewUser-userInfo-container">
                        <p className="userInfo-name">{user && user.fullName}</p>
                        <p className="userInfo-id">ID:
                            <span>{user && user._id}</span>
                        </p>
                    </div>
                </div>

                <p className="userInfo-label">Email:
                    <span className="userInfo-value">{user && user.email}</span>
                </p>

                <p className="userInfo-label">Contact Number:
                    <span className="userInfo-value">{user && user.contactNo}</span>
                </p>

                <p className="userInfo-label">Verified:
                    {user && user.verified === true ?
                        <span className="userInfo-value userInfo-verified-true">Verified</span>
                        :
                        <span className="userInfo-value userInfo-verified-false">Not Verified</span>
                    }
                </p>

                <p className="userInfo-label-address">Address</p>
                <div className="userInfo-value-address">{user && user.address}</div>
            </div>

            <div className="viewUser-right">
                <p className="viewUser-right-header">Preferences</p>

                <p className="userInfo-label-right">Animal:
                    <span className="userInfo-value-right">{animalPreference}</span>
                </p>

                <p className="userInfo-label-right">Gender:
                    <span className="userInfo-value-right">{genderPreference}</span>
                </p>

                <p className="userInfo-label-right">Size:
                    <span className="userInfo-value-right">{sizePreference}</span>
                </p>

                <p className="userInfo-pref">Breeds</p>
                <div className="breedsPrefContainer">
                    {breedPreferences && breedPreferences.map((breed) => (
                        <p className='breedPrefItem'>{breed}</p>
                    ))}
                </div>

                <p className="userInfo-pref">Colors</p>
                <div className="colorsPrefContainer">
                    {colorPreferences && colorPreferences.map((color) => (
                        <p className='colorPrefItem'>{color}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
{/* <button className="viewUser-close" onClick={() => props.toggleModal()}>CLOSE</button> */}

export default ViewUser