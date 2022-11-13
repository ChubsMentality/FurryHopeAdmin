import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/AddAdmin.css'
import { useDispatch, useSelector } from 'react-redux'
import { addAnAdmin, toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { css } from '@emotion/css'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BiMenuAltRight } from 'react-icons/bi'
import ClipLoader from 'react-spinners/ClipLoader'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'

const override = css`
    display: block;
    border-color: white;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
`

const AddAdmin = ({ history }) => {
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    // loading state
    const [color] = useState('#111111')

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [jobPosition, setJobPosition] = useState('')
    const [role, setRole] = useState('Admin')
    const [profilePicture, setProfilePicture] = useState('https://res.cloudinary.com/drvd7jh0b/image/upload/v1650026769/tcgfy3tbaoowhjfufvob.png')

    const dispatch = useDispatch();
    const addAdmin = useSelector(state => state.addAdmin) 
    const { loading, error } = addAdmin

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState

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

    const submitAdmin = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('Passwords does not match!')
        } else if (password.search(/[0-9]/) === -1) { // Password should contain a number
            alert('Your password should contain one or more numbers')
        } else if(password.search(/[a-z]/) === -1) { // Password should contain a lowercase letter
            alert('Your password should contain lowercase letters')
        } else if(password.search(/[A-Z]/) === -1) { // Password should contain an uppercase letter
            alert('Your password should contain an uppercase letter')
        } else if(password.search(/[!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) { // Password should contain special characters
            alert('Your password should also contain special characters')
        } else if(password !== confirmPassword) {
            alert('Passwords does not match');
        } else if(contactNo.length > 11) {
            alert('Enter a valid contact number')
        } else {
            dispatch(addAnAdmin(fullName, email, contactNo, address, password, jobPosition, role, profilePicture))
            alert('Successfully created an account')
            
            setFullName('')
            setEmail('')
            setContactNo('')
            setAddress('')
            setPassword('')
            setConfirmPassword('')
            setJobPosition('')
            setRole('')
            setProfilePicture('https://res.cloudinary.com/drvd7jh0b/image/upload/v1650026769/tcgfy3tbaoowhjfufvob.png')
        }
    }

    if(error) {
        window.alert(error)
    }
    
    return ( 
        <div className="body">
            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className='add-admin-content'>
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <Link to='/accountsList' className='add-admin-header'>
                    <AiOutlineArrowLeft className='add-admin-return-icon' color='#111' />
                    <p className='add-admin-return-btn'>
                        Back
                    </p>
                </Link>
                
                {/* FullName, email, password, contactNo, address, role, jobPosition, profilePicture */}
                <form className="addAdmin-form-container" onSubmit={submitAdmin}>   
                    <div className='addAdmin-form-left'>
                        <label htmlFor="name" className="lbl-addAdmin-name lbl-add-admin">Full Name</label>
                        <input type="text" name="name" className="addAdminName input-add-admin" required value={fullName} onChange={(e) => setFullName(e.target.value)}/><br />


                        <label htmlFor="email" className="lbl-addAdmin-email lbl-add-admin">Email</label>
                        <input type="text" name="email" className="addAdminEmail input-add-admin" required value={email} onChange={(e) => setEmail(e.target.value)} /><br />


                        <label htmlFor="contactNo" className="lbl-addAdmin-contactNo lbl-add-admin">Contact Number</label>
                        <input type="number" name="contactNo" className="addAdminContactNo input-add-admin" required maxLength='11' value={contactNo} onChange={(e) => setContactNo(e.target.value)} /><br />

                        <label htmlFor="address" className="lbl-addAdmin-address lbl-add-admin">Address</label>
                        <input type="text" name="address" className="addAdminAddress input-add-admin" required value={address} onChange={(e) => setAddress(e.target.value)} /><br />

                        <label htmlFor="password" className="lbl-addAdmin-password lbl-add-admin">Password</label>
                        <input type="password" name="password" className="addAdminPassword input-add-admin" required value={password} onChange={(e) => setPassword(e.target.value)}/><br />

                        <label htmlFor="confirmpassword" className="lbl-addAdmin-confirmPassword lbl-add-admin">Confirm Password</label>
                        <input type="password" name="confirmpassword" className="addAdminPassword input-add-admin" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                    </div>

                    <div className='addAdmin-form-right'>
                        <label htmlFor="jobPosition" className="lbl-jobPosition lbl-add-admin">Job Position</label>
                        <input type="text" name="jobPosition" className="addJobPosition input-add-admin" required value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} /><br />

                        <br />

                        <label htmlFor='select-role' className='lbl-addAdmin-role lbl-add-admin'>Role</label><br />
                        <select className='add-admin-select' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value='Admin'>Admin</option>
                            <option value='Staff'>Staff</option>
                        </select>

                        <br />

                        <label htmlFor="profilePic" className="lbl-addAdmin-profilePicture lbl-add-admin">Profile Picture</label>
                        <input type="file" name="profilePic" className="input-file-profPic" onChange={(e) => uploadImg(e.target.files[0])} /><br />
                        
                        <br />

                        <p className='lbl-add-admin add-admin-img-preview'>Image Preview</p>
                        <img src={profilePicture} className='add-admin-pic-preview' />

                        <br />

                        <button className="btn-submit-admin">{loading ? <ClipLoader color={color} css={override} loading={loading} size={35} /> : <p className='submit-admin-text'>SUBMIT</p>}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin;
