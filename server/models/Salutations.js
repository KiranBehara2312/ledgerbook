const mongoose = require("mongoose");

const salutationSchema = new mongoose.Schema(
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

const Salutations = mongoose.model("Salutations", salutationSchema);

module.exports = Salutations;
