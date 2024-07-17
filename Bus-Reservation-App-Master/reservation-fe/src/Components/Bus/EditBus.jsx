import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../Styles/EditBus.css'

export default function EditBus() {
    let [name, setname] = useState("")
    let [dateOfDeparture, setdate] = useState("")
    let [busNumber, setbusNumber] = useState("")
    let [from, setfrom] = useState("")
    let [to, setto] = useState("")
    let [numberOfSeats, setseats] = useState("")
    let [availableSeats, setAvailableSeats] = useState("");
    let [costPerSeat, setCostPerSeat] = useState("");
    let [reportingTime, setReportingTime] = useState("00:00");
    let [departureTime, setDepartureTime] = useState("00:00");
    let [boardingPoint, setBoardingPoint] = useState("");
    let [droppingPoint, setDroppingPoint] = useState("");

    let params = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/buses/${params.id}`)
            .then((res) => {
                console.log(res.data);
                setname(res.data.name);
                setbusNumber(res.data.busNumber);
                setfrom(res.data.from);
                setto(res.data.to);
                setseats(res.data.numberOfSeats);
                setdate(res.data.dateOfDeparture);
                setAvailableSeats(res.data.availableSeats);
                setCostPerSeat(res.data.costPerSeat);
                setReportingTime(res.data.reportingTime);
                setDepartureTime(res.data.departureTime);
                setBoardingPoint(res.data.boardingPoint);
                setDroppingPoint(res.data.droppingPoint);
            })
    }, [params.id])

    let newbus = {
        name,
        dateOfDeparture,
        busNumber,
        from,
        to,
        numberOfSeats,
        availableSeats,
        costPerSeat,
        reportingTime,
        departureTime,
        boardingPoint,
        droppingPoint
    }

    function editBus(e) {
        e.preventDefault()
        axios.put(`http://localhost:8080/api/buses/${params.id}`, newbus)
            .then((res) => {
                console.log(res);
                alert("Bus Details Have been Edited Successfully")
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid Data Format")
            })
    }
    return (
        <div className='editbus'>
            <form onSubmit={editBus} action="">
                <label htmlFor="">Bus Name:</label>
                <input type="text" placeholder='Enter the bus Name' required value={name} onChange={(e) => { setname(e.target.value) }} />
                <label htmlFor="">From : </label>
                <input type="text" placeholder='Enter the From Details' required value={from} onChange={(e) => { setfrom(e.target.value) }} />
                <label htmlFor="">To : </label>
                <input type="text" placeholder='Enter the To Details' required value={to} onChange={(e) => { setto(e.target.value) }} />
                <label htmlFor="">Date Of Departure : </label>
                <input type="date" placeholder='Enter the bus Date' required value={dateOfDeparture} onChange={(e) => { setdate(e.target.value) }} />
                <label htmlFor="">Number Of Seats:</label>
                <input type="number" placeholder='Enter the total no. of seats' required value={numberOfSeats} onChange={(e) => { setseats(e.target.value) }} />
                <label htmlFor="">Available no. Of Seats:</label>
                <input type="number" placeholder='Enter the no. of available seats' required value={availableSeats} onChange={(e) => { setAvailableSeats(e.target.value) }} />
                <label htmlFor="">Cost per Seat:</label>
                <input type="number" placeholder='Enter cost per seat' required value={costPerSeat} onChange={(e) => { setCostPerSeat(e.target.value) }} />
                <label htmlFor="">Bus Number : </label>
                <input type="text" placeholder='Enter the bus Number' required value={busNumber} onChange={(e) => { setbusNumber(e.target.value) }} />
                <label htmlFor="">Reporting Time : </label>
                <input type="time" placeholder='Enter the Reporting Time' required value={reportingTime} onChange={(e) => { setReportingTime(e.target.value) }} />
                <label htmlFor="">Departure Time : </label>
                <input type="time" placeholder='Enter the Departure Time' required value={departureTime} onChange={(e) => { setDepartureTime(e.target.value) }} />
                <label htmlFor="">Boarding Point : </label>
                <input type="text" placeholder='Enter the Boarding Point' required value={boardingPoint} onChange={(e) => { setBoardingPoint(e.target.value) }} />
                <label htmlFor="">Dropping Point : </label>
                <input type="text" placeholder='Enter the Dropping Point' required value={droppingPoint} onChange={(e) => { setDroppingPoint(e.target.value) }} />
                <button className='btn btn-danger'>Update</button>
            </form>
        </div>
    )
}
