const express = require("express");
const States = require("../../models/States");
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

module.exports = masterRoutes;
