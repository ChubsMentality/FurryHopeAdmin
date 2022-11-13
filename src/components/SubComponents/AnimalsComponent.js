import React from 'react'
import '../../css/AnimalComponent.css'
import deleteIcon from '../../assets/Buttons/deleteIcon.svg'
import editIcon from '../../assets/Buttons/editIcon.svg'
import delete_Icon from '../../assets/Buttons/delete-icon.svg'
import { Link } from 'react-router-dom'

const AnimalsComponent = (props) => {
    return (
        <div className="dogData-container">
            <div className="dog-img-container">
                <img src={props.animalImg} className="dog-img" alt="image of the animal   "/>
            </div>
            <div className="dog-info">
                <p className="info-name info"><span className="bold">NAME:</span> {props.name}</p>
                <p className="info-type info"><span className="bold">ANIMAL TYPE:</span> {props.type}</p>
                <p className="info-breed info"><span className="bold">BREED: </span>{props.breed}</p>
                <p className="info-breed info"><span className="bold">GENDER: </span>{props.gender}</p>
                <p className="info-status info"><span className="bold">ADOPTION STATUS: </span>{props.adoptionStatus}</p>
            </div>
            <div className="dog-manage">
                <Link to={`/update/${props._id}`}>
                    <button className='btn-manage update'>
                        <img src={editIcon} className='btn-manage-edit-icon' />
                        EDIT
                    </button>
                </Link>

                <button className="btn-manage delete" onClick={() => props.deleteHandler(props._id)}>
                    <img src={delete_Icon} className='btn-manage-delete-icon'/>
                    DELETE
                </button>
            </div>
        </div>
    )
}

export default AnimalsComponent
