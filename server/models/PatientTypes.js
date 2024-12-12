const mongoose = require("mongoose");

const patientTypeSchema = new mongoose.Schema(
  {
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
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const PatientTypes = mongoose.model("PatientTypes", patientTypeSchema);

module.exports = PatientTypes;
