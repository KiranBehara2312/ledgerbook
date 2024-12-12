const mongoose = require("mongoose");

// Create the user schema
const stateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shortName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
  },
});

const States = mongoose.model("States", stateSchema);

module.exports = States;
