import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdoptionApplication, getAdoptionApplications, updateAdoptionApplication } from '../actions/adminActions'
import ReactPaginate from 'react-paginate'
import Sidebar from './Sidebar'
import Empty from './SubComponents/EmptyAdoptions'
import Loading from './SubComponents/Loading'
import closeModalIcon from '../assets/Icons/close-modal.svg'
import deleteIcon from '../assets/Buttons/delete-icon.svg'
import axios from 'axios'
import '../css/AdoptionApplications.css'
import EmptyAdoptions from './SubComponents/EmptyAdoptions'

const AdoptionApplications = () => {
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'
    const dispatch = useDispatch()
    const applications = useSelector(state => state.adoptionApplications)
    const { adoptionApplications, loading } = applications

    const deleteAdoption = useSelector(state => state.adoptionDelete)
    const { success: successDelete } = deleteAdoption

    const updateAdoption = useSelector(state => state.adoptionUpdate)
    const { success: successUpdate } = updateAdoption

    useEffect(() => {
        dispatch(getAdoptionApplications())
    }, [dispatch, successDelete, successUpdate])

    const [modalVisible, setModalVisible] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [applicationData, setApplicationData] = useState()
    const [currentStatus, setCurrentStatus] = useState('Pending')
    const [isNotPending, setIsNotPending] = useState()

    /*
    useEffect(() => {
        let isNotPending = false 

        if (applicationData.applicationStatus !== 'Pending') {
            isNotPending = true
        }
    }, [dispatch, successDelete, successUpdate])
    */


    const openModal = async (id) => {
        try {
            const { data } = await axios.get(`${URL}api/admins/adoptions/${id}`)
            console.log(data)
            setApplicationData(data)
        } catch (error) {
            console.log(error)
            alert(error)
        }

        setOverlay(true)
        setModalVisible(true)
    }

    const closeModal = () => {
        setOverlay(false)
        setModalVisible(false)
    }

    const deleteAdoptionHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteAdoptionApplication(id))
        }
    }

    const acceptAdoption = () => {
        const adoptionStatus = 'Adopted'
        const applicationStatus = 'Accepted'
        const animalId = applicationData.animalId
        const adoptionId = applicationData._id

        dispatch(updateAdoptionApplication(animalId, adoptionId, adoptionStatus, applicationStatus))

    }

    const rejectAdoption = () => {
        const adoptionStatus = 'Not Adopted'
        const applicationStatus = 'Rejected'
        const animalId = applicationData.animalId
        const adoptionId = applicationData._id

        dispatch(updateAdoptionApplication(animalId, adoptionId, adoptionStatus, applicationStatus))
    }

    const filterPending = (arr) => {
        return arr.applicationStatus === 'Pending'
    }

    const filterAccepted = (arr) => {
        return arr.applicationStatus === 'Accepted'
    }

    const filterRejected = (arr) => {
        return arr.applicationStatus === 'Rejected'
    }

    // Pagination
    const DataContainer = ({ currentAdoptions }) => {
        return (
            <div>
                {currentAdoptions &&
                    currentAdoptions.length ?
                        currentAdoptions.map((adoption) => (
                            <div className='application-body' key={adoption._id}>
                                <div className='application-info'>
                                    <p className='application-label'>Adopter's Name: <span className='application-value'>{adoption.adopterName}</span></p>
                                    <p className='application-label'>Animal's Name: <span className='application-value'>{adoption.animalName}</span></p>
                                    <p className='application-label'>Animal's Breed: <span className='application-value'>{adoption.animalBreed}</span></p>
                                    <p className='application-label'>Animal Type: <span className='application-value'>{adoption.animalType}</span></p>
                                    <p className='application-label'>Application Status: <span className='application-value'>{adoption.applicationStatus}</span></p>
                                </div>

                                <div className='application-action'>
                                    <button className='view-application-btn' onClick={() => openModal(adoption._id)}>VIEW</button>
                                    <button className='delete-application-btn' onClick={() => deleteAdoptionHandler(adoption._id)}>
                                        <img src={deleteIcon} className='delete-application-icon' />
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        ))
                    :
                    <p  style={{
                            fontSize: '3rem',
                            fontWeight: '300',
                            marginTop: '120px',
                            textAlign: 'center',
                        }}>
                        There are currently no <br /> adoption applications.
                    </p>
                }
            </div>
        )
    }

    const PaginatedData = ({ adoptionsPerPage }) => {
        const pending = adoptionApplications.filter(filterPending)
        const accepted = adoptionApplications.filter(filterAccepted)
        const rejected = adoptionApplications.filter(filterRejected)

        let toggledStatus = pending

        if (currentStatus === 'Accepted') {
            toggledStatus = accepted
        } else if (currentStatus === 'Rejected') {
            toggledStatus = rejected
        } else {
            toggledStatus = pending
        }

        // We start with an empty list of items.
        const [currentAdoptions, setCurrentAdoptions] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + adoptionsPerPage
            console.log(`Loading adoptions from ${itemOffset} to ${endOffset}`)
            setCurrentAdoptions(toggledStatus.slice(itemOffset, endOffset))
            setPageCount(Math.ceil(toggledStatus.length / adoptionsPerPage))
        }, [itemOffset, adoptionsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * adoptionsPerPage) % adoptionApplications.length;
            console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <DataContainer currentAdoptions={currentAdoptions} />
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
        <div className='adoptions-body'>
            <Sidebar />
            <div className='adoptions-content'>
                <p className='adoptions-header'>ADOPTION APPLICATIONS</p>

                {adoptionApplications &&
                    <div className='adoptions-subHeader'>
                        <p className='adoptions-count'>Adoptions({adoptionApplications.length})</p>

                        <div className='adoptions-select-status'>
                            <label className='adoptions-label-status'>Status</label>
                            <select className='adoptions-select-status' value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                                <option value='Pending' defaultValue>Pending</option>
                                <option value='Accepted'>Accepted</option>
                                <option value='Rejected'>Rejected</option>
                            </select>
                        </div>
                    </div>
                }

                {adoptionApplications && !adoptionApplications.length ?
                    <Empty />
                    :
                    adoptionApplications ?
                        <div className='pagination-div'>
                            <PaginatedData adoptionsPerPage={5} />
                        </div>
                        :
                        <Loading loading={loading} />
                }
            </div>

            {modalVisible &&
                <div className='adoption-modal-body'>
                    <img className='adoption-close-modal' src={closeModalIcon} onClick={() => closeModal()} />
                    <h1 className='adoption-modal-header'>ADOPTION APPLICATION</h1>
                    <p className='adoption-modal-id'>ID: {applicationData._id}</p>
                    <p className='adoption-modal-date'>Date: <span className='adoption-modal-value'>{applicationData.date}</span></p>
                    
                    <p className='adopter-information-header'>Adopter's Information</p>
                    <p className='adoption-modal-label'>
                        Adopter's Name:
                        <span className='adoption-modal-value'>{applicationData.adopterName}</span>
                    </p>

                    <p className='adoption-modal-label'>
                        Contact Number:
                        <span className='adoption-modal-value'>{applicationData.contactNo}</span>
                    </p>

                    <p className='adoption-modal-label'>Address:</p>
                    <p className='adoption-modal-address'>{applicationData.address}</p>

                    <p className='animal-data-header'>Animal's Information</p>
                    <p className='adoption-modal-label'>
                        Animal's Name:
                        <span className='adoption-modal-value'>{applicationData.animalName}</span>
                    </p>

                    <p className='adoption-modal-label'>
                        Animal's Breed:
                        <span className='adoption-modal-value'>{applicationData.animalBreed}</span>
                    </p>

                    <p className='adoption-modal-label'>
                        Animal Type:
                        <span className='adoption-modal-value'>{applicationData.animalType}</span>
                    </p>

                    <p className='adoption-modal-label'>
                        Gender:
                        <span className='adoption-modal-value'>{applicationData.animalGender}</span>
                    </p>

                    <p className='adoption-modal-label'>
                        Color:
                        <span className='adoption-modal-value'>{applicationData.animalColor}</span>
                    </p>

                    {applicationData.applicationStatus === 'Accepted' || applicationData.applicationStatus === 'Rejected' ?
                        <div className='adoption-modal-btns'>
                            <button className='adoption-accept-btn-disabled' onClick={() => acceptAdoption()} disabled>ACCEPT</button>
                            <button className='adoption-reject-btn-disabled' onClick={() => rejectAdoption()} disabled>REJECT</button>
                        </div>
                        :
                        <div className='adoption-modal-btns'>
                            <button className='adoption-accept-btn' onClick={() => acceptAdoption()}>ACCEPT</button>
                            <button className='adoption-reject-btn' onClick={() => rejectAdoption()}>REJECT</button>
                        </div>

                    }
                </div>
            }

            {overlay &&
                <div className='adoption-overlay'></div>
            }
        </div>
    )
}

export default AdoptionApplications
