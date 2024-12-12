const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema(
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

const BloodGroups = mongoose.model("BloodGroups", bloodSchema);

module.exports = BloodGroups;
