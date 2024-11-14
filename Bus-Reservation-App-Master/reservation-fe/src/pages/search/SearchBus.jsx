import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBus() {
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [dateOfDeparture, setDate] = useState("");
  let [buses, setBuses] = useState([]);
  let [searched, setSearched] = useState(false);
  let navigate = useNavigate(); 

  const fromInputRef = useRef();
  const toInputRef = useRef();

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  function searchBus(e) {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_URL}/api/buses/find?from=${from}&to=${to}&dateOfDeparture=${dateOfDeparture}`)
      .then(res => {
        const fetchedBuses = res.data.data;
        setBuses(fetchedBuses);
        setSearched(true);
  
        if (fetchedBuses.length > 0) {
          navigate('/bus', { state: { buses: fetchedBuses } }); 
        }
      })
      .catch((err) => {
        console.error("Error fetching buses:", err);
        setSearched(true);
      });
  }
  

  return (
    <div className="flex flex-col items-center my-5 mx-5 p-4 font-sans bg-neutral-200/60 dark:bg-neutral-900/40 rounded-lg">
      <form
        onSubmit={searchBus}
        className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4 items-center justify-center p-5 border border-gray-300 rounded-lg shadow-md bg-gray-100 w-full  dark:bg-neutral-900/70"
      >
        <div className="relative w-full sm:w-55" ref={fromInputRef}>
          <input
            type="text"
            required
            value={from}
            onChange={handleFromChange}
            placeholder="From Location"
            className="p-2 border border-gray-300 rounded-md text-base w-full focus:outline-none dark:bg-neutral-600/40"
          />
        </div>

        <div className="relative w-full sm:w-55" ref={toInputRef}>
          <input
            type="text"
            required
            value={to}
            onChange={handleToChange}
            placeholder="To Location"
            className="p-2 border border-gray-300 rounded-md text-base w-full focus:outline-none dark:bg-neutral-600/40"
          />
        </div>

        <input
          type="date"
          required
          value={dateOfDeparture}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-48 focus:outline-none dark:bg-neutral-600/40"
        />

        <button className="py-2 px-5 w-full sm:w-auto border-none rounded-md bg-green-600 text-white text-base cursor-pointer hover:bg-green-700 transition-all duration-150">
          Search
        </button>
      </form>
      <div>
        {searched && buses.length === 0 && (
          <h2 className="mt-5 text-red-500 text-center">No buses available for this route</h2>
        )}
      </div>
    </div>
  );
}
