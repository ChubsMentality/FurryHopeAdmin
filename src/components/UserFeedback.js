import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFeedbacks, deleteFeedback, toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { BiMenuAltRight } from 'react-icons/bi'
import axios from 'axios'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import ReactPaginate from 'react-paginate'
import ViewFeedback from './Modals/ViewFeedback'
import Overlay from './SubComponents/Overlay'
import '../css/UserFeedback.css'

const UserFeedback = () => {
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'
    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    const gFeedbacks = useSelector(state => state.feedbacksState)
    const { feedbackList } = gFeedbacks
    
    const deleteFeed = useSelector(state => state.deleteFeedbackState)
    const { success:successDelete } = deleteFeed

    const beenRead = useSelector(state => state.feedbackViewedState)
    const { success:successUpdate } = beenRead

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState

    const [modal, setModal] = useState(false)
    const [feedback, setFeedback] = useState()

    const toggleFeedback = async (id) => {
        try {
            const { data } = await axios.get(`${URL}api/admins/getFeedback/${id}`)
            setFeedback(data)
            setModal(true)
        } catch (error) {
            console.log(error)
        }
    }

    const closeFeedback = () => {
        setModal(false)
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteFeedback(id))
        }
    }

    const DataContainer = ({ currentItems }) => {
        return (
            <>
                {currentItems && currentItems.map((item) => (
                    <div className="feedback-container" key={item._id}>
                        <img className="feedbackProfPic" src={item.profilePicture} />

                        <div className="feedback-info">
                            <p className="feedback-name">{item.fullName}</p>
                            <p className="feedback-txt">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nostrum quaerat? Obcaecati odio sint aliquam? Reprehenderit magni et at provident."</p>

                            <div className="feedback-subInfo">
                                <div className="feedback-rating-container">
                                    <p className='feedback-rating-txt'>Rating: <span>{item.rating} / 5</span></p>
                                </div>

                                {item.viewed === true ?
                                    <p className="feedback-viewed">Viewed</p>
                                    :
                                    <></>
                                }  
                            </div>
                        </div>

                        <div className="feedback-actions">
                            <button className='feedback-viewBtn' onClick={() => toggleFeedback(item._id)}>VIEW</button>

                            {adminInfo && adminInfo.role === 'Admin' ?
                                <button className='feedback-deleteBtn' onClick={() => deleteHandler(item._id)}>DELETE</button>
                                :
                                <button className='feedback-deleteBtn' onClick={() => alert(`You're not allowed / authorized to perform this action.`)}>DELETE</button>
                            }
                        </div>
                    </div>
                ))}
            </>
        )
    }

    const PaginatedData = ({ feedbacksPerPage }) => {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + feedbacksPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            feedbackList && setCurrentItems(feedbackList.slice(itemOffset, endOffset))
            feedbackList && setPageCount(Math.ceil(feedbackList.length / feedbacksPerPage))
        }, [itemOffset, feedbacksPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * feedbacksPerPage) % feedbackList.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <DataContainer currentItems={currentItems} />
                <ReactPaginate
                    activeClassName='active-li-feedback'
                    activeLinkClassName='active-a-feedback'
                    className='pagination-container-feedback'
                    pageClassName='pagination-page-li-feedback'
                    pageLinkClassName='pagination-link-a-feedback'
                    nextClassName='next-li-feedback'
                    nextLinkClassName='next-a-feedback'
                    previousClassName='prev-li-feedback'
                    previousLinkClassName='prev-a-feedback'
                    breakClassName='page-break-li-feedback'
                    breakLinkClassName='page-break-a-feedback'
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                />
            </>
        )
    }

    useEffect(() => {
        dispatch(getFeedbacks())
    }, [successDelete, successUpdate])

    return (
        <div className="userFeedback-body">
            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className="userFeedback-content">
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <div className="accounts-header-container">
                    <p className='accounts-header'>FEEDBACKS</p>

                    <div className="accounts-adminInfo">
                        <div className="accounts-adminInfo-left">
                            <h3 className="accounts-adminName accounts-adminInfo-label">{adminInfo && adminInfo.fullName}</h3>
                            <p className="accounts-adminPos accounts-adminInfo-label">{adminInfo && adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo && adminInfo.profilePicture} alt="admin's profile picture" className="accounts-adminProfile" />
                    </div>                    
                </div>

                <div className="userFeedbacks-container">
                    <PaginatedData feedbacksPerPage={5} />                    
                </div>
            </div>

            {modal && <Overlay />}
            {modal &&
                <ViewFeedback 
                    id={feedback._id}
                    fullName={feedback.fullName}
                    email={feedback.email}
                    message={feedback.message}
                    profilePicture={feedback.profilePicture}
                    date={feedback.date}
                    viewed={feedback.viewed}
                    rating={feedback.rating}
                    modal={modal}
                    closeFeedback={closeFeedback}
                />
            }
        </div>
    )
}

export default UserFeedback