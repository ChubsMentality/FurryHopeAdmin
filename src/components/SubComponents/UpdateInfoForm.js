import React, { useState, useEffect } from 'react'
import { updateAnimalAction } from '../../actions/animalActions'
import { useDispatch } from 'react-redux'
import '../../css/UpdateInfoForm.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const UpdateInfoForm = (props) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('')
    const [gender, setGender] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [size, setSize] = useState()
    const [selectedImg, setSelectedImg] = useState('');
    const [adoptionStatus, setAdoptionStatus] = useState('');
    const [availUntil, setAvailUntil] = useState('');
    const [availUntilYear, setAvailUntilYear] = useState('')
    const [date, setDate] = useState('');
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'

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

    const dispatch = useDispatch();
    const history = useHistory();

    // Getting the animal data to be updated
    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`${URL}api/animals/${props.paramId}`);
        
            setName(data.name);
            setBreed(data.breed);
            setDescription(data.description);
            setColor(data.color)
            setGender(data.gender);
            setAnimalType(data.type);
            setSize(data.size)
            setSelectedImg(data.animalImg);
            setAdoptionStatus(data.adoptionStatus);
            setAvailUntil(data.availUntil);
            setAvailUntilYear(data.availUntilYear);
            setDate(data.updatedAt);
        };

        fetching();
    }, [props.paramId, date]);

    // Updating the animal's data
    const updateHandler = (e) => {
        e.preventDefault();

        let today = moment().format('MM/DD/YYYY')

        if(availUntil < today) {
            alert('Choose a valid date')
            return
        }

        setDate(date.substring(0, 10)); 

        if(!name || !color || !breed || !description || !gender || !animalType || !selectedImg || !adoptionStatus || !availUntil || !availUntilYear) return;
        dispatch(updateAnimalAction(props.paramId, name, color, breed, description, gender, animalType, size, selectedImg, adoptionStatus, availUntil, availUntilYear));

        history.push('/manage');
    }

    const availUntilHandler = (e) => {
        let tempVal = e.target.value
        let tempAvailUntil = moment(tempVal).format('MM/DD/YYYY')
        let tempAvailUntilYear = moment(tempVal).format('YYYY/MM/DD')
        
        console.log(tempAvailUntil)
        console.log(tempAvailUntilYear)
        setAvailUntil(tempAvailUntil)
        setAvailUntilYear(tempAvailUntilYear)
    }

    return (
        <form className="updateData-form-container" onSubmit={updateHandler}>
            <div className='update-data-left-column'>
                <label htmlFor="name" className="lbl-name lbl-update">Name</label><br />
                <input type="text" name="name" className="addName input-update-data" required value={name} onChange={(e) => setName(e.target.value)}/><br />

                <br />

                <label htmlFor="breed" className="lbl-breed lbl-update lbl-update-breed">Breed</label><br />
                <input type="text" name="breed" className="addBreed input-update-data" value={breed} onChange={(e) => setBreed(e.target.value)}/><br />

                <br />

                <label htmlFor="desc" className="lbl-breed lbl-update lbl-update-desc">Description (optional)</label><br />
                <textarea name="desc" className="updateDesc" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br />

                <br />
                {/*
                <label htmlFor="color" className='lbl-update-color lbl-update'>Color</label><br />
                <input type="text" name="color" className="updateColor" value={color} onChange={(e) => setColor(e.target.value)} /><br />
                */}
                
                <br />

                {/*
                <label htmlFor="select" className="lbl-select lbl-update">Gender</label>
                <select className="select" name="select" required value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="" defaultValue>Select here</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <br />

                <label htmlFor="select" className="lbl-select lbl-update">Animal Type</label>
                <select className="select" name="select" required value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
                    <option value="" defaultValue>Select here</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>

                <br />
                */}
            </div>
            <div className='update-data-right-column'>
                <div className="update-imgUploadContainer">
                    <label htmlFor="imgUpload" className="lbl-update-imgUpload lbl-update">Image Upload</label><br />
                    <input type="file" className="update-imgUpload" name="imgUpload" onChange={(e) => uploadImg(e.target.files[0])} />
                </div>
                
                <label htmlFor="availUntil" className="lbl-update lbl-update-availUntil">Available Until<span className='span-availUntil'>({availUntil})</span></label>
                <input type="date" name="availUntil" className="update-availUntil" onChange={availUntilHandler} />
                
                <p className='update-img-preview-txt'>Preview</p>
                <img src={selectedImg} className='update-img-preview' />

                <br />

                <center><input type="submit" value="UPDATE" className="btn-update" /></center>
            </div>
        </form>
    )
}

export default UpdateInfoForm