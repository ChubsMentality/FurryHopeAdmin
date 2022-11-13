import React, { useState, useEffect } from 'react'
import '../css/AddData.css'
import { useDispatch, useSelector} from 'react-redux'
import { createAnimalAction } from '../actions/animalActions'
import { toggleMenuOff, toggleMenuOn } from '../actions/adminActions'
import { css } from '@emotion/css'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { BiMenuAltRight } from 'react-icons/bi'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import Sidebar from './Sidebar'
import SidebarOverlay from './SubComponents/SidebarOverlay'
import moment from 'moment'

// There's a tutorial on how to upload an image to the database
// Just use bootstrap's built-in form for file upload
// MERN stack (roadsider) - 58:09 # 10

const override = css`
    display: block;
    border-color: white;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
`

const AddData = () => {
    const dispatch = useDispatch();
    const animalCreate = useSelector((state) => state.animalCreate);
    const { loading, error } = animalCreate

    const menuState = useSelector((state) => state.toggleMenuState)
    const { toggleState } = menuState

    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

    // loading state
    const [spinnrColor] = useState('#111111')

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('Unknown / Unidentified');
    const [description, setDescription] = useState('No description was given about the animal.');
    const [color, setColor] = useState('')
    const [gender, setGender] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [size, setSize] = useState('')
    const [selectedImg, setSelectedImg] = useState('https://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png');
    const [availUntil, setAvailUntil] = useState('')
    const [availUntilYear, setAvailUntilYear] = useState('')
    const adoptionStatus = 'Not Adopted'

    // Function to upload the image to cloudinary
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
                setSelectedImg(data.url.toString()) // gives us the url of the image in the cloud
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Please select an image')
        }
    }

    // This block of code is essential to send push notifications in the mobile app
    const [currentCount, setCurrentCount] = useState(Number)
    useEffect(() => {
        const getCurrentCount = async () => {
            const { data } = await axios.get(`${URL}api/animals/totalCount`)
            console.log(data.currentCount)
            setCurrentCount(data.currentCount + 1)
            console.log('Count to be passed: ', currentCount)
        }

        getCurrentCount()

        const interval = setInterval(() => {
            getCurrentCount()
        }, 30000)

        return () => clearInterval(interval)
    }, [currentCount])

    const updateTotalCount = () => {
        console.log(`Count to be passed: ${currentCount}`)
        axios.put(`${URL}api/animals/updateCount`, { currentCount })
            .then((response) => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let today = moment().format('YYYY/MM/DD')
        let avail = moment(availUntil).format('YYYY/MM/DD') 

        if(avail < today) {
            alert('Choose a valid date')
            return
        }

        if(!name || !breed || !description || !color || !gender || !animalType || !size || !selectedImg || !adoptionStatus || !availUntil || !availUntilYear) return;
        dispatch(createAnimalAction(name, color, breed, description, gender, animalType, size, selectedImg, adoptionStatus, availUntil, availUntilYear));
        alert('Successfully Added to the Database!');
        setName('')
        setBreed('Unknown / Unidentified')
        setDescription('No description was given about the animal.')
        setColor('')
        setGender('')
        setAnimalType('')
        setSelectedImg('https://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')

        updateTotalCount()
    }

    const d = new Date()
    let date = d.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })

    console.log(date + 'Not formatted')
    console.log(moment().format('MM/DD/YYYY'))

    availUntil && console.log(availUntil)
    const availUntilHandler = (e) => {
        let tempVal = e.target.value
        let tempAvailUntil = moment(tempVal).format('MM/DD/YYYY')
        let tempAvailUntilYear = moment(tempVal).format('YYYY/MM/DD')
        
        console.log(tempAvailUntil)
        console.log(tempAvailUntilYear)
        setAvailUntil(tempAvailUntil)
        setAvailUntilYear(tempAvailUntilYear)
    }

    console.log(toggleState)
    console.log(window.innerWidth)

    return (
        <div className="addData-body">
            {window.innerWidth <= 925 ?
                toggleState === true &&
                    <Sidebar />
                :
                <Sidebar />
            }

            {toggleState && <SidebarOverlay />}

            

            <div className='addData-content'>
                {error && window.alert(error)}

                {window.innerWidth <= 925 ?
                    toggleState === true ?
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOff())} />
                        :
                        <BiMenuAltRight className='menu-right' color='#111' onClick={() => dispatch(toggleMenuOn())}/>
                    :
                    <>
                    </>
                }

                <div className="addData-backBtnContainer">
                    <Link to='/manage' className="addData-backBtn">
                        <IoArrowBackOutline className='addData-backIcon' />
                        <p className="addData-backTxt">Back</p>
                    </Link>
                    {/* <p className='add-data-header'>ADD A NEW ANIMAL</p> */}
                </div>
                <form className="addData-form-container" onSubmit={submitHandler}>
                    <div className='addData-form-left-column'>
                        <label htmlFor="name" className="lbl-add-name lbl-addData">Name</label><br />
                        <input type="text" name="name" className="addName input-add-data" required value={name} onChange={(e) => setName(e.target.value)}/><br />

                        <label htmlFor="breed" className="lbl-breed lbl-addData">Breed</label><br />
                        <input type="text" name="breed" className="addBreed input-add-data" value={breed} onChange={(e) => setBreed(e.target.value)}/><br />

                        <label htmlFor="color" className='lbl-color lbl-addData'>Color</label><br />
                        <input type="text" name="color" className="addColor" value={color} onChange={(e) => setColor(e.target.value)} /><br />

                        <label htmlFor="desc" className="lbl-breed lbl-addData">Description (optional)</label><br />
                        <textarea name="desc" className="addDesc" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br />

                        <div className="addData-selectContainer">
                            <div className='addData-selectDiv'>
                                <label htmlFor="select" className="lbl-select lbl-addData">Gender</label>
                                <select className="addData-select" name="select-gender" required value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="" defaultValue>Select here</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <br />

                            <div className='addData-selectDiv'>
                                <label htmlFor="select" className="lbl-select lbl-addData">Animal Type</label>
                                <select className="addData-select" name="select" required value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
                                    <option value="" defaultValue>Select here</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </select>
                            </div>

                            <br />

                            <div className='addData-selectDiv'>
                                <label htmlFor="select" className="lbl-select lbl-addData">Size of the animal</label>
                                <select className="addData-select addData-sizeSelect" name="select" required value={size} onChange={(e) => setSize(e.target.value)}>
                                    <option value="" defaultValue>Select here</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='addData-form-right-column'>
                        <label htmlFor="date" className="lbl-add-availUntil">Available Until</label><br/>
                        <input type="date" name="date" id="date" className='add-data-availUntil' onChange={availUntilHandler} />


                        <div className="add-data-imgUploadContainer">
                            <label htmlFor="imgUpload" className="lbl-select lbl-add-imgUpload">Image Upload</label><br/>
                            <input type="file" className="add-data-imgUpload" name="imgUpload" onChange={(e) => uploadImg(e.target.files[0])} />
                        </div>
                        
                        <p className='add-data-preview-txt'>Preview</p>

                        <img src={selectedImg} className='add-data-imgUpload-preview' />

                        <button className="btn-add" >{loading ? <ClipLoader color={spinnrColor} css={override} loading={loading} size={35} /> : <p className='add-data-text'>SUBMIT</p>}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddData;