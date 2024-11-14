package org.jsp.reservationapi.service;

import java.util.Optional;

import org.jsp.reservationapi.dao.BusDao;
import org.jsp.reservationapi.dao.TicketDao;
import org.jsp.reservationapi.dao.UserDao;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.dto.TicketResponse;
import org.jsp.reservationapi.exception.BusNotFoundException;
import org.jsp.reservationapi.exception.UserNotFoundException;
import org.jsp.reservationapi.model.Bus;
import org.jsp.reservationapi.model.Ticket;
import org.jsp.reservationapi.model.User;
import org.jsp.reservationapi.util.AccountStatus;
import org.jsp.reservationapi.util.TicketStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
	@Autowired
	private TicketDao ticketDao;
	@Autowired
	private BusDao busDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private PdfGeneratorService pdfGeneratorService;

	public TicketResponse bookTicket(int userId, int busId, int numberOfSeats) {
		Optional<Bus> recBus = busDao.findById(busId);
		Optional<User> recUser = userDao.findById(userId);

		if (recBus.isEmpty())
			throw new BusNotFoundException("Cannot Book Ticket as Bus Id is Invalid");
		if (recUser.isEmpty())
			throw new UserNotFoundException("Cannot Book Ticket as User Id is Invalid");

		User dbUser = recUser.get();
		if (dbUser.getStatus().equals(AccountStatus.IN_ACTIVE.toString()))
			throw new IllegalStateException("Please Activate Your Account, Then book tickets");

		Bus dbBus = recBus.get();
		if (dbBus.getAvailableSeats() < numberOfSeats)
			throw new IllegalArgumentException("Insufficient seats");

		Ticket ticket = new Ticket();
		ticket.setCost(numberOfSeats * dbBus.getCostPerSeat());
		ticket.setStatus(TicketStatus.BOOKED.toString());
		ticket.setBus(dbBus);// Assigning Bus to ticket
		ticket.setUser(dbUser);// Assigning User to ticket
		ticket.setNumberOfSeatsBooked(numberOfSeats);
		dbBus.getBookedTickets().add(ticket);// Adding ticket to bus
		dbUser.getTickets().add(ticket);// Adding Ticket to User
		dbBus.setAvailableSeats(dbBus.getAvailableSeats() - numberOfSeats);
		userDao.saveUser(dbUser);// Updating User
		busDao.saveBus(dbBus);// Updating Bus
		ticket = ticketDao.saveTicket(ticket);
		return mapToTicketResponse(ticket, dbBus, dbUser);
	}

	public TicketResponse mapToTicketResponse(Ticket ticket, Bus bus, User user) {
		TicketResponse ticketResponse = new TicketResponse();
		ticketResponse.setAge(user.getAge());
		ticketResponse.setBusName(bus.getName());
		ticketResponse.setBusNumber(bus.getBusNumber());
		ticketResponse.setCost(ticket.getCost());
		ticketResponse.setDateOfBooking(ticket.getDateOfBooking());
		ticketResponse.setDateOfDeparture(bus.getDateOfDeparture());
		ticketResponse.setDestination(bus.getTo());
		ticketResponse.setGender(user.getGender());
		ticketResponse.setId(ticket.getId());
		ticketResponse.setNumberOfSeatsBooked(ticket.getNumberOfSeatsBooked());
		ticketResponse.setPhone(user.getPhone());
		ticketResponse.setSource(bus.getFrom());
		ticketResponse.setStatus(ticket.getStatus());
		ticketResponse.setUsername(user.getName());
		ticketResponse.setReportingTime(bus.getReportingTime());
	    ticketResponse.setDepartureTime(bus.getDepartureTime());
	    ticketResponse.setBoardingPoint(bus.getBoardingPoint());
	    ticketResponse.setDroppingPoint(bus.getDroppingPoint());
		return ticketResponse;

	}

	public ResponseEntity<ResponseStructure<TicketResponse>> findById(int id) {
		ResponseStructure<TicketResponse> structure = new ResponseStructure<>();
		Optional<Ticket> dbTicket = ticketDao.findById(id);
		if (dbTicket.isPresent()) {
			Ticket ticket = dbTicket.get();
			User user = ticket.getUser();
			Bus bus = ticket.getBus();
			structure.setData(mapToTicketResponse(ticket, bus, user));
			structure.setMessage("Ticket Found");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid Ticket Id");
	}

	public ResponseEntity<byte[]> downloadTicketPdf(int id) {
		Optional<Ticket> dbTicket = ticketDao.findById(id);
		if (dbTicket.isPresent()) {
			Ticket ticket = dbTicket.get();
			User user = ticket.getUser();
			Bus bus = ticket.getBus();
			TicketResponse ticketResponse = mapToTicketResponse(ticket, bus, user);

			ResponseEntity<ResponseStructure<byte[]>> pdfResponseEntity = pdfGeneratorService
					.generateTicketPdf(ticketResponse);
			byte[] pdfBytes = pdfResponseEntity.getBody().getData();
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("attachment", "ticket.pdf");
			headers.setContentLength(pdfBytes.length);

			return ResponseEntity.status(HttpStatus.OK).headers(headers).contentType(MediaType.APPLICATION_PDF)
					.body(pdfBytes);

		}
		throw new UserNotFoundException("Invalid Ticket Id");
	}

}
