import React from 'react'
import { feedbackHasBeenRead } from '../../actions/adminActions'
import { useDispatch } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import '../../css/ViewFeedback.css'

const ViewFeedback = (props) => {
    const dispatch = useDispatch()

    const feedbackHasBeenReadHandler = () => {
        dispatch(feedbackHasBeenRead(props.id, props.profilePicture, props.message, props.email))
    }

    return (
        <div className="feedback-modal">
            <IoClose className='close-feedbackModal' color='#111' onClick={() => props.closeFeedback()} />

            <div className="feedbackModal-header">
                <div className="feedbackModal-left">
                    <img src={props.profilePicture} alt="A picture of a user." className="feedbackModal-profilePicture" />

                    <div className="feedbackModal-info">
                        <p className="feedbackModal-name">{props.fullName}</p>
                        <p className="feedbackModal-email">{props.email}</p>
                    </div>
                </div>
            </div>

            <div className="feedbackModal-ratingContainer">
                {props.rating === 1 &&
                    <div className='feedBackModal-ratings'>
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                    </div>
                }

                {props.rating === 2 &&
                    <div className='feedBackModal-ratings'>
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                    </div>
                }

                {props.rating === 3 &&
                    <div className='feedBackModal-ratings'>
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                    </div>
                }

                {props.rating === 4 &&
                    <div className='feedBackModal-ratings'>
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStarOutline className='feedbackRating-outline' color='#111' />
                    </div>
                }

                {props.rating === 5 &&
                    <div className='feedBackModal-ratings'>
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                        <IoIosStar className='feedbackRating-filled' color='gold' />
                    </div>
                }

                <p className="feedbackModal-date">({props.date})</p>

            </div>

            <div className="feedbackModal-msgContainer">
                <p className="feedbackModal-msg">{props.message}</p>
            </div>

            <div className="feedbackModal-hasBeenRead">
                {props.viewed === true ?
                    <>
                        <div className="feedbackModal-checked">
                            <FaCheck className='feedbackModal-checkedIcon' color='white' />
                        </div>

                        <p className="hasBeenRead-labelActive">Viewed</p>
                    </>
                    :
                    <>
                        <input 
                            type="checkbox" 
                            className='feedbackModal-checkbox' 
                            value={props.viewed} 
                            onClick={() => feedbackHasBeenReadHandler()} 
                        />
                        <p className="hasBeenRead-label">Viewed</p>
                    </>
                }

            </div>
        </div>
    )
}

export default ViewFeedback