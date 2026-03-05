const TimeSlot = require('../models/TimeSlot');

const getTimeSlotsForTemple = async (req, res, next) => {
  try {
    const { templeId } = req.params;
    const slots = await TimeSlot.find({
      temple: templeId,
      date: { $gte: new Date() },
      isActive: true
    }).sort({ date: 1, startTime: 1 });
    res.json(slots);
  } catch (error) {
    next(error);
  }
};

const createTimeSlot = async (req, res, next) => {
  try {
    const { templeId } = req.params;
    const { date, startTime, endTime, capacity } = req.body;

    const slot = await TimeSlot.create({
      temple: templeId,
      date,
      startTime,
      endTime,
      capacity
    });

    res.status(201).json(slot);
  } catch (error) {
    next(error);
  }
};

const updateTimeSlot = async (req, res, next) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!slot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    res.json(slot);
  } catch (error) {
    next(error);
  }
};

const deleteTimeSlot = async (req, res, next) => {
  try {
    const slot = await TimeSlot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    res.json({ message: 'Time slot deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTimeSlotsForTemple,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
};

