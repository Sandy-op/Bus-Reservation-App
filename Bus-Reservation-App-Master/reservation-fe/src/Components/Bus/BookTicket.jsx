import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/BookTicket.css'

const BookTicket = () => {
  const navigate = useNavigate();
  const { busId, userId, numberOfSeats } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketResponse, setTicketResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/tickets/${busId}/${userId}/${numberOfSeats}`
      );
      setTicketResponse(response.data);
    } catch (error) {
      setError(error.response.data.message); // Assuming error response structure from backend
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tickets/download/${ticketResponse.id}`, {
        responseType: 'blob', // Important for binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket_${ticketResponse.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert('Ticket downloded sucessfully, Happy Journey...');
      navigate('/');
    } catch (error) {
      console.error('Error downloading the PDF', error);
    }
  };

  return (
    <div className="book-ticket">
      <h2>Book Ticket</h2>
      <p>Bus ID: {busId}</p>
      <p>User ID: {userId}</p>
      <p>Number of Seats: {numberOfSeats}</p>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Booking...' : 'Book Ticket'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {ticketResponse && (
        <div className="ticket-response">
          <h3>Ticket Booked Successfully!</h3>
          <p>Ticket ID: {ticketResponse.id}</p>
          <p>Name: {ticketResponse.username}</p>
          <p>Age: {ticketResponse.age}</p>
          <p>Gender: {ticketResponse.gender}</p>
          <p>Phone No.: {ticketResponse.phone}</p>
          <p>Cost: {ticketResponse.cost}</p>
          <p>Status: {ticketResponse.status}</p>
          <p>Bus Name: {ticketResponse.busName}</p>
          <p>Source: {ticketResponse.source}</p>
          <p>Destination: {ticketResponse.destination}</p>
          <p>Bus Number: {ticketResponse.busNumber}</p>
          <p>Date Of Departure: {ticketResponse.dateOfDeparture}</p>
          <p>Number of Seat Booked: {ticketResponse.numberOfSeatsBooked}</p>
          <p>Reporting Time:{ticketResponse.reportingTime}</p>
          <p>Departure Time:{ticketResponse.departureTime}</p>
          <p>Boarding Point:{ticketResponse.boardingPoint}</p>
          <p>Dropping Point:{ticketResponse.droppingPoint}</p>
          <button onClick={handleDownload}>Download Ticket PDF</button>
        </div>
      )}
    </div>
  );
};

export default BookTicket;
