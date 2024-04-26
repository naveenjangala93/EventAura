import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { LoginContext } from './LoginContext'
import './Committee.css';

function Committee() {

  let [acceptedBookings, setAcceptedBookings] = useState([]);
  let [err, setErr] = useState("");
  let [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/accepted-api/get-accepted-bookings')
      .then((res) => {
        console.log(res.data)
        setAcceptedBookings(res.data.acceptedbookings)
      })
      .catch((err) => {
        console.log(err.message)
        setErr("Something went wrong")
      })

    axios.get('http://localhost:3500/feedback-api/get-feedback')
      .then((res) => {
        setFeedback(res.data.feedbacks)
      })
      .catch((err) => {
        console.log(err.message)
        setErr("Something went wrong")
      })
  }, [])

  return (
    <div className='pb-5'>

      
      <h3 className=' text-center mt-3 mb-3 fun1'>Event Orders</h3>
      <table className=' container table border rounded-5  table-striped  mt-5 ' >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>PhoneNumber</th>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th>Capacity</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {
                        acceptedBookings.map((bookingObj) => {
                            return <tr>
                                <td>
                                    {bookingObj.username}
                                </td>
                                <td>
                                    {bookingObj.phoneNumber}
                                </td>
                                <td>
                                    {bookingObj.Event}
                                </td>
                                <td>
                                    {bookingObj.date}
                                </td>
                                <td>
                                    {bookingObj.address}
                                </td>
                                <td>
                                    {bookingObj.capacity}
                                </td>
                                
                            </tr>
                        }
                        )
                    }
                </tbody>
            </table>
      
      <br />
      <h3 className='text-center fun1'>Customer Feedbacks</h3>
      <div className="row row-cols-md-1 row-cols-lg-3 justify-content-center m-3 flex-wrap d-flex">
        {feedback.map((feedbackObj, index) =>
          <div key={index} className='card text-center colorful-card m-5'>
            <div className='card-body'>
              <h5 className='card-title'>{feedbackObj.username}</h5>
              <p className='card-text'>{feedbackObj.email}</p>
              <p className='card-text'>{feedbackObj.comments}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Committee;
