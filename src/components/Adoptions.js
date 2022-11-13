import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdoptionApplications, deleteAdoptionApplication, toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiMenuAltRight } from 'react-icons/bi'
import { sortArray } from './SubComponents/QuickSortArrOfObjs'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import '../css/Adoptions.css'

const Adoptions = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const adminState = useSelector((state) => state.adminLogin)
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'
    const { adminInfo } = adminState

    const [pending, setPending] = useState()
    const [cancelled, setCancelled] = useState()
    const [sortBy, setSortBy] = useState('applicantName')
    const [rejected, setRejected] = useState()
    const [accepted, setAccepted] = useState()
    const [listOfAdoptions, setListOfAdoptions] = useState()
    const [filterBy, setFilterBy] = useState('No Filter')

    const adoptionState = useSelector(state => state.adoptionApplications)
    const { adoptionApplications } = adoptionState

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState

    useEffect(() => {
        dispatch(getAdoptionApplications())
    }, [dispatch])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteAdoptionApplication(id))
        } 
    }

    const filterPending = (arr) => {
        return arr.applicationStatus === 'Pending'
    }

    const filterRejected = (arr) => {
        return arr.applicationStatus === 'Rejected'
    }

    const filterAccepted = (arr) => {
        return arr.applicationStatus === 'Accepted'
    }

    const filterCancelled = (arr) => {
        return arr.applicationStatus === 'Cancelled'
    }

    useEffect(() => {
        adoptionApplications && setPending(adoptionApplications.filter(filterPending))
        adoptionApplications && setRejected(adoptionApplications.filter(filterRejected))
        adoptionApplications && setAccepted(adoptionApplications.filter(filterAccepted))
        adoptionApplications && setCancelled(adoptionApplications.filter(filterCancelled))

        if(filterBy === 'No Filter') {
            setListOfAdoptions(adoptionApplications)
        } else if(filterBy === 'Pending') {
            setListOfAdoptions(pending)
        } else if(filterBy === 'Rejected') {
            setListOfAdoptions(rejected)
        } else if(filterBy === 'Accepted') {
            setListOfAdoptions(accepted)
        } else if(filterBy === 'Cancelled') {
            setListOfAdoptions(cancelled)
        }

        if(sortBy === 'applicantName') {
            setListOfAdoptions(prevState => sortArray(prevState, 0, prevState.length - 1, 'applicantName'))
        } else if(sortBy === 'animalName') {
            setListOfAdoptions(prevState => sortArray(prevState, 0, prevState.length - 1, 'animalName'))
        } else if(sortBy === 'animalBreed') {
            setListOfAdoptions(prevState => sortArray(prevState, 0, prevState.length - 1, 'animalBreed'))
        } else if(sortBy === 'status') {
            setListOfAdoptions(prevState => sortArray(prevState, 0, prevState.length - 1, 'applicationStatus'))
        }
    }, [filterBy, sortBy])

    const PaginatedAdoptions = ({ currentAdoptions }) => {
        return (
            <>
                {currentAdoptions && currentAdoptions.filter((adoption) => {
                    if(searchQuery === '') {
                        return adoption
                    } else if(adoption.applicantName.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return adoption
                    }

                }).map((adoption) => (
                    <div className="adoptionContainer" key={adoption._id}>
                        <div className="applicantContainer adoptionContainerColumn">
                            <img src={adoption.applicantImg} alt="Applicant's Picture" className="adoptionApplicantImg" />
                            <p className="adoptionApplicantName">{adoption.applicantName}</p>
                        </div>

                        <div className="applyingForContainer adoptionContainerColumn">
                            <img src={adoption.animalImg} alt="Animal's Picture" className="adoptionAnimalImg" />
                            <div className="applyingForAnimalDetails">
                                <p className="adoptionAnimalName">{adoption.animalName}</p>
                                <p className="adoptionAnimalBreed">{adoption.animalBreed}</p>
                            </div>
                        </div>

                        <div className="adoptionStatusContainer adoptionContainerColumn">
                            {adoption.applicationStatus === 'Pending' &&
                                <p className="currentAdoptionStatusPending">{adoption.applicationStatus}</p>
                            }

                            {adoption.applicationStatus === 'Rejected' &&
                                <p className="currentAdoptionStatusRejected">{adoption.applicationStatus}</p>
                            }

                            {adoption.applicationStatus === 'Cancelled' &&
                                <p className="currentAdoptionStatusRejected">{adoption.applicationStatus}</p>
                            }

                            {adoption.applicationStatus === 'Accepted' &&
                                <p className="currentAdoptionStatusAccepted">{adoption.applicationStatus}</p>
                            }
                        </div>

                        <div className="adoptionContainerBtns adoptionContainerColumn">
                            <Link style={{ textDecoration: 'none' }} to={`adoption/${adoption._id}`}>
                                <p className='adoptionViewBtn'>View Details</p>
                            </Link>

                            {adminInfo && adminInfo.role === 'Admin' ?
                                <button className='adoptionsDeleteBtn' onClick={() => deleteHandler(adoption._id)}>
                                    <MdDelete className='adoptionsDeleteBtnTxt' color='red' />
                                </button>
                                :
                                <button className='adoptionsDeleteBtn' onClick={() => alert(`You're not allowed / authorized to perform this action.`)}>
                                    <MdDelete className='adoptionsDeleteBtnTxt' color='#808080' />
                                </button>

                            }
                        </div>
                    </div> 
                ))}
            </>
        )
    }

    const PaginatedData = ({ adoptionsPerPage }) => {
        const [currentAdoptions, setCurrentAdoptions] = useState()
        const [pageCount, setPageCount] = useState(0)
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            const endOffset = itemOffset + adoptionsPerPage
            listOfAdoptions && setCurrentAdoptions(listOfAdoptions.slice(itemOffset, endOffset))
            listOfAdoptions && setPageCount(Math.ceil(listOfAdoptions.length / adoptionsPerPage))
        }, [itemOffset, adoptionsPerPage])

        const handlePageClick = (event) => {
            const newOffSet = (event.selected * adoptionsPerPage) % listOfAdoptions.length
            setItemOffset(newOffSet)
        }

        return (
            <>
                <PaginatedAdoptions currentAdoptions={currentAdoptions} />
                <ReactPaginate
                    activeClassName='active-li'
                    activeLinkClassName='active-a'
                    className='pagination-container'
                    pageClassName='pagination-page-li'
                    pageLinkClassName='pagination-link-a'
                    nextClassName='next-li'
                    nextLinkClassName='next-a'
                    previousClassName='prev-li'
                    previousLinkClassName='prev-a'
                    breakClassName='page-break-li'
                    breakLinkClassName='page-break-a'
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

    return (
        <div className='adoptionsAdmin-body'>
            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className="adoptionsAdmin-content">
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <div className="adoptionsAdmin-header-container">
                    <h1 className="adoptionsAdmin-header">LIST OF ADOPTIONS</h1>

                    <div className="adoptionsAdmin-adminInfo">
                        <div className="adoptionsAdmin-adminInfo-left">
                            <h3 className="adoptionsAdmin-adminInfo-name">{adminInfo.fullName}</h3>
                            <p className="adoptionsAdmin-adminInfo-jobPos">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="Admin's Profile Picture" className="adoptionsAdmin-adminProfilePic" />
                    </div>
                </div>

                <div className="adoptionsAdmin-container">
                    <div className="adoptionsAdmin-subHeader">
                        <div className="manage-searchContainer">
                            <AiOutlineSearch className='manage-searchIcon' color='#111' />
                            <input type="text" className="manage-searchTxt" placeholder='Enter name of applicant' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>

                        <div className="adoptionsAdmin-right">
                            <div className="manage-filter-animals">
                                <p className="manage-filter-txt">Sort By</p>
                                <select className='manage-select' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value='applicantName'>Applicant's Name</option>
                                    <option value='animalName'>Animal's Name</option>
                                    <option value='animalBreed'>Animal's Breed</option>
                                    <option value='status'>Status</option>
                                </select>
                            </div>

                            <div className="manage-filter-animals">
                                <p className="manage-filter-txt">Filter</p>
                                <select className='manage-select' value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                                    <option value='No Filter'>No Filter</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Rejected'>Rejected</option>
                                    <option value='Accepted'>Accepted</option>
                                    <option value='Cancelled'>Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="adoptionsAdmin-table-container">
                        <div className="adoptionsAdmin-table-headings">
                            <p className="adoptionsAdmin-label adoptionsAdmin-label-applicant">Applicant</p>
                            <p className="adoptionsAdmin-label adoptionsAdmin-label-applyingFor">Applying For</p>
                            <p className="adoptionsAdmin-label adoptionsAdmin-label-status">Status</p>
                            <p className="adoptionsAdmin-label adoptionsAdmin-label-actions">Actions</p>
                        </div>
                    </div>

                    <PaginatedData adoptionsPerPage={5} />
                </div>
            </div>
        </div>  
    )
}
export default Adoptions