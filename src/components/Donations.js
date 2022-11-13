import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonations, deleteDonationHandler, receivedDonation, addToInventory, getDonationInventory, toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { BiMenuAltRight } from 'react-icons/bi'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import '../css/Donations.css'

const Donations = () => {
    const dispatch = useDispatch()
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    const donationsList = useSelector(state => state.getDonationsState)
    const { loading, error } = donationsList

    const deleteDonation = useSelector(state => state.donationDelete)
    const { success:successDelete, error:deleteError } = deleteDonation

    const updateReceivedDonation = useSelector(state => state.receivedDonation)
    const { success:successUpdate } = updateReceivedDonation

    const getInventory = useSelector(state => state.donationInventoryState)
    const { inventoryList } = getInventory

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState

    const [notReceived, setNotReceived] = useState()
    const [received, setReceived] = useState()
    const [removedFromInventory, setRemovedFromInventory] = useState(false)
    const [isReceived, setIsReceived] = useState()
    const [activeTab, setActiveTab] = useState('Donations')
    const isDonationReceived = isReceived === 'Received'
    const isDonationsActive = activeTab === 'Donations'
    const isInventoryActive = activeTab === 'Inventory'

    const filterReceived = (arr) => {
        return arr.received === true
    }

    const filterNotReceived = (arr) => {
        return arr.received === false
    }

    const getDonations = async () => {
        try {
            const { data } = await axios.get(`${URL}api/admins/getDonations`)
            setNotReceived(data.filter(filterNotReceived))
            setReceived(data.filter(filterReceived))
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteDonationHandler(id))
        }
    }

    const toggleDonations = () => {
        setActiveTab('Donations')
    }

    const toggleInventory = () => {
        setActiveTab('Inventory')
    }
    
    useEffect(() => {
        getDonations()
        dispatch(getDonationInventory())
    }, [dispatch, successDelete, successUpdate, removedFromInventory])

    const DataContainer = ({ currentDonations }) => {
        return (
            <>
                {currentDonations && currentDonations.map((donation) => (
                    <div className='specDonation-container' key={donation._id}>
                        <div className="specDonation-donator specDonation-column">
                            <img src={donation.profilePicture} alt="" className="specDonation-image" />
                            <p className="specDonation-donator-txt">{donation.name}</p>
                        </div>

                        <div className="specDonation-email specDonation-column">
                            <p className="specDonation-email-txt">{donation.email}</p>
                        </div>

                        {window.innerWidth <= 430 ?
                            null
                            :
                            <div className="specDonation-contactNo specDonation-column">
                                <p className="specDonation-contactNo-txt">{donation.contactNo}</p>
                            </div>
                        }

                        <div className="specDonation-received specDonation-column">
                            <p className="specDonation-received-txt">{donation.received ? 'Received' : 'Not Receieved' }</p>
                        </div>

                        <div className="specDonation-actions specDonation-column">
                            <Link to={`/donation/${donation._id}`}>
                                {/* onClick={() => viewDonation(donation._id)} */}
                                <button className="specDonation-btn specDonation-view">View</button>
                            </Link>
                            
                            {adminInfo && adminInfo.role === 'Admin' ?
                                <>
                                    <button className="specDonation-btn specDonation-delete" onClick={() => deleteHandler(donation._id)}>
                                        <MdDelete color='red' className='specDonation-delete-icon' />
                                    </button>
                                </>
                                :
                                <>
                                    <button className="specDonation-btn specDonation-delete" onClick={() => alert(`You're not allowed / authorized to perform this action.`)}>
                                        <MdDelete color='#808080' className='specDonation-delete-icon' />
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                ))}
            </>
        )
    }

    const PaginatedData = ({ donationsPerPage }) => {
        // We start with an empty list of items.
        const [currentDonations, setCurrentDonations] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + donationsPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            notReceived && setCurrentDonations(notReceived.slice(itemOffset, endOffset))
            notReceived && setPageCount(Math.ceil(notReceived.length / donationsPerPage))
        }, [itemOffset, donationsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * donationsPerPage) % notReceived.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <DataContainer currentDonations={currentDonations} />
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

    const ReceivedContainer = ({ receivedDonations }) => {
        return (
            <>
                {receivedDonations && receivedDonations.map((donation) => (
                    <div className='specDonation-container' key={donation._id}>
                        <div className="specDonation-donator specDonation-column">
                            <img src={donation.profilePicture} alt="" className="specDonation-image" />
                            <p className="specDonation-donator-txt">{donation.name}</p>
                        </div>

                        <div className="specDonation-email specDonation-column">
                            <p className="specDonation-email-txt">{donation.email}</p>
                        </div>

                        {window.innerWidth <= 430 ?
                            null
                            :
                            <div className="specDonation-contactNo specDonation-column">
                                <p className="specDonation-contactNo-txt">{donation.contactNo}</p>
                            </div>
                        }

                        <div className="specDonation-received specDonation-column">
                            <p className="specDonation-received-txt">{donation.received ? 'Received' : 'Not Receieved' }</p>
                        </div>

                        <div className="specDonation-actions specDonation-column">
                            <Link to={`/donation/${donation._id}`}>
                                {/* onClick={() => viewDonation(donation._id)} */}
                                <button className="specDonation-btn specDonation-view">View</button>
                            </Link>
                            
                            {adminInfo && adminInfo.role === 'Admin' ?
                                <>
                                    <button className="specDonation-btn specDonation-delete" onClick={() => deleteHandler(donation._id)}>
                                        <MdDelete color='red' className='specDonation-delete-icon' />
                                    </button>
                                </>
                                :
                                <>
                                    <button className="specDonation-btn specDonation-delete" onClick={() => alert(`You're not allowed / authorized to perform this action.`)}>
                                        <MdDelete color='#808080' className='specDonation-delete-icon' />
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                ))}
            </>
        )
    }

    const PaginatedReceivedData = ({ donationsPerPage }) => {
        // We start with an empty list of items.
        const [currentDonations, setCurrentDonations] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + donationsPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            received && setCurrentDonations(received.slice(itemOffset, endOffset))
            received && setPageCount(Math.ceil(received.length / donationsPerPage))
        }, [itemOffset, donationsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * donationsPerPage) % received.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <ReceivedContainer receivedDonations={currentDonations} />
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
    // const InventoryData = ({ currentInventories}) => {
    //     return (
    //         <>
    //             {currentInventories && currentInventories.map((item) => (
    //                 <div className="specInventory-container" key={item._id}>
    //                     <div className="specInventory-donator specInventory-column">
    //                         <img src={item.donatedByPicture} alt="" className="specInventory-donatorImg" />
    //                         <p className="specInventory-donator-txt">{item.donatedBy}</p>
    //                     </div>

    //                     <div className="specInventory-date specInventory-column">
    //                         <p className="specInventory-date-txt">{item.dateOfDonation}</p>
    //                     </div>

    //                     <div className="specInventory-items specInventory-column">
    //                         {item.dataItems.map((item) => (
    //                             <p className="specInventory-itemName">
    //                                 {item.itemName}
    //                                 <span className="specInventory-itemQuantity">({item.quantity})</span>
    //                             </p>
    //                         ))}
    //                     </div>

    //                     <div className="specInventory-actions specInventory-column">
    //                         {adminInfo && adminInfo.role === 'Admin' ?
    //                             <>
    //                                 <button className="specInventory-btn specInventory-delete" onClick={() => removeFromInventoryHandler(item._id)}>
    //                                     <MdDelete color='red' className='specInventory-delete-icon' />
    //                                 </button>
    //                             </>
    //                             :
    //                             <>
    //                                 <button className="specDonation-btn specDonation-delete" onClick={() => alert(`You're not allowed / authorized to perform this action.`)}>
    //                                     <MdDelete color='#808080' className='specDonation-delete-icon' />
    //                                 </button>
    //                             </>
    //                         }
    //                     </div>
    //                 </div>
    //             ))}
    //         </>
    //     )
    // }

    // const PaginatedInventory = ({ inventoriesPerPage }) => {
    //     // We start with an empty list of items.
    //     const [currentInventories, setCurrentInventories] = useState(null)
    //     const [pageCount, setPageCount] = useState(0)

    //     // Here we use item offsets; we could also use page offsets
    //     // following the API or data you're working with.
    //     const [itemOffset, setItemOffset] = useState(0)

    //     useEffect(() => {
    //         // Fetch items from another resources.
    //         const endOffset = itemOffset + inventoriesPerPage
    //         // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
    //         inventoryList && setCurrentInventories(inventoryList.slice(itemOffset, endOffset))
    //         inventoryList && setPageCount(Math.ceil(inventoryList.length / inventoriesPerPage))
    //     }, [itemOffset, inventoriesPerPage])

    //     // Invoke when user click to request another page.
    //     const handlePageClick = (event) => {
    //         const newOffset = (event.selected * inventoriesPerPage) % inventoryList.length;
    //         // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    //         setItemOffset(newOffset);
    //     }

    //     return (
    //         <>
    //             <InventoryData currentInventories={currentInventories} />
    //             <ReactPaginate
    //                 activeClassName='active-li'
    //                 activeLinkClassName='active-a'
    //                 className='pagination-container'
    //                 pageClassName='pagination-page-li'
    //                 pageLinkClassName='pagination-link-a'
    //                 nextClassName='next-li'
    //                 nextLinkClassName='next-a'
    //                 previousClassName='prev-li'
    //                 previousLinkClassName='prev-a'
    //                 breakClassName='page-break-li'
    //                 breakLinkClassName='page-break-a'
    //                 breakLabel='...'
    //                 nextLabel='>'
    //                 onPageChange={handlePageClick}
    //                 pageRangeDisplayed={5}
    //                 pageCount={pageCount}
    //                 previousLabel='<'
    //                 renderOnZeroPageCount={null}
    //             />
    //         </>
    //     )
    // }

    return (
        <div className='donations-body'>
            {loading && <Loading />}
            {loading && <Overlay />}

            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className="donations-content">
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <div className="donations-header-container">
                    <p className='donations-header'>DONATIONS</p>

                    <div className="accounts-adminInfo">
                        <div className="accounts-adminInfo-left">
                            <h3 className="accounts-adminName accounts-adminInfo-label">{adminInfo.fullName}</h3>
                            <p className="accounts-adminPos accounts-adminInfo-label">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="accounts-adminProfile" />
                    </div>        
                </div>
                <div className="toggleRegistrationsBtnContainer">
                    <button className={isDonationsActive ? 'toggle-donation-btn donation-active' : 'toggle-donation-btn donation-inactive'} onClick={() => toggleDonations()}>Donations</button>
                    <button className={isInventoryActive ? 'toggle-donation-btn inventory-active' : 'toggle-donation-btn donation-inactive'} onClick={() => toggleInventory()}>Received Donations</button>
                </div>

                {isDonationsActive ?
                    <div className='donations-container'>
                        <div className="donations-labels-container">
                            <p className="donations-label donations-label-donatedBy">Donator</p>
                            <p className="donations-label donations-label-email">Email</p>
                            {window.innerWidth > 430 ? <p className="donations-label donations-label-contactNo">Contact Number</p> : null}
                            <p className="donations-label donations-label-received">Received</p>
                            <p className="donations-label donations-label-actions">Actions</p>
                        </div>

                        <PaginatedData donationsPerPage={5} />
                    </div>
                    :
                    <div className='donations-container'>
                        <div className="donations-labels-container">
                            <p className="donations-label donations-label-donatedBy">Donator</p>
                            <p className="donations-label donations-label-email">Email</p>
                            {window.innerWidth > 430 ? <p className="donations-label donations-label-contactNo">Contact Number</p> : null}
                            <p className="donations-label donations-label-received">Received</p>
                            <p className="donations-label donations-label-actions">Actions</p>
                        </div>

                        <PaginatedReceivedData donationsPerPage={5} />
                    </div>
                    // <div className="inventories-container">
                    //     <div className="inventories-labels-container">
                    //         <p className="inventories-label inventories-label-donatedBy">Donated By</p>
                    //         <p className="inventories-label inventories-label-dateOfDonation">Date of Donation</p>
                    //         <p className="inventories-label inventories-label-items">Item (Quantity)</p>
                    //         <p className="inventories-label inventories-label-actions">Actions</p>
                    //     </div>
                        

                    //     <PaginatedInventory inventoriesPerPage={5} />
                    // </div>      
                }
            </div>
        </div>
    )
}

export default Donations