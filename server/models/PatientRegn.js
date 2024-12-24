const mongoose = require("mongoose");
const { calculateAge } = require("../helpers");

const PatientRegnSchema = new mongoose.Schema(
  {
    UHID: {
      type: String,
      uppercase: true,
      unique: true,
      trim: true,
      minlength: [10, "UHID cannot be shorter than 10 characters"],
      maxlength: [10, "UHID cannot be longer than 10 characters"],
      match: [/^[A-Z0-9]+$/, "UHID must be alphanumeric"],
    },
    patientNo: {
      type: String,
      uppercase: true,
      unique: true,
      trim: true,
      minlength: [9, "Patient Number cannot be shorter than 9 characters"],
      maxlength: [9, "Patient Number cannot be longer than 9 characters"],
      match: [/^[A-Z0-9]+$/, "Patient Number must be alphanumeric"],
    },
    patientType: {
      type: String,
      required: true,
    },
    registrationType: {
      type: String,
      required: true,
    },
    visitType: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    salutation: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
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
    ageString: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    contactNumber: {
      type: String,
      default: true,
    },
    alternateMobileNo: {
      type: String,
    },
    addressLineOne: {
      type: String,
      required: true,
    },
    addressLineTwo: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
    },
    doctor: {
      type: String,
    },
    // doctorConsultationFee: {
    //   type: Number,
    // },
    // paymentStatus: {
    //   type: String,
    //   required: true,
    // },
    // paymentType: {
    //   type: String,
    //   required: true,
    // },
    // payeeName: {
    //   type: String,
    //   required: true,
    // },
    // transactionId: {
    //   type: String,
    // },
    registrationDate: {
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
PatientRegnSchema.pre("save", function (next) {
  this.fullName = `${this.salutation} ${this.firstName} ${this.middleName} ${this.lastName}`;
  this.ageString = calculateAge(this.dateOfBirth)?.string;
  next();
});
const PatientRegn = mongoose.model("PatientRegn", PatientRegnSchema);

module.exports = PatientRegn;
