import React, { useEffect, useRef } from 'react'
import { gsap, Power4 } from 'gsap'
import '../../css/Loading.css'

const Loading = () => {
    const c1 = useRef()
    const c2 = useRef()
    const c3 = useRef()
    const c4 = useRef()
    const c5 = useRef()
    const t1 = useRef()

    useEffect(() => {
        t1.current = gsap.timeline( { repeat: -1, repeatDelay: .5 })
            .from(c1.current, { opacity: 0, y: -50, ease: Power4.in })
            .from(c2.current, { opacity: 0, y: -50, ease: Power4.in })
            .from(c3.current, { opacity: 0, y: -50, ease: Power4.in })
            .from(c4.current, { opacity: 0, y: -50, ease: Power4.in })
            .from(c5.current, { opacity: 0, y: -50, ease: Power4.in })
    }, [])

    return (
        <div className='loading-container'>
            <div className='animation-container'>
                <div className='animated-circle' ref={c1}></div>
                <div className='animated-circle' ref={c2}></div>
                <div className='animated-circle' ref={c3}></div>
                <div className='animated-circle' ref={c4}></div>
                <div className='animated-circle' ref={c5}></div>
            </div>

            <p className='loading-txt'>Loading, please wait momentarily...</p>
        </div>
    )
}

export default Loading
