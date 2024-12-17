const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    alternateMobileNo: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    medicalLicenseNumber: {
      type: String,
      required: true,
    },
    shiftTimings: {
      type: String,
      required: true,
    },
    availableDays: {
      type: Array,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    isOnLeave: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
