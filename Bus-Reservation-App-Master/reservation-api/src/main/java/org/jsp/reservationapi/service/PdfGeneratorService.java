package org.jsp.reservationapi.service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.dto.TicketResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PdfGeneratorService {

	public ResponseEntity<ResponseStructure<byte[]>> generateTicketPdf(TicketResponse ticketResponse) {
		ResponseStructure<byte[]> responseStructure = new ResponseStructure<>();

		try (PDDocument document = new PDDocument()) {
			PDPage page = new PDPage();
			document.addPage(page);

			PDPageContentStream contentStream = new PDPageContentStream(document, page);

			// Add logo
			addLogo(document, contentStream);

			// Set title
			writeText(contentStream, "Bus10 Ticket", 220, 700, PDType1Font.HELVETICA_BOLD, 18, Color.RED);

			// Draw a line below the title
			contentStream.setNonStrokingColor(Color.BLACK);
			contentStream.moveTo(100, 690);
			contentStream.lineTo(500, 690);
			contentStream.stroke();

			// Passenger details
			addPassengerDetails(contentStream, ticketResponse);

			// Bus and travel details
			addBusDetails(contentStream, ticketResponse);

			// Terms and conditions
			addTermsAndConditions(contentStream);

			contentStream.close();

			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			document.save(byteArrayOutputStream);

			byte[] pdfBytes = byteArrayOutputStream.toByteArray();
			responseStructure.setData(pdfBytes);
			responseStructure.setMessage("PDF generated successfully");
			responseStructure.setStatusCode(HttpStatus.OK.value());

			return ResponseEntity.status(HttpStatus.OK).body(responseStructure);
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Error generating PDF", e);
		}
	}

	private void addLogo(PDDocument document, PDPageContentStream contentStream) throws IOException {
		// Load logo image from resources
		InputStream logoInputStream = getClass().getResourceAsStream("/Img/bus10.png");
		if (logoInputStream == null) {
			throw new IOException("Cannot load resource: /Img/bus10.png");
		}

		// Create PDImageXObject from InputStream
		PDImageXObject logo = PDImageXObject.createFromByteArray(document, logoInputStream.readAllBytes(), "bus10.png");

		// Draw the image
		contentStream.drawImage(logo, 35, 700, 70, 70);

		// Close the InputStream
		logoInputStream.close();
	}

	private void addPassengerDetails(PDPageContentStream contentStream, TicketResponse ticketResponse)
			throws IOException {
		writeText(contentStream, "Name: " + ticketResponse.getUsername(), 100, 650, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLACK);
		writeText(contentStream, "Age: " + ticketResponse.getAge(), 350, 650, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLACK);
		writeText(contentStream, "Gender: " + ticketResponse.getGender(), 100, 630, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLACK);
		writeText(contentStream, "Phone No.: " + ticketResponse.getPhone(), 350, 630, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLACK);
	}
	

	private void addBusDetails(PDPageContentStream contentStream, TicketResponse ticketResponse) throws IOException {
		writeText(contentStream, "Date: " + ticketResponse.getDateOfDeparture(), 230, 670, PDType1Font.HELVETICA_BOLD,
				12, Color.BLUE);
		writeText(contentStream, "Bus Name: " + ticketResponse.getBusName(), 100, 600, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLUE);
		writeText(contentStream, "Bus Number: " + ticketResponse.getBusNumber(), 350, 600, PDType1Font.HELVETICA_BOLD,
				12, Color.BLUE);
		writeText(contentStream, "From: " + ticketResponse.getSource(), 100, 580, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLUE);
		writeText(contentStream, "To: " + ticketResponse.getDestination(), 350, 580, PDType1Font.HELVETICA_BOLD, 12,
				Color.BLUE);
		writeText(contentStream, "Reporting Time: " + ticketResponse.getReportingTime(), 100, 560,
				PDType1Font.HELVETICA_BOLD, 12, Color.BLUE);
		writeText(contentStream, "Departure Time: " + ticketResponse.getDepartureTime(), 350, 560,
				PDType1Font.HELVETICA_BOLD, 12, Color.BLUE);
		writeText(contentStream, "Boarding Point: " + ticketResponse.getBoardingPoint(), 100, 540,
				PDType1Font.HELVETICA_BOLD, 12, Color.BLUE);
		writeText(contentStream, "Dropping Point: " + ticketResponse.getDroppingPoint(), 100, 520,
				PDType1Font.HELVETICA_BOLD, 12, Color.BLUE);
	}

	private void addTermsAndConditions(PDPageContentStream contentStream) throws IOException {
		writeText(contentStream, "Terms and Conditions:", 40, 500, PDType1Font.HELVETICA, 10, Color.GRAY);
		writeText(contentStream, "The arrival and departure times mentioned on the ticket are only tentative timings.",
				40, 480, PDType1Font.HELVETICA, 10, Color.GRAY);
		writeText(contentStream,
				"Passengers are requested to arrive at the boarding point at least 15 min. before the scheduled time of departure.",
				40, 460, PDType1Font.HELVETICA, 10, Color.GRAY);
		writeText(contentStream, "We are not responsible for any accidents or loss of passenger belongings.", 40, 440,
				PDType1Font.HELVETICA, 10, Color.GRAY);
		writeText(contentStream,
				"We are not responsible for any delay or inconvenience during the journey due to breakdown of the vehicle or other",
				40, 420, PDType1Font.HELVETICA, 10, Color.GRAY);
		writeText(contentStream, "reasons beyond our control.", 40, 400, PDType1Font.HELVETICA, 10, Color.GRAY);
	}

	private void writeText(PDPageContentStream contentStream, String text, float x, float y, PDType1Font font,
			float fontSize, Color color) throws IOException {
		contentStream.beginText();
		contentStream.setFont(font, fontSize);
		contentStream.setNonStrokingColor(color);
		contentStream.newLineAtOffset(x, y);
		contentStream.showText(text);
		contentStream.endText();
	}
}
