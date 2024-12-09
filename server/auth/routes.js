const express = require("express");
const User = require("../models/User");
const authoutes = express.Router();
const mongoose = require("mongoose");

// POST route to add a new user
authoutes.post("/add-user", async (req, res) => {
  try {
    const newUser = new User({
      userName: "Kiran",
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User added successfully",
      user: savedUser,
    });
  } catch (err) {
    // Handle errors
    res.status(400).json({
      message: "Error adding user",
      error: err.message || err,
    });
  }
});

authoutes.post("/register", async (req, res) => {
  const { password, firstName, lastName, userName, contactNumber } = req.body;

  try {
    // Check if email or contactNumber already exists
    const existingUser = await User.findOne({
      $or: [{ userName }, { contactNumber }],
    });
    const totalDocuments = (await User.countDocuments()) ?? 0;
    const firstFourChartacter = `${
      firstName[0] +
      firstName[1] +
      lastName[0] +
      lastName[1]
    }`;
    const userName = `${firstFourChartacter.toUpperCase()+totalDocuments.toString().padStart(2,"0")}`
    if (existingUser) {
      return res.status(400).json({
        message: "Already registered, please login to proceed.",
      });
    }

    // Create a new user instance
    const newUser = new User({
      password,
      firstName,
      lastName,
      userName,
      contactNumber,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

module.exports = authoutes;
