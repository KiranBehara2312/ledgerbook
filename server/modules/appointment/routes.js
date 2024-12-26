const express = require("express");
const appointmentRoutes = express.Router();
const AppointmentController = require("./Controller");
const { convertTo24HourFormat } = require("../../helpers");

appointmentRoutes.post("/daySlotGeneration", async (req, res) => {
  try {
    const { fromTime, toTime, slotDuration, timeGap } = req.body;
    const startTime = convertTo24HourFormat(fromTime);
    const endTime = convertTo24HourFormat(toTime);
    const slots = AppointmentController.generateTimeSlots(
      startTime,
      endTime,
      slotDuration,
      timeGap
    );
    res.status(200).json({
      message: "Doctor Slots generated successfully",
      data: slots,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error Generating slots",
      error: err.message || err,
    });
  }
});

module.exports = appointmentRoutes;
