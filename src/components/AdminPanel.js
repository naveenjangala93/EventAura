import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineStar } from "react-icons/md";
import './AdminPanel.css'
function AdminPanel() {
    let [bookedusers, setbookedUsers] = useState([]);
    let [feedback, setfeedback] = useState([]);
    let [err, setErr] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3500/booking-api/get-bookings')
            .then((res) => {
                setbookedUsers(res.data.bookings)
            })
            .catch((err) => {
                console.log(err.message)
                setErr("Something went wrong")
            })
        axios.get('http://localhost:3500/feedback-api/get-feedback')
            .then((res) => {
                setfeedback(res.data.feedbacks)
            })
            .catch((err) => {
                console.log(err.message)
                setErr("Something went wrong")
            })
    }, [])

    let sendmail = (bookingObj) => {
        axios.post("http://localhost:3500/user-api/sendemail", bookingObj)
            .then((res) => { })
            .catch(() => { })
    }
    //let [inaccepted,setinaccepted]=useState(true);
    let inaccepted = true;

    let accept = (bookingObj) => {
        bookingObj.accepted = true;
        // console.log(user);
        sendmail(bookingObj);
        let id = bookingObj._id;
        console.log(id);
        delete bookingObj._id;
        axios.post("http://localhost:3500/accepted-api/accepted-bookings", bookingObj)
            .then((resp) => {
                bookingObj._id = id;
                //setinaccepted(!inaccepted);
                inaccepted = false;
                console.log(inaccepted);
                decline(bookingObj);

            })
            .catch((er) => { })
    }
    let decline = (bookingObj) => {
        //    let id=bookingObj._id;
        console.log(inaccepted);
        if (inaccepted === true) {
            bookingObj.accepted = false;
            sendmail(bookingObj);
        }
        console.log(bookingObj);
        axios.post("http://localhost:3500/booking-api/delete-booking", bookingObj)
            .then((res) => {
                console.log(res.data);
                axios.get('http://localhost:3500/booking-api/get-bookings')
                    .then((res1) => {
                        console.log(res1.data);
                        setbookedUsers(res1.data.bookings)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setErr("Something went wrong")
                    });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
    return (
        <div>
            <h2 className='text-center '>Approval Requests</h2>
            <p className='text-danger'>{err}</p>
            <table className=' container table border rounded-5   mt-5 ' >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>PhoneNumber</th>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookedusers.map((bookingObj) => {
                            return <tr>
                                <td>
                                    {bookingObj.Name}
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
                                <td>
                                    <button className='btn btn-success ms-2' onClick={() => accept(bookingObj)}>Accept</button>
                                    <button className='btn btn-danger ms-2' onClick={() => decline(bookingObj)}>Decline</button>
                                </td>
                            </tr>
                        }
                        )
                    }
                </tbody>
            </table>
            <br></br>
            <h4 className='text-center fun1'> Feedbacks</h4>
            <table className=' container hello123 table border rounded-5   mt-5 border  ' >
                <thead>
                    <tr>
                        <th>Event</th>
                        <th><MdOutlineStar /></th>
                        <th><MdOutlineStar />
                            <MdOutlineStar /></th>
                        <th><MdOutlineStar /><MdOutlineStar />
                            <MdOutlineStar /></th>
                            <th><MdOutlineStar /><MdOutlineStar />
                            <MdOutlineStar /> <MdOutlineStar /></th>
                            <th><MdOutlineStar /><MdOutlineStar />
                            <MdOutlineStar /> <MdOutlineStar /> <MdOutlineStar /></th>
                            <th>Average Rating</th>
                    </tr>
                </thead>
             
                <tbody>
                    {
                        feedback.map((feedbackObj) => {
                            let tot=feedbackObj.onec*1+ feedbackObj.twoc*2+feedbackObj.threec*3+feedbackObj.fourc*4+feedbackObj.fivec*5;
                            let c=feedbackObj.onec + feedbackObj.twoc+ feedbackObj.threec+feedbackObj.fourc+feedbackObj.fivec;
                            let avg=tot/c;
                            return <tr>
                                <td className='hello'>{feedbackObj.event}</td>
                                <td>{feedbackObj.onec}</td>
                                <td>{feedbackObj.twoc}</td>
                                <td>{feedbackObj.threec}</td>   
                                <td>{feedbackObj.fourc}</td>
                                <td>{feedbackObj.fivec}</td>
                            
                                <td>{avg}</td>  

                            </tr>
                        }
                        )
                    }
                    {/* {
                        feedback.map((feedbackObj) => {
                          //let  totalFeedbackCount = feedback.reduce((total, feedbackObj) => total + feedbackObj.onec + feedbackObj.twoc + feedbackObj.threec, 0);
                            const percentageOneC = Math.round((feedbackObj.onec / 3) * 100);
                            const percentageTwoC = Math.round((feedbackObj.twoc /3) * 100);
                            const percentageThreeC = Math.round((feedbackObj.threec / 3) * 100);
                            return (
                                <tr key={feedbackObj.event}>
                                    <td className='hello'>{feedbackObj.event}</td>
                                    <td>{percentageOneC}%</td>
                                    <td>{percentageTwoC}%</td>
                                    <td>{percentageThreeC}%</td>
                                </tr>
                            );
                        })
                    } */}

                </tbody>
            </table>
        </div>
    )
}
export default AdminPanel