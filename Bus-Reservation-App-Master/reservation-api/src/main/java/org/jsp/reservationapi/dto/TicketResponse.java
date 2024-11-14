package org.jsp.reservationapi.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketResponse {
	private int id;
	private LocalDate dateOfBooking;
	private double cost;
	private String status;
	private String busName;
	private String source;
	private String destination;
	private String busNumber;
	private LocalDate dateOfDeparture;
	private int numberOfSeatsBooked;
	private String username;
	private long phone;
	private int age;
	private String gender;
	private LocalTime reportingTime;
	private LocalTime departureTime;
	private String boardingPoint;
	private String droppingPoint;
}
