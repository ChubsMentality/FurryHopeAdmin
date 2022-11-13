import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import '../../css/ForgotPwdModal.css'
import axios from 'axios'

const ForgotPassword = (props) => {
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'
    const [email, setEmail] = useState()

    const sendResetPwd = async () => {
        if(!email) {
            alert('Please enter your email.')
            return
        }

        try {
            const { data } = await axios.post(`${URL}api/admins/sendResetPassword`, { email })
            console.log(data.message)
            alert('Check your email for the link')
        } catch (error) {
            console.log(error)            
        }
    }

    return (
        <div className="forgotPwdModal">
            <IoClose className='forgotPwdModal-close' color='#111' onClick={() => props.toggleModal()} />

            <div className="forgotPwdContainer">
                <p className="forgotPwdHeader">Forgot Your Password?</p>
                <p className="forgotPwdSubHeader">Don't Worry, Just enter your email.</p>

                <label htmlFor="email" className="forgotPwdLabel">Email</label>
                <input type="email" name="email" className='forgotPwdInput' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}  />

                <button className="forgotPwdSubmitBtn" onClick={() => sendResetPwd()}>Reset Password</button>
            </div>
        </div>
    )
}

export default ForgotPassword