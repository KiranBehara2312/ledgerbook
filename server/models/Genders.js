const mongoose = require("mongoose");

const genderSchema = new mongoose.Schema(
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

const Genders = mongoose.model("Genders", genderSchema);

module.exports = Genders;
