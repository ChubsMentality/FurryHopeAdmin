import React from 'react';
import EmptyImg from '../../assets/Empty/empty-svg.svg'
import '../../css/EmptyAdoptions.css'

const EmptyAdoptions = () => {
    return (
        <div className='empty-adoptions'>
            <img className='empty-adoptions-img' src={EmptyImg} />
            <p className='empty-adoptions-txt'>There are currently no applications<br /> for adopting the animals</p>
        </div>
    )   
}

export default EmptyAdoptions
