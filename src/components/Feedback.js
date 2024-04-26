import { FaStar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import './Feedback.css';

const Star = ({ selected, onSelect }) => {
  return <FaStar color={selected ? "gold" : "gray"} onClick={onSelect} className="fs-3" />;
};

const StarRating = ({ totalStars, onSubmit }) => {
  const [selectedStars, setSelectedStars] = useState(Array(totalStars).fill(false));
  const [comments, setComments] = useState('');
  const [eventType, setEventType] = useState('');

  const handleStarClick = (index) => {
    const newSelectedStars = selectedStars.map((star, i) => i <= index);
    setSelectedStars(newSelectedStars);
  };

  const handleSubmit = () => {
    const rating = selectedStars.filter(selected => selected).length;
    onSubmit({ rating, comments, eventType }); // Submit feedback data to the backend
    // Optionally, you can clear the form after submission
    setSelectedStars(Array(totalStars).fill(false));
    setComments('');
    setEventType('');
  };

  return (
    <div className=' w-100'>
      <div className="d-flex align-items-center w-100 ">
        <div className="test1 p-1 mt-3 ">
          <img src=" https://blog.irisconnect.com/hubfs/Stock%20images/Your%20Feedback%20Matters%20placard%20with%20bokeh%20background.jpeg#keepProtocol" className="rounded-3"width="500px" height="389px" />
        </div>
        <div className="feedback-form rounded-3 border border-dark p-4 h-3 mt-4 test3 ">
          <h1 className='text-center mb-3 fun1 display-6'>Feedback Form</h1>
          <div className="form-group test-3">
            <label htmlFor="event" className='funny fw-bold'>Type of Event:</label>
            <select id="event" className='form-select mb-3' value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="">Select type of Event</option>
              <option value="Wedding Anniversary">Wedding Anniversary</option>
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Concert">Concerts</option>
              <option value="Destination">Destination</option>
              <option value="CineAwards">Cine Awards</option>
            </select>
          </div>
          <div className="form-group ">
            <label className="funny fw-bold">Rating:</label>
            <div className="stars text-center">
              {selectedStars.map((selected, index) => (
                <Star
                  key={index}
                  selected={selected}
                  onSelect={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comments" className="funny fw-bold">Comments:</label>
            <textarea id="comments" className="form-control" value={comments} onChange={(e) => setComments(e.target.value)} />
          </div>

          <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  );
};

export default function Feedback() {
  const handleSubmit = (feedbackData) => {
    // Send feedbackData to the backend
    console.log("Submitting feedback:", feedbackData);
    axios.post("http://localhost:3500/feedback-api/create-feedback", feedbackData)
      .then((res) => { console.log(res.data); })
      .catch((error) => { console.error("Error submitting feedback:", error); });
    // Replace the console.log with your backend API call
  };

  return (
    <div className="container">
      <StarRating totalStars={5} onSubmit={handleSubmit} />
    </div>
  );
}
