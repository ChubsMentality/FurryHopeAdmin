import React from 'react'
import { Link } from 'react-router-dom'
import EmptyImg from '../../assets/Empty/empty-svg.svg'
import addBlack from '../../assets/Buttons/add-black.svg'
import '../../css/EmptyComponent.css'

const EmptyComponent = () => {
    return (
        <div className='empty-component'>
            <img src={EmptyImg} className='empty-component-img' />
            <div className='empty-component-txt-container'>
                <p className='empty-txt-header'>THERE ARE NO ANIMALS <br/>IN THE DATABASE</p>
                <p className='empty-txt-subhead'>Would you like to add some?</p>
                <Link to='add' className='empty-link'>
                    <button className='empty-component-link'><img src={addBlack} className='empty-component-link-icon'/>Add An Animal</button>
                </Link>
            </div>
        </div>
    )
}

export default EmptyComponent
