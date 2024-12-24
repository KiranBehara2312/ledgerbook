const express = require("express");
const States = require("../../models/States");
const Salutations = require("../../models/Salutations");
const Genders = require("../../models/Genders");
const BloodGroups = require("../../models/BloodGroups");
const PatientTypes = require("../../models/PatientTypes");
const Countries = require("../../models/Countries");
const User = require("../../models/User");
const masterRoutes = express.Router();

masterRoutes.post("/states", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await States.countDocuments();
    const states = await States.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: states,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching states",
      error: err.message || err,
    });
  }
});

masterRoutes.post("/users", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await User.countDocuments();
    const users = await User.find(
      { isActive: true },
      { _id: false, isActive: false, password: false, __v : false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Users",
      error: err.message || err,
    });
  }
});

masterRoutes.post("/salutations", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Salutations.countDocuments();
    const salutations = await Salutations.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: salutations,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching salutations",
      error: err.message || err,
    });
  }
});
masterRoutes.post("/genders", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Genders.countDocuments();
    const genders = await Genders.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: genders,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching genders",
      error: err.message || err,
    });
  }
});
masterRoutes.post("/bloodGroups", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await BloodGroups.countDocuments();
    const bloodGroups = await BloodGroups.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: bloodGroups,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Blood Groups",
      error: err.message || err,
    });
  }
});
masterRoutes.post("/patientTypes", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await PatientTypes.countDocuments();
    const patientTypes = await PatientTypes.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: patientTypes,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Patient Types",
      error: err.message || err,
    });
  }
});
masterRoutes.post("/countries", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Countries.countDocuments();
    const countries = await Countries.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: countries,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Countries",
      error: err.message || err,
    });
  }
});

module.exports = masterRoutes;
