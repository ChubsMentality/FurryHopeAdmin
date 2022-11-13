import React, { useState, useEffect, useRef } from 'react'
import '../css/Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/adminActions'
import { gsap, Power1, Power3, Power2, Bounce } from 'gsap'
import logoBlack from '../assets/Login/logo-black.svg'
import logoWhite from '../assets/Sidebar/logo-white.svg'
import Overlay from './SubComponents/Overlay'
import ForgotPassword from './Modals/ForgotPassword'

const Login = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modal, setModal] = useState(false)
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'


    console.log(window.screen.availWidth)

    // To call adminActions
    const dispatch = useDispatch();

    // To access the state
    const adminLogin = useSelector((state) => state.adminLogin);
    const { loading, error, adminInfo } = adminLogin;

    // Animations
    const formRef = useRef()
    const rightLogo = useRef()
    const rightSubHead = useRef()
    const rightSub = useRef()
    const tagline = useRef()

    const toggleModal = () => {
        setModal(!modal)
    }

    // When the user attempts to login, it will call the login function in adminActions.js that will authenticate the admin,
    // and if it's successfull it will store the admin credentials to the local storage
    const submitHandler = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('Enter your login credentials')
        }
        // To login the admin, uses the login function in adminActions.js
        dispatch(login(email, password));

        if(error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {
        // if there's data inside the local storage push to the dashboard
        if(adminInfo) {
            history.push('/manage')
        } 
    }, [history, adminInfo]);

    useEffect(() => {
        gsap.from(formRef.current, { opacity: 0, y: -60, delay: .75, ease: Power3.in })
        gsap.from(rightSubHead.current, { opacity: 0, x: -50, delay: 1.25, ease: Power1.out })
        gsap.from(rightSub.current, { opacity: 0, x: -50, delay: 1.3, ease: Power1.out })
        gsap.from(rightLogo.current, { opacity: 0, y: -60, delay: 1.25, ease: Power2.in })
        gsap.from(tagline.current, { opacity: 0, x: -50, delay: 1.35, ease: Power1.out })
    }, [])

    return (
        <div className='loginBody'>
            <div className='loginLeft'>
                {window.innerWidth <= 768 &&
                    <div
                        style={{
                            height: '100vh',
                            width: '100vw',
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, .45)',
                            zIndex: 5,
                        }}
                    >
                    </div>
                }

                <form className='loginForm' onSubmit={submitHandler} ref={formRef}>
                    <div className="loginFormHeaderContainer">
                        <img src={logoBlack} className="loginFormHeaderImg" />
                        <p className="loginFormHeader">WELCOME BACK</p>
                    </div>

                    <label htmlFor="email" className="loginLabel loginEmail">Email</label>
                    <input name='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="loginInput loginInputEmail" />

                    <label htmlFor="password" className="loginLabel loginPassword">Password</label>
                    <input name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="loginInput loginInputEmail" />

                    <p className="loginForgotPwdLink" onClick={() => toggleModal()}>Forgot Password?</p>

                    <input type="submit" value="LOGIN" className="loginSubmitBtn" />
                </form>
            </div>

            <div className='loginRight'>
                <div className="loginGradient"></div>
                <div className="loginOverlay"></div>
                <div className="loginRightHeaderContainer" ref={rightLogo}>
                    <img src={logoWhite} className="loginRightImg" />
                </div>

                <p className="loginRightSubHeader" ref={rightSubHead}>ADOPT</p>
                <p className="loginRightSub" ref={rightSub}>DON'T SHOP</p>

                <p className="loginTagline" ref={tagline}>MARIKINA VETERINARY OFFICE</p>
            </div>

            {modal && <ForgotPassword modal={modal} toggleModal={toggleModal}/>}
            {modal && <Overlay />}
        </div>
    )
}

export default Login;

/*
*/