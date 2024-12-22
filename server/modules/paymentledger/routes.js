const express = require("express");
const PaymentLedger = require("../../models/PaymentLedger");
const paymentLedgerRoutes = express.Router();

paymentLedgerRoutes.post("/history", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await PaymentLedger.countDocuments();
    const doctors = await PaymentLedger.find(
      {},
      { _id: false, __v: false, billNoCounter: false }
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
      message: "Error fetching Payment Ledgers",
      error: err.message || err,
    });
  }
});

module.exports = paymentLedgerRoutes;
