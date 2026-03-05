const Booking = require('../models/Booking');
const TimeSlot = require('../models/TimeSlot');
const Temple = require('../models/Temple');
const generateQrCodeDataUrl = require('../utils/generateQrCode');
const { sendEmail } = require('../config/email');

const createBooking = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { templeId, timeSlotId, attendees = 1 } = req.body;

    const slot = await TimeSlot.findById(timeSlotId);
    if (!slot || !slot.isActive) {
      return res.status(400).json({ message: 'Invalid or inactive time slot' });
    }
    if (String(slot.temple) !== String(templeId)) {
      return res.status(400).json({ message: 'Time slot does not belong to selected temple' });
    }
    if (slot.bookedCount + attendees > slot.capacity) {
      return res
        .status(400)
        .json({ message: 'Selected time slot is full for requested attendees' });
    }

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    const qrPayload = JSON.stringify({
      userId,
      templeId,
      timeSlotId,
      attendees,
      createdAt: new Date().toISOString()
    });

    const qrCodeDataUrl = await generateQrCodeDataUrl(qrPayload);

    const booking = await Booking.create({
      user: userId,
      temple: templeId,
      timeSlot: timeSlotId,
      attendees,
      status: 'PENDING',
      qrCodeDataUrl
    });

    slot.bookedCount += attendees;
    await slot.save();

    try {
      await sendEmail({
        to: req.user.email,
        subject: 'Darshan Booking Confirmation - Darshan Ease',
        html: `<p>Dear ${req.user.name},</p>
          <p>Your booking has been created for <strong>${temple.name}</strong>.</p>
          <p>Date: ${new Date(slot.date).toDateString()}<br/>
             Time: ${slot.startTime} - ${slot.endTime}<br/>
             Attendees: ${attendees}</p>
          <p>Please show the QR code at the temple for verification.</p>`
      });
    } catch (emailErr) {
      console.warn('Failed to send booking email', emailErr.message);
    }

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('temple')
      .populate('timeSlot')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('user')
      .populate('temple')
      .populate('timeSlot')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user')
      .populate('temple')
      .populate('timeSlot');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const { status } = req.body;
    if (!['PENDING', 'CONFIRMED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    booking.status = status;
    await booking.save();

    try {
      await sendEmail({
        to: booking.user.email,
        subject: `Booking ${status} - Darshan Ease`,
        html: `<p>Dear ${booking.user.name},</p>
          <p>Your booking for <strong>${booking.temple.name}</strong> on 
          ${new Date(booking.timeSlot.date).toDateString()} (${booking.timeSlot.startTime} - ${
            booking.timeSlot.endTime
          }) has been <strong>${status}</strong>.</p>`
      });
    } catch (emailErr) {
      console.warn('Failed to send status email', emailErr.message);
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user')
      .populate('temple')
      .populate('timeSlot');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  getBookingById
};

