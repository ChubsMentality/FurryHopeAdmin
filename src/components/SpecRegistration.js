import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerAnimal, updateRequirements, rejectRegistration, toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { IoArrowBack } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'
import { BiMenuAltRight } from 'react-icons/bi'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import axios from 'axios'
import '../css/SpecRegistration.css'

const SpecRegistration = ({ history, match }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [regFeeComplete, setRegFeeComplete] = useState()
    const [certOfResidencyComplete, setCertOfResidencyComplete] = useState()
    const [ownerPictureComplete, setOwnerPictureComplete] = useState()
    const [petPhotoComplete, setPetPhotoComplete] = useState()
    const [proofOfAntiRabiesComplete, setProofOfAntiRabiesComplete] = useState()
    const [photocopyCertOfAntiRabiesComplete, setPhotocopyCertOfAntiRabiesComplete] = useState()
    const [adoptionStatus, setAdoptionStatus] = useState()
    const [adoptionReference, setAdoptionReference] = useState()
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    const registerState = useSelector(state => state.animalRegister)
    const { success:successReg } = registerState

    const updateState = useSelector(state => state.updateReqState)
    const { success:successUpdate } = updateState

    const rejectState = useSelector(state => state.rejectRegistrationState)
    const { success:successReject } = rejectState

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState

    const getRegistration = async () => {
        const { data } = await axios.get(`${URL}api/admins/getRegistration/${match.params.id}`)
        setData(data)
        console.log(data.adoptionReference)
        setAdoptionReference(data.adoptionReference)
        setRegFeeComplete(data.regFeeComplete)
        setCertOfResidencyComplete(data.certOfResidencyComplete)
        setOwnerPictureComplete(data.ownerPictureComplete)
        setPetPhotoComplete(data.petPhotoComplete)
        setProofOfAntiRabiesComplete(data.proofOfAntiRabiesComplete)
        setPhotocopyCertOfAntiRabiesComplete(data.photocopyCertOfAntiRabiesComplete)
    }

    const getAdoption = async () => {
        const { data } = await axios.get(`${URL}api/admins/getAdoptionByReference`, { adoptionReference })
        setAdoptionStatus(data.adoptionStatus)
        console.log(data)
    }

    useEffect(() => {
        setTimeout(() => {
            adoptionReference && getAdoption()
        }, 5000)
    }, [adoptionReference])

    const reqMet = regFeeComplete && certOfResidencyComplete && ownerPictureComplete && petPhotoComplete && proofOfAntiRabiesComplete && photocopyCertOfAntiRabiesComplete

    useEffect(() => {
        getRegistration()
        // getAdoption()
    }, [match, successUpdate, successReject, successReg])

    return (
        <div className="specReg-body">
            {window.innerWidth <= 778 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            <div className="specReg-content">
                {window.innerWidth <= 778 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <div className="specReg-header">
                    <div className="specReg-back-container" onClick={() => history.goBack()}>
                        <IoArrowBack className='specReg-back-icon' color='#111' />
                        <p className="specReg-back-txt">Back</p>
                    </div>

                    <div className="specReg-header-right">
                        <p className="specAdoption-statusLabel">Status:</p>
                        {data && data.registrationStatus === 'Pending' &&
                            <p className="specReg-currentStatus-pending">{data && data.registrationStatus}</p>
                        }

                        {data && data.registrationStatus === 'Registered' &&
                            <p className="specReg-currentStatus-accepted">{data && data.registrationStatus}</p>
                        }

                        {data && data.registrationStatus === 'Not Registered' &&
                            <p className="specReg-currentStatus-rejected">{data && data.registrationStatus}</p>
                        }
                    </div>

                </div>

                <div className="specReg-regInfoContainer">
                    <div className="specReg-regInfo specRegInfo">
                        <div className="regInfo-applicantContainer">
                            <img src={data && data.applicantImg} className="regInfo-applicantImg" />

                            <div className="regInfo-applicantInfo">
                                <p htmlFor="" className="regInfoLabelBlock regInfoName">Name</p>
                                <p className="regInfoValueBlock">{data && data.name}</p>

                                <p className="regInfoLabelBlock regInfoEmail">Email</p>
                                <p className="regInfoValueBlock">{data && data.email}</p>
                            </div>
                        </div>
                        <p className="regInfoDateSubmitted">Date Submitted: <span>{data && data.date}</span></p>
                        <p className="regInfoLabel">ID: <span className="regInfoValue">{data && data._id}</span></p>
                        <p className="regInfoLabel">Registration Type: <span className="regInfoValue">{data && data.registrationType}</span></p>
                        <p className="regInfoLabel">Contact Number: <span className="regInfoValue">{data && data.contactNo}</span></p>
                        <p className="regInfoLabel">Length of Stay: <span className="regInfoValue">{data && data.lengthOfStay}</span></p>
                        <p className="regInfoLabel">Address: <span className="regInfoValue">{data && data.address}</span></p>
                        {data && data.isFromAdoption &&
                            <p className="regInfoLabel">Adoption Ref: <span className="regInfoValue">{data && data.adoptionReference}</span></p>
                        }

                        {data && data.isFromAdoption ||
                            <></>
                        }

                        <p className="regInfoPetHeader">Pet's Information</p>
                        <p className="regInfoLabel">Name: <span className="regInfoValue">{data && data.animalName}</span></p>
                        <p className="regInfoLabel">Type: <span className="regInfoValue">{data && data.animalType}</span></p>
                        <p className="regInfoLabel">Breed: <span className="regInfoValue">{data && data.animalBreed}</span></p>
                        <p className="regInfoLabel">Age: <span className="regInfoValue">{data && data.animalAge}</span></p>
                        <p className="regInfoLabel">Gender: <span className="regInfoValue">{data && data.animalGender}</span></p>
                        <p className="regInfoLabel">Color: <span className="regInfoValue">{data && data.animalColor}</span></p>
                        <p className="regInfoLabel">Tag Number: <span className="regInfoValue">{data && data.tagNo}</span></p>
                    </div>

                    <div className="specReg-regInfoRight">
                        <div className="specReg-regRequirements specRegInfo">
                            <p className="specReg-reqHeader">Requirements</p>
                            {data && data.regFeeComplete === true ?
                                <>
                                    <div className="specReg-requirementsContainer">
                                        <div className="specReg-reqChecked">
                                            <FaCheck className='specReg-checkedIcon' color='white' />
                                        </div>
                                        <p className="specReg-reqLabel">Registration Fee (₱75.00)</p>
                                    </div>
                                </>
                                :
                                <div className="specReg-requirementsContainer">
                                    <input type="checkbox" className="specReg-reqCheckBox" color='white' value={regFeeComplete} onClick={() => setRegFeeComplete(!regFeeComplete)} />
                                    <p className="specReg-reqLabel">Registration Fee (₱75.00)</p>
                                </div>
                            }

                            {data && data.certOfResidencyComplete === true ?
                                <div className='specReg-requirementsContainer'>
                                    <div className="specReg-reqChecked">
                                        <FaCheck className='specReg-checkedIcon' color='white' />
                                    </div>
                                    <p className="specReg-reqLabel">Certificate of Residency / <br />Any Valid Id</p>
                                </div>
                                :
                                <div className="specReg-requirementsContainer">
                                    <input type="checkbox" className="specReg-reqCheckBox" value={certOfResidencyComplete} onClick={() => setCertOfResidencyComplete(!certOfResidencyComplete)} />
                                    <p className="specReg-reqLabel">Certificate of Residency / <br />Any Valid Id</p>
                                </div>
                            }

                            {data && data.ownerPictureComplete === true ?
                                <div className='specReg-requirementsContainer'>
                                    <div className="specReg-reqChecked">
                                        <FaCheck className='specReg-checkedIcon' color='white' />
                                    </div>
                                    <p className="specReg-reqLabel">Owner's 2x2 Pictures (2pcs)</p>
                                </div>
                                :
                                <div className="specReg-requirementsContainer">
                                    <input type="checkbox" className="specReg-reqCheckBox" value={ownerPictureComplete} onClick={() => setOwnerPictureComplete(!ownerPictureComplete)} />
                                    <p className="specReg-reqLabel">Owner's 2x2 Pictures (2pcs)</p>
                                </div>
                            }

                            {data && data.petPhotoComplete === true ?
                                <>
                                    <div className='specReg-requirementsContainer'>
                                        <div className="specReg-reqChecked">
                                            <FaCheck className='specReg-checkedIcon' color='white' />
                                        </div>
                                        <p className="specReg-reqLabel">Photo of Pet (Side View, Whole Body)</p>
                                    </div>
                                </>
                                :
                                <div className="specReg-requirementsContainer">
                                    <input type="checkbox" className="specReg-reqCheckBox" value={petPhotoComplete} onClick={() => setPetPhotoComplete(!petPhotoComplete)} />
                                    <p className="specReg-reqLabel">Photo of Pet (Side View, Whole Body)</p>
                                </div>
                            }

                            {data && data.proofOfAntiRabiesComplete === true ?
                                <div className='specReg-requirementsContainer'>
                                    <div className="specReg-reqChecked">
                                        <FaCheck className='specReg-checkedIcon' color='white' />
                                    </div>
                                    <p className="specReg-reqLabel">Certificate / Proof <br />of Anti-Rabies Vaccination</p>
                                </div>
                                :
                                <div className="specReg-requirementsContainer">
                                    <input type="checkbox" className="specReg-reqCheckBox" value={proofOfAntiRabiesComplete} onClick={() => setProofOfAntiRabiesComplete(!proofOfAntiRabiesComplete)} />
                                    <p className="specReg-reqLabel">Certificate / Proof <br />of Anti-Rabies Vaccination</p>
                                </div>
                            }

                            {data && data.photocopyCertOfAntiRabiesComplete === true ?
                                <div className='specReg-requirementsContainer'>
                                    <div className="specReg-reqChecked">
                                        <FaCheck className='specReg-checkedIcon' color='white' />
                                    </div>
                                    <p className="specReg-reqLabel">Photocopy of Certificate / Proof<br/>of Anti-Rabies Vaccination</p>
                                </div>
                                :
                                <div className="specReg-requirementsContainer">
                                    <input type="checkbox" className="specReg-reqCheckBox" value={photocopyCertOfAntiRabiesComplete} onClick={() => setPhotocopyCertOfAntiRabiesComplete(!photocopyCertOfAntiRabiesComplete)} />
                                    <p className="specReg-reqLabel">Photocopy of Certificate / Proof<br/>of Anti-Rabies Vaccination</p>
                                </div>
                            }

                            <button className="specReg-saveBtn" onClick={() => dispatch(updateRequirements(data && data._id, regFeeComplete, certOfResidencyComplete, ownerPictureComplete, petPhotoComplete, proofOfAntiRabiesComplete, photocopyCertOfAntiRabiesComplete))}>SAVE</button>
                        </div>

                        {data && data.registrationStatus === 'Registered' ?
                            <div className="specReg-regActions specRegInfo">
                                <button className="regInfoAccept regInfoBtn" style={{ opacity: .4 }} disabled onClick={() => dispatch(registerAnimal(data && data._id))}>REGISTER</button>
                                <button className="regInfoDecline regInfoBtn" style={{ opacity: .4 }} disabled onClick={() => dispatch(rejectRegistration(data && data._id))}>REJECT</button>
                            </div>
                            : data && data.registrationStatus === 'Not Registered' ?
                                <div className="specReg-regActions specRegInfo">
                                    <button className="regInfoAccept regInfoBtn" style={{ opacity: .4 }} disabled onClick={() => dispatch(registerAnimal(data && data._id))}>REGISTER</button>
                                    <button className="regInfoDecline regInfoBtn" style={{ opacity: .4 }} disabled onClick={() => dispatch(rejectRegistration(data && data._id))}>REJECT</button>
                                </div>
                                : reqMet === false ?
                                    <div className="specReg-regActions specRegInfo">
                                        <button className="regInfoAccept regInfoBtn" style={{ opacity: .4 }} disabled onClick={() => dispatch(registerAnimal(data && data._id))}>REGISTER</button>
                                        <button className="regInfoDecline regInfoBtn" style={{ opacity: .4 }} disabled onClick={() => dispatch(rejectRegistration(data && data._id))}>REJECT</button>
                                    </div>
                                    :
                                    <div className="specReg-regActions specRegInfo">
                                        <button className="regInfoAccept regInfoBtn" onClick={() => dispatch(registerAnimal(data && data._id))}>REGISTER</button>
                                        <button className="regInfoDecline regInfoBtn" onClick={() => dispatch(rejectRegistration(data && data._id))}>REJECT</button>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecRegistration