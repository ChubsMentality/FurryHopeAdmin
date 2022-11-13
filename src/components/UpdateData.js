import React, { useState } from 'react'
import { toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { BiMenuAltRight } from 'react-icons/bi'
import AdoptionHistory from './SubComponents/AdoptionHistory'
import UpdateInfoForm from './SubComponents/UpdateInfoForm'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import '../css/UpdateData.css'

const UpdateData = ({ match }) => {
    const dispatch = useDispatch()
    const [currentTab, setCurrentTab] = useState("update")
    const activeTabIsUpdate = currentTab === "update" 

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState
    
    const switchToAdoptionHistory = () => {
        setCurrentTab('history')
    }

    const switchToUpdateInfo = () => {
        setCurrentTab('update')
    }

    return (
        <div className="body-update">
            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className='update-content'>
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <Link to='/manage' className="update-back-btn">
                    <IoArrowBack className='update-back-icon' />
                    <p className="update-back-txt">Back</p>
                </Link>
                
                <div className="update-container">
                    <div className="tabPages-container">
                        {activeTabIsUpdate ?
                            <>
                                <button className="update-active-tab update-tab" onClick={() => switchToUpdateInfo()}>Update Info</button>
                                <button className="update-inactive-tab update-tab" onClick={() => switchToAdoptionHistory()}>Adoption History</button>
                            </>
                            :
                            <>
                                <button className="update-inactive-tab update-tab" onClick={() => switchToUpdateInfo()}>Update Info</button>
                                <button className="update-active-tab update-tab" onClick={() => switchToAdoptionHistory()}>Adoption History</button>
                            </>
                        }
                    </div>

                    {activeTabIsUpdate ?
                        <UpdateInfoForm
                            paramId={match.params.id}
                        />
                        :
                        <AdoptionHistory
                            paramId={match.params.id} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdateData;
