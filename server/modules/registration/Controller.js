const PatientRegn = require("../../models/PatientRegn");
const PaymentLedger = require("../../models/PaymentLedger");

const PatRegnController = {
  generateUHID: () => {
    return new Promise((resolve, reject) => {
      PatientRegn.findOne()
        .sort({ _id: -1 })
        .then((lastUser) => {
          let lastUserUHIDCount = +lastUser?.UHID?.split("D")[1] + 1;
          if (isNaN(lastUserUHIDCount)) {
            lastUserUHIDCount = "1";
          }
          const uid = `UHID${lastUserUHIDCount.toString().padStart(6, "0")}`;
          resolve(uid);
        })
        .catch((error) => {
          console.error("Error while generating UHID", error);
          reject(error);
        });
    });
  },
  generatePatientNo: () => {
    return new Promise((resolve, reject) => {
      PatientRegn.findOne()
        .sort({ _id: -1 })
        .then((lastUser) => {
          let lastUserPatCount = +lastUser?.patientNo?.split("T")[1] + 1;
          if (isNaN(lastUserPatCount)) {
            lastUserPatCount = "1";
          }
          const uid = `PAT${lastUserPatCount.toString().padStart(6, "0")}`;
          resolve(uid);
        })
        .catch((error) => {
          console.error("Error while generating Patient No", error);
          reject(error);
        });
    });
  },
  insertPayments: async (payments, newUHID) => {
    try {
      // Fetch the last billNo from the PaymentLedger collection
      const lastPayment = await PaymentLedger.findOne().sort({ _id: -1 });

      let lastBillNo = 1; // Default value if no last payment exists
      if (lastPayment && lastPayment.billNo) {
        // Extract the numeric part of the billNo and increment it
        lastBillNo = +lastPayment.billNo.split("LL")[1] + 1;
      }

      // Create an array of payment objects to insert
      const paymentDocs = await Promise.all(
        payments.map((x, index) => {
          const newBillNo = `BILL${(lastBillNo + index)
            .toString()
            .padStart(8, "0")}`;

          const newBill = {
            UHID: newUHID, // Assuming newUHID is already defined or passed in context
            location: "REGISTRATION",
            billNo: newBillNo, // Assign the generated billNo
            ...x, // Spread the rest of the properties from the payment data
          };

          return newBill; // Return the new bill object
        })
      );

      // Insert all payment documents at once using insertMany
      await PaymentLedger.insertMany(paymentDocs);

      console.log("All payments inserted successfully!");
    } catch (error) {
      console.error("Error inserting payments:", error);
    }
  },
};

module.exports = PatRegnController;
