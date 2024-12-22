const express = require("express");
const PatientRegn = require("../../models/PatientRegn");
const patientRoutes = express.Router();

patientRoutes.post("/all", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await PatientRegn.countDocuments();
    const patients = await PatientRegn.find(
      { isActive: true },
      { _id: false, __v: false, isActive: false, doctor: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: patients,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Patients",
      error: err.message || err,
    });
  }
});

module.exports = patientRoutes;
