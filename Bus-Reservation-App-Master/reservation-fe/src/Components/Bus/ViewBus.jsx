import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/ViewBus.css';

export default function ViewBus() {
  let [bus, setbus] = useState([]);
  let navigate = useNavigate();

  const fetchBuses = () => {
    axios.get(`http://localhost:8080/api/buses`)
      .then((res) => {
        console.log(res);
        setbus(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  function removeBus(id, busNumber) {
    axios.delete(`http://localhost:8080/api/buses/${id}`)
      .then((res) => {
        alert(`Bus Number ${busNumber} has been Removed from the list`);
        fetchBuses();
      })
      .catch((err) => {
        alert("Cannot Remove this item");
      });
  }

  function editNavigate(id) {
    navigate(`/adminhomepage/editbus/${id}`);
  }

  return (
    <div className='ViewBus'>
      {bus.map((item) => {
        return (
          <div className="bus_details" key={item.id}> {/* Added key prop here */}
            <h4>{item.name}</h4>
            <i>Seats : {item.numberOfSeats}</i>
            <p>From : {item.from}</p>
            <p>To : {item.to}</p>
            <p>Date : {item.dateOfDeparture}</p>
            <span>Bus Number : {item.busNumber}</span>
            <button className='btn btn-warning' onClick={() => { editNavigate(item.id) }}>Edit</button>
            <button className='btn btn-danger' onClick={() => { removeBus(item.id, item.busNumber) }}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
