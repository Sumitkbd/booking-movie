const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let bookings = [];

// Endpoint to book a seat
app.post('/book-seat', (req, res) => {
    const { name, seatNumber } = req.body;
    const existingBooking = bookings.find(b => b.seatNumber === seatNumber);

    if (existingBooking) {
        res.status(400).send({ message: 'Seat already booked' });
    } else {
        bookings.push({ name, seatNumber });
        res.status(201).send({ message: 'Booking successful' });
    }
});

// Endpoint to get all bookings
app.get('/bookings', (req, res) => {
    res.send(bookings);
});

// Endpoint to update a booking
app.put('/bookings/:seatNumber', (req, res) => {
    const seatNumber = req.params.seatNumber;
    const { name } = req.body;
    const booking = bookings.find(booking => booking.seatNumber === seatNumber);
    if (booking) {
        booking.name = name;
        res.send({ message: 'Booking updated' });
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

// Endpoint to delete a booking
app.delete('/bookings/:seatNumber', (req, res) => {
    const seatNumber = req.params.seatNumber;
    bookings = bookings.filter(booking => booking.seatNumber !== seatNumber);
    res.send({ message: 'Booking deleted' });
});

// Endpoint to find a slot
app.get('/find-slot/:seatNumber', (req, res) => {
    const seatNumber = req.params.seatNumber;
    const booking = bookings.find(b => b.seatNumber === seatNumber);
    if (booking) {
        res.send({ booked: true, name: booking.name });
    } else {
        res.send({ booked: false });
    }
});

// Endpoint to get the total number of bookings
app.get('/total-bookings', (req, res) => {
    res.send({ total: bookings.length });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
