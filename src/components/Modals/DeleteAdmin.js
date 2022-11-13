import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteAdminAccount } from '../../actions/adminActions'
import { IoClose } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'
import axios from 'axios'
import '../../css/DeleteAdminModal.css'

const DeleteAdmin = (props) => {
    const dispatch = useDispatch()
    const [reason, setReason] = useState('')
    const [specifiedReason, setSpecifiedReason] = useState('')
    const [confirmDeletionTxt, setConfirmDeletionTxt] = useState('')

    console.log(props)

    const deleteAccountHandler = () => {
        if(reason === '') {
            alert('Please tell us your reason for deleting the account.')
            return
        }

        dispatch(deleteAdminAccount(props.id))
        alert('Successfully Deleted the Account.')
        props.closeDeleteAdmin()
    }

    console.log(props)
    return (
        <div className="deleteModalContainer">
            <IoClose className='forgotPwdModal-close' color='#111' onClick={() => props.closeDeleteAdmin()} />
            <h1 className='deleteModalHeader'>DELETE ACCOUNT</h1>
            <p className="deleteReasonTxt">Tell us the reason why you're deleting this account.</p>

            <div className="deleteCheckBoxContainer">
                {reason === 'Resigned / No longer an employee' ?
                    <div className="deleteCheckBox_checked" onClick={() => setReason('')}>
                        <FaCheck className='deleteCheckBoxIcon' color='white' />
                    </div>
                    :
                    <div className="deleteCheckBox" onClick={() => setReason('Resigned / No longer an employee')}>
                    </div>
                }

                <p className="deleteReason">Resigned / No longer an employee</p>
            </div>

            <div className="deleteCheckBoxContainer">
                {reason === 'Other / s, please specify:' ?
                    <div className="deleteCheckBox_checked" onClick={() => setReason('')}>
                        <FaCheck className='deleteCheckBoxIcon' color='white' />
                    </div>
                    :
                    <div className="deleteCheckBox" onClick={() => setReason('Other / s, please specify:')}>
                    </div>
                }

                <p className="deleteReason">Other / s, please specify:</p>
            </div>

            {reason === 'Other / s, please specify:' ?
                <textarea className='deleteOtherReason' placeholder='Specify the reason here...'>
                </textarea>
                :
                <textarea className='deleteOtherReason' disabled placeholder='Specify the reason here...'>
                </textarea>
            }

            <div className="confirmDeletionContainer">
                <div className="confirmDeletion">
                    <p className="confirmDeletionTxt">To confirm, type "DELETE"</p>
                    <input type="text" className="confirmDeletionInput" value={confirmDeletionTxt} onChange={(e) => setConfirmDeletionTxt(e.target.value)} />
                </div>

                {confirmDeletionTxt === 'DELETE' ?
                    <button className="btnConfirmDeletion" onClick={() => deleteAccountHandler(props.id)}>
                        DELETE
                    </button>
                    :
                    <button className="btnConfirmDeletion" onClick={() => alert('Button is disabled, confirm deletion first.')}>
                        DELETE
                    </button>
                }
            </div>
        </div>
    )
}

export default DeleteAdmin