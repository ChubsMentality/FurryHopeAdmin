import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../css/AdoptionHistory.css'

const AdoptionHistory = (props) => {
    const [data, setData] = useState()
    const URL = 'https://fair-cyan-chimpanzee-yoke.cyclic.app/'


    const getAdoptions = async () => {
        try {
            const { data:response } = await axios.get(`${URL}api/admins/adoptionsPerAnimal/${props.paramId}`)
            console.log(response)
            setData(response)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAdoptionById = async (id) => {
        try {
            if(window.confirm('Are you sure you want to delete?')) {
                const { data } = await axios.delete(`${URL}api/admins/adoptions/${id}`)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(data)

    useEffect(() => {
        getAdoptions()
    }, [])

    console.log(props.paramId)
    return (
        <table className='adoptions-table'>
            <thead className='adoptions-table-head'>
                <tr className='adoptions-table-row'>
                    <th className='adoptions-row-head adoptionHisHead-applicant'>Applicant</th>
                    {window.innerWidth > 430 ? <th className='adoptions-row-head adoptionHisHead-address'>Address</th> : null}
                    <th className='adoptions-row-head adoptionHisHead-contactNo'>Contact No.</th>
                    <th className='adoptions-row-head adoptionHisHead-status'>Status</th>
                    <th className='adoptions-row-head adoptionHisHead-actions'></th>
                </tr>
            </thead>
            <tbody className='adoptions-table-body'>
                {data && data.map((item) => (
                    <tr key={item._id} className='adoptions-table-body-row'>
                        <td className='adoptions-row-body adoptions-row-center adoptionHis-applicant'>
                            <img src={item.applicantImg} alt="" className="adoptionHis-applicantImg" />
                            <p className='adoptionHis-applicantName'>{item.applicantName}</p>
                        </td>
                        {window.innerWidth > 430 ? <td className='adoptions-row-body adoptionHis-address'>{item.address}</td> : null}
                        <td className='adoptions-row-body adoptions-row-center adoptionHis-contactNo'>{item.contactNo}</td>
                        <td className='adoptions-row-body adoptions-row-center adoptionHis-status'>
                            {item.applicationStatus === 'Pending' &&
                                <p className="adoptionHis-currentStatus-pending">{item.applicationStatus}</p>
                            }

                            {item.applicationStatus === 'Rejected' &&
                                <p className="adoptionHis-currentStatus-rejected">{item.applicationStatus}</p>
                            }

                            {item.applicationStatus === 'Accepted' &&
                                <p className="adoptionHis-currentStatus-accepted">{item.applicationStatus}</p>
                            }
                        </td>
                        <td className='adoptions-row-body adoptions-row-body-actions'>
                            <Link to={`/adoption/${item._id}`} style={{textDecoration: 'none'}}>
                                <button className='adoptions-body-view-btn'>VIEW</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AdoptionHistory