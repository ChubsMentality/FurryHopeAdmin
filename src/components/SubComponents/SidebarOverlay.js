import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenuOff } from '../../actions/adminActions'

const SidebarOverlay = () => {
    const dispatch = useDispatch()

    return (
        <div 
            onClick={() => dispatch(toggleMenuOff())}
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(17, 17, 17, .35)',
                zIndex: 25,
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 5,
            }}
        >
        </div>
    )
}

export default SidebarOverlay