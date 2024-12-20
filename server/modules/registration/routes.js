const express = require("express");
const PatRegnController = require("./Controller");
const PatientRegn = require("../../models/PatientRegn");
const PaymentLedger = require("../../models/PaymentLedger");
const registrationRoutes = express.Router();

registrationRoutes.post("/doctors", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Doctor.countDocuments();
    const doctors = await Doctor.find(
      { isActive: true },
      { _id: false, __v: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching doctors",
      error: err.message || err,
    });
  }
});

registrationRoutes.post("/create", async (req, res) => {
  try {
    const newUHID = await PatRegnController.generateUHID();
    const newPatinetNo = await PatRegnController.generatePatientNo();
    if (!newUHID || !newPatinetNo) {
      res.status(400).json({
        message: "Error while saving Patient",
        error: "Error while generating New UHID or New Patient No",
      });
    }
    console.log(newUHID);
    const newPatient = new PatientRegn({
      ...req.body,
      UHID: newUHID,
      patientNo: newPatinetNo,
    });
    await newPatient.save();
    const { payments } = req.body;
    await PatRegnController.insertPayments(payments, newUHID);
    // payments?.map(async (x) => {
    //   const newBillId = await PatRegnController.generateBillNo();
    //   const newBill = new PaymentLedger({
    //     //  billNo: newBillId,
    //     UHID: newUHID,
    //     ...x,
    //     location: "REGISTRATION",
    //   });
    //   await newBill.save();
    // });
    res.status(201).json({
      message: "Patient registered successfully",
      UHID: newUHID,
      patientNo: newPatinetNo,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while saving Patient",
      error: err.message || err,
    });
  }
});

registrationRoutes.post("/update/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { firstName, lastName, userName, ...rest } = req.body;
    const result = await Doctor.updateOne(
      { userName: doctorId },
      { $set: { ...req.body } },
      { runValidators: true }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "Doctor not found or no changes made",
      });
    }

    res.status(200).json({
      message: "Doctor updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while updating Doctor",
      error: err.message || err,
    });
  }
});

module.exports = registrationRoutes;
