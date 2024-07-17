import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 
import '../../Styles/BookBus.css';

export default function BookBus() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(1);

  useEffect(() => {
    console.log('User from context:', user);
    axios.get(`http://localhost:8080/api/buses/${params.id}`)
      .then((res) => {
        setBus(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.id, user]); 

  const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSeatChange = (e) => {
    setSelectedSeats(parseInt(e.target.value));
  };

  const handleBookBus = () => {
    if (user) { 
      navigate(`/book-ticket/${params.id}/${user.id}/${selectedSeats}`); // Use user.id from context
    } else {
      console.error("User is not logged in");
    }
  };

  if (!bus) {
    return <div>Loading...</div>;
  }

  return (
    <div className='display_book'>
      <h1>{bus.name}</h1>
      <b>From:</b><span>{bus.from}</span><br /><br />
      <b>To:</b><span>{bus.to}</span><br /><br />
      <b>Coach Type:</b>
      <select>
        <option>AC</option>
        <option>Non/AC</option>
        <option>Sleeper AC</option>
        <option>Sleeper Non/AC</option>
      </select>
      <br /><br />
      <b>Number Of Seats Available:</b><big><b>{bus.numberOfSeats}</b></big>
      <br /><br />
      <b>Select Number Of Seats:</b>
      <select onChange={handleSeatChange} value={selectedSeats}>
        {seats.map((seat) => (
          <option key={seat}>{seat}</option>
        ))}
      </select>

      <h3>Date Of Departure: <i>{bus.dateOfDeparture}</i></h3>
      <button className='btn btn-danger my-2 mx-5' onClick={handleBookBus}>Book Bus</button>
    </div>
  );
}
