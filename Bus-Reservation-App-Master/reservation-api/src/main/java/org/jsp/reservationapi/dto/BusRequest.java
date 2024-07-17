package org.jsp.reservationapi.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class BusRequest {
	private int id;
	private String name;
	private String busNumber;
	private LocalDate dateOfDeparture;
	private String from;
	private String to;
	private int numberOfSeats;
	private double costPerSeat;
	private int availableSeats;
	private LocalTime reportingTime;
    private LocalTime departureTime; 
    private String boardingPoint; 
    private String droppingPoint; 
}
