const express = require("express");
const Doctor = require("../../models/Doctor");
const DoctorController = require("./Controller");
const doctorRoutes = express.Router();

doctorRoutes.post("/doctors", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Doctor.countDocuments();
    const doctors = await Doctor.find(
      { isActive: true },
      { _id: false, __v : false, isActive: false }
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

doctorRoutes.post("/add", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newDocUserName = await DoctorController.registerDoctor(req.body, res);
    console.log("newDocUserName ---> ", newDocUserName);
    const newDoctor = new Doctor({
      ...req.body,
      userName: newDocUserName,
    });
    await newDoctor.save();
    res.status(201).json({
      message: "Doctor registered successfully",
      newDocUserName,
      firstName,
      lastName,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while saving Doctor",
      error: err.message || err,
    });
  }
});

module.exports = doctorRoutes;
