import React from "react"
import "../css/Sidebar.css"
import { NavLink, Link , useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, toggleMenuOff } from "../actions/adminActions"
import { VscListUnordered } from 'react-icons/vsc'
import { MdAddBox } from 'react-icons/md'
import { IoPersonSharp, IoClose } from 'react-icons/io5'
import { BiDonateHeart } from 'react-icons/bi'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { AiFillAlert } from 'react-icons/ai'
import { MdPets } from 'react-icons/md'
import { VscFeedback } from 'react-icons/vsc'
import logo from "../assets/Sidebar/logo-black.svg"

const Sidebar = () => {
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'
    const dispatch = useDispatch()
    const history = useHistory()

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    const logoutHandler = () => {
        dispatch(logout())
        history.push("/")
    }

    return (
        <div className='sidebar-body'>
            <div>
                {window.innerWidth <= 768 &&
                    <IoClose className='sidebar-toggle-close' color='#111' onClick={() => dispatch(toggleMenuOff())}/>
                }

                <NavLink to='/manage' className='sidebar-header'>
                    <img src={logo} className='sidebar-logo' />
                    <h5 className='sidebar-furryhope'>
                        FURRYHOPE<sup className='sidebar-sup'>ADMIN</sup>
                    </h5>
                </NavLink>
                <p className='sidebar-tagline'>ADOPT, DON'T SHOP</p>

                <div className='sidebar-links'>
                    <ul>
                        <li className='sidebar-li'>
                            <NavLink to='/manage' className='sidebar-a'>
                                <VscListUnordered className="sidebar-icons" />
                                Animals
                            </NavLink>
                        </li>
                        {/* <li className='sidebar-li'>
                            <NavLink to='/add' className='sidebar-a'>
                                <MdAddBox className="sidebar-icons" />
                                Add An Animal
                            </NavLink>
                        </li> */}
                        <li className='sidebar-li'>
                            <NavLink to='/accountsList' className='sidebar-a'>
                                <IoPersonSharp className="sidebar-icons" />
                                List of Accounts
                            </NavLink>
                        </li>
                        {/* <li className='sidebar-li'>
                            <Link to='/adoptions' className='sidebar-a'>
                                <img
                                    src={adoptIcon}
                                    className='sidebar-icons adopt-icon'
                                />
                                Adoption Applications
                            </Link>
                        </li> */}
                        <li className='sidebar-li'>
                            <NavLink to='/adoptions' className='sidebar-a'>
                                <MdPets className="sidebar-icons" />
                                Adoptions
                            </NavLink>
                        </li>
                        <li className='sidebar-li'>
                            <NavLink to='/animalRegistration' className='sidebar-a'>
                                <MdPets className="sidebar-icons" />
                                Animal Registrations
                            </NavLink>
                        </li>
                        <li className='sidebar-li'>
                            <NavLink to='/reports' className='sidebar-a'>
                                <AiFillAlert className="sidebar-icons" />
                                Stray Animal Reports
                            </NavLink>
                        </li>
                        
                        <li className='sidebar-li'>
                            <NavLink to='/donations' className='sidebar-a'>
                                <BiDonateHeart className="sidebar-icons" />
                                Donations
                            </NavLink>
                        </li>

                        <li className='sidebar-li'>
                            <NavLink to='/feedbacks' className='sidebar-a'>
                                <VscFeedback className="sidebar-icons" />
                                User Feedback
                            </NavLink>
                        </li>

                        <li className='sidebar-li' onClick={() => logoutHandler()}>
                            <button className='sidebar-a sidebar-a-logout'>
                                <RiLogoutBoxLine className="sidebar-icons" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <div className='sidebar-footer'>
                <div className='sidebar-account-details'>
                    <p className='sidebar-admin-username'>
                        {adminInfo.username}
                    </p>
                    <p className='sidebar-admin-name'>{adminInfo.name}</p>
                </div>
               
            </div> */}
        </div>
    )
}

export default Sidebar
