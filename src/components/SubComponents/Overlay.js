import React from 'react';

const Overlay = () => {
    return (
        <div
            className='overlay-body'
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(17, 17, 17, .6)',
                zIndex: 25,
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >

        </div>
    )
}

export default Overlay
