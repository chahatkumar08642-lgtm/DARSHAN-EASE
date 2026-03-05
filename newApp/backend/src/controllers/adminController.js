const Booking = require('../models/Booking');
const TimeSlot = require('../models/TimeSlot');

const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const totalBookings = await Booking.countDocuments();

    const bookingsPerDay = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);

    const peakHours = await Booking.aggregate([
      {
        $lookup: {
          from: 'timeslots',
          localField: 'timeSlot',
          foreignField: '_id',
          as: 'slot'
        }
      },
      { $unwind: '$slot' },
      {
        $group: {
          _id: '$slot.startTime',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const activeSlots = await TimeSlot.countDocuments({ isActive: true });

    res.json({
      todayBookings,
      totalBookings,
      activeSlots,
      bookingsPerDay,
      peakHours
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};

