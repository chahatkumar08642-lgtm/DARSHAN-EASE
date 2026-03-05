require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Temple = require('../models/Temple');
const TimeSlot = require('../models/TimeSlot');

const seed = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([Admin.deleteMany(), Temple.deleteMany(), TimeSlot.deleteMany()]);

    console.log('Creating admin user...');
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@darshanease.com',
      password: 'Admin@123'
    });

    console.log('Creating sample temples...');
    const temples = await Temple.insertMany([
      {
        name: 'Shri Balaji Temple',
        location: 'Main Road',
        city: 'Hyderabad',
        state: 'Telangana',
        timings: { open: '05:00', close: '22:00' },
        facilities: ['Parking', 'Wheelchair Access', 'Prasadam Counter'],
        description: 'Popular Balaji temple with daily darshan and sevas.',
        crowdStatus: 'Moderate'
      },
      {
        name: 'Maha Kali Devi Temple',
        location: 'Old City',
        city: 'Pune',
        state: 'Maharashtra',
        timings: { open: '06:00', close: '21:30' },
        facilities: ['Parking', 'Drinking Water'],
        description: 'Historic Kali temple with special pujas on Tuesdays and Fridays.',
        crowdStatus: 'High'
      }
    ]);

    console.log('Creating sample time slots...');
    const now = new Date();

    const getDate = (offset) => {
      const d = new Date(now);
      d.setDate(d.getDate() + offset);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const slots = [];

    temples.forEach((temple) => {
      for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
        const baseDate = getDate(dayOffset);
        ['07:00-08:00', '09:00-10:00', '18:00-19:00'].forEach((range) => {
          const [startTime, endTime] = range.split('-');
          slots.push({
            temple: temple._id,
            date: baseDate,
            startTime,
            endTime,
            capacity: 100
          });
        });
      }
    });

    await TimeSlot.insertMany(slots);

    console.log('Seed completed.');
    console.log('Admin credentials:');
    console.log('  Email: admin@darshanease.com');
    console.log('  Password: Admin@123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seed error', error);
    process.exit(1);
  }
};

seed();

