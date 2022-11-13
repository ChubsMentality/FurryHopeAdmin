import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateAdmin } from '../../actions/adminActions'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import '../../css/EditAccounts.css'

const EditAdmin = (props) => {
    const [admin, setAdmin] = useState()
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [contactNo, setContactNo] = useState()
    const [address, setAddress] = useState()
    const [jobPosition, setJobPosition] = useState()
    const [role, setRole] = useState()
    const [profilePicture, setProfilePicture] = useState()
    const dispatch = useDispatch()
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${URL}api/admins/getAdmin/${props.id}`)
            console.log(data)
            setAdmin(data)
            setFullName(data.fullName)
            setEmail(data.email)
            setContactNo(data.contactNo)
            setAddress(data.address)
            setJobPosition(data.jobPosition)
            setRole(data.role)
            setProfilePicture(data.profilePicture)
        } catch (error) {
            console.log(error)
        }
    }

    // Function to upload the image to cloudinary
    const uploadImg = (selectedImg) => {
        if(selectedImg.type === 'image/jpeg' || selectedImg.type === 'image/png') {
            const data = new FormData()
            data.append('file', selectedImg)
            data.append('upload_preset', 'furryhopeimg')
            data.append('cloud_name', 'drvd7jh0b')
            fetch('https://api.cloudinary.com/v1_1/drvd7jh0b/image/upload', {
                method: 'post',
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                console.log(data)
                setProfilePicture(data.url.toString()) // gives us the url of the image in the cloud
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Please select an image')
        }
    }

    const updateHandler = async () => {
        try {
            dispatch(updateAdmin(props.id, fullName, email, contactNo, address, jobPosition, role, profilePicture))
            // const { data } = await axios.put(`${URL}api/admins/updateAdmin/${props.id}`, { fullName, email, contactNo, address, jobPosition, role, profilePicture })
            alert('Your changes have been saved')
            props.setEditAdmin(!props.editAdmin)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin()
    }, [props])

    const [currentStep, setCurrentStep] = useState(0)

    // FullName, email, contactNo, address, jobPosition, role
    return (
        window.innerWidth <= 430 ?
        <div className='editAdmin-modal'>
            {currentStep === 0 ?
                <div className="editAdmin-left">
                    <label htmlFor="name" className="editAdmin-label">Name</label>
                    <input type="text" name="name" className="editAdmin-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <br />

                    <label htmlFor="name" className="editAdmin-label">Email</label>
                    <input type="text" name="name" className="editAdmin-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <br />

                    <label htmlFor="name" className="editAdmin-label">Contact Number</label>
                    <input type="text" name="name" className="editAdmin-input" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />

                    <br />
                    
                    <label htmlFor="name" className="editAdmin-label">Address</label>
                    <input type="text" name="name" className="editAdmin-input" value={address} onChange={(e) => setAddress(e.target.value)} />

                    <br />

                    <label htmlFor="name" className="editAdmin-label">Job Position</label>
                    <input type="text" name="name" className="editAdmin-input" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />

                    <div className="editAdmin-left-btnContainer">
                        <button className="editAdmin-left-close" onClick={() => props.toggleModal()}>Close</button>
                        <button className="editAdmin-left-next" onClick={() => setCurrentStep(1)}>Next</button>
                    </div>
                </div>
            :
                <div className="editAdmin-right">
                    {/* <div style={{ position: 'relative' }}>
                        <IoClose className='editAdmin-closeModal' onClick={() => props.toggleModal()} />
                    </div> */}

                    {window.innerWidth <= 430 ?
                        <IoClose className='editAdmin-close-icon' onClick={() => props.toggleModal()} />
                        :
                        null
                    }

                    <label htmlFor="" className="editAdmin-label">Role</label>
                    <select className='editAdmin-select' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value='Admin'>Admin</option>
                        <option value='Staff'>Staff</option>
                    </select>

                    <label htmlFor="" className="editAdmin-label">Choose a picture</label>
                    <input type="file" name="profilePic" className="editAdmin-profPic" onChange={(e) => uploadImg(e.target.files[0])} /><br />

                    <label htmlFor="" style={{ marginTop: 10 }} className="editAdmin-label">Preview</label>
                    <img src={admin && admin.profilePicture} alt="" className="editAdmin-preview" />

                    <div className="editAdmins-btn-container">
                        <button className="editAdmin-close" onClick={() => setCurrentStep(0)}>Previous</button>
                        <button className="editAdmin-done" onClick={() => updateHandler()}>Done</button>
                    </div>
                </div>
            }

        </div>
        :
        <div className='editAdmin-modal'>
            <div className="editAdmin-left">
                <label htmlFor="name" className="editAdmin-label">Name</label>
                <input type="text" name="name" className="editAdmin-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                <br />

                <label htmlFor="name" className="editAdmin-label">Email</label>
                <input type="text" name="name" className="editAdmin-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                <br />

                <label htmlFor="name" className="editAdmin-label">Contact Number</label>
                <input type="text" name="name" className="editAdmin-input" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />

                <br />
                
                <label htmlFor="name" className="editAdmin-label">Address</label>
                <input type="text" name="name" className="editAdmin-input" value={address} onChange={(e) => setAddress(e.target.value)} />

                <br />

                <label htmlFor="name" className="editAdmin-label">Job Position</label>
                <input type="text" name="name" className="editAdmin-input" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />
            </div>

            <div className="editAdmin-right">
                {/* <div style={{ position: 'relative' }}>
                    <IoClose className='editAdmin-closeModal' onClick={() => props.toggleModal()} />
                </div> */}

                <label htmlFor="" className="editAdmin-label">Role</label>
                <select className='editAdmin-select' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value='Admin'>Admin</option>
                    <option value='Staff'>Staff</option>
                </select>

                <label htmlFor="" className="editAdmin-label">Choose a picture</label>
                <input type="file" name="profilePic" className="editAdmin-profPic" onChange={(e) => uploadImg(e.target.files[0])} /><br />

                <label htmlFor="" style={{ marginTop: 10 }} className="editAdmin-label">Preview</label>
                <img src={admin && admin.profilePicture} alt="" className="editAdmin-preview" />

                <div className="editAdmins-btn-container">
                    <button className="editAdmin-close" onClick={() => props.toggleModal()}>Close</button>
                    <button className="editAdmin-done" onClick={() => updateHandler()}>Done</button>
                </div>
            </div>
        </div>
    )
}

export default EditAdmin