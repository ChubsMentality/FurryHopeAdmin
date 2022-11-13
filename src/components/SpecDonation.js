import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { receivedDonation, addToInventory, toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { IoArrowBack } from 'react-icons/io5'
import { BiMenuAltRight } from 'react-icons/bi'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import axios from 'axios'
import '../css/SpecDonation.css'
import '../css/Adoption.css' 

const SpecDonation = ({ match, history }) => {
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    const dispatch = useDispatch()
    const [id, setId] = useState()
    const [dataItems, setDataItems] = useState()
    const [donatedBy, setDonatedBy] = useState()
    const [email, setEmail] = useState()
    const [contactNo, setContactNo] = useState()
    const [donatedByPicture, setDonatedByPicture] = useState()
    const [dateOfDonation, setDateofDonation] = useState()
    const [time, setTime] = useState()
    const [proofOfDonation, setProofOfDonation] = useState()
    const [received, setReceived] = useState()

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState
    
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
                setProofOfDonation(data.url.toString()) // gives us the url of the image in the cloud
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Please select an image')
        }
    }

    const getDonation = async () => {
        const { data } = await axios.get(`${URL}api/admins/getDonationById/${match.params.id}`)
        console.log(data.proofOfDonation)
        setId(data._id)
        setDataItems(data.items)
        setDonatedBy(data.name)
        setEmail(data.email)
        setContactNo(data.contactNo)
        setDonatedByPicture(data.profilePicture)
        setDateofDonation(data.dateOfDonation)
        setProofOfDonation(data.proofOfDonation)
        setTime(data.time)
        setReceived(data.received)
    }

    const receivedDonationHandler = () => {
        if(!proofOfDonation) {
            alert('Add an image that acts as a proof that the donation has been received')
            return
        }
        console.log(`There's proof...`)
        // receivedDonation - id
        // addToInventory - dataItems, donatedBy, email, contactNo, donatedByPicture, dateOfDonation, proofOfDonation, received, donationId 
        dispatch(receivedDonation(id, proofOfDonation))
        // dispatch(addToInventory(dataItems, donatedBy, email, contactNo, donatedByPicture, dateOfDonation, proofOfDonation, received, id))
        alert('Donation has been received')
        history.goBack()
    }

    useEffect(() => {
        getDonation()
    }, [match.params.id])

    return (
        <div className='specDonation-body'>
            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className="specDonation-content">
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <div className="specAdoption-nav-container">
                    <div className="specAdoption-back-container" onClick={() => history.goBack()}>
                        <IoArrowBack className='specAdoption-back-icon' color='#111'/>
                        <p className="specAdoption-back-txt">Back</p>
                    </div>
                </div>

                <div className="specDonation-flexContainer">
                    <div className="specDonation-info-container">
                        <p className="specDonation-donatedBy-label">Donated By</p>
                        <div className="specDonation-donatedBy-container">
                            <img src={donatedByPicture} alt="donator's image" className="specDonation-profilePicture" />
                            <p className="specDonation-donatedByName">{donatedBy}</p>
                        </div>

                        <p className="specDonation-label">Email: <span className="specDonation-value">{email}</span></p>
                        <p className="specDonation-label">Contact Number: <span className="specDonation-value">{contactNo}</span></p>
                        <p className="specDonation-label">Date of Donation: <span className="specDonation-value">{dateOfDonation}</span></p>
                        <p className="specDonation-label">Time of Donation: <span className="specDonation-value">{time}</span></p>

                        {proofOfDonation !== undefined ?
                            <p className="specDonation-proofOfDonation-label">Proof of Donation</p>
                            :
                            <p className="specDonation-proofOfDonation-label">Add proof of donation</p>
                        }

                        {proofOfDonation !== undefined ?
                            <></>
                            :
                            <input type="file" className="specDonation-proofOfDonation-input" onChange={(e) => uploadImg(e.target.files[0])}/>
                        }

                        {proofOfDonation !== undefined ?
                            <img src={proofOfDonation} className="specDonation-proofOfDonation-preview" />
                            :
                            <></>
                        }

                        {received === true ?
                            <></>
                            :
                            proofOfDonation ?
                                <button className="specDonation-receivedDonation" onClick={() => receivedDonationHandler()}>Received Donation</button>
                                :
                                <button className="specDonation-receivedDonation-disabled" onClick={() => alert('Button is disabled')}>Received Donation</button>
                        }
                    </div>

                    <table className='specDonation-modal-table'>
                        <thead className='specDonation-modal-tableHead'>
                            <tr className='specDonation-modal-head-row'>
                                <th className='specDonation-modal-tableHeading specDonationHead-itemName'>Item Name</th>
                                <th className='specDonation-modal-tableHeading specDonationHead-quantity'>Quantity</th>
                            </tr>
                        </thead>

                        <tbody className='specDonation-modal-body'>
                            {dataItems && dataItems.map((item) => (
                                <tr key={item.id} className='specDonation-modal-body-row'>
                                    <td className='specDonation-modal-itemName'>{item.itemName}</td>
                                    <td className='specDonation-modal-quantity'>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SpecDonation