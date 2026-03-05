const Temple = require('../models/Temple');
const TimeSlot = require('../models/TimeSlot');
const Booking = require('../models/Booking');

const getTemples = async (req, res, next) => {
  try {
    const { search, city, state } = req.query;
    const filter = { isActive: true };

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (city) filter.city = city;
    if (state) filter.state = state;

    const temples = await Temple.find(filter).sort({ name: 1 });
    res.json(temples);
  } catch (error) {
    next(error);
  }
};

const getTempleById = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    const upcomingSlots = await TimeSlot.find({
      temple: temple._id,
      date: { $gte: new Date() },
      isActive: true
    })
      .sort({ date: 1, startTime: 1 })
      .limit(20);

    res.json({ temple, upcomingSlots });
  } catch (error) {
    next(error);
  }
};

const createTemple = async (req, res, next) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    next(error);
  }
};

const updateTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.json(temple);
  } catch (error) {
    next(error);
  }
};

const deleteTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    await TimeSlot.deleteMany({ temple: temple._id });
    await Booking.deleteMany({ temple: temple._id });
    res.json({ message: 'Temple and related data deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple
};

