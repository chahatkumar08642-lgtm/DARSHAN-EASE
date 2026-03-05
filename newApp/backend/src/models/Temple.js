const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    timings: {
      open: { type: String },
      close: { type: String }
    },
    facilities: [
      {
        type: String
      }
    ],
    description: {
      type: String
    },
    crowdStatus: {
      type: String,
      enum: ['Low', 'Moderate', 'High'],
      default: 'Low'
    },
    latitude: Number,
    longitude: Number,
    images: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Temple', templeSchema);

