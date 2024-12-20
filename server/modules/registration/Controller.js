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
  generateBillNo: () => {
    return new Promise((resolve, reject) => {
      PaymentLedger.findOne()
        .sort({ _id: -1 })
        .then((lastPayment) => {
          let lastBillNo = +lastPayment?.billNo?.split("LL")[1] + 1;
          if (isNaN(lastBillNo)) {
            lastBillNo = "1";
          }
          const uid = `BILL${lastBillNo.toString().padStart(8, "0")}`;
          resolve(uid);
        })
        .catch((error) => {
          console.error("Error while generating Bill No", error);
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

  generateUHdID: () => {
    let uhid = "";
    // (await PatientRegn.countDocuments()) ?? 0;
    // if (totalDocuments === 0) {
    //   totalDocuments = totalDocuments + 1;
    // }
    // const UHID = `UHID${totalDocuments.toString().padStart(6, "0")}`;

    PatientRegn.findOne()
      .sort({ _id: -1 })
      .then((lastUser) => {
        let lastUserUHIDCount = +lastUser?.UHID?.split("D")[1] + 1;
        if (isNaN(lastUserUHIDCount)) {
          lastUserUHIDCount = "1";
        }
        console.log("UHID", lastUserUHIDCount.toString().padStart(6, "0"));
        const uid = `UHID${lastUserUHIDCount.toString().padStart(6, "0")}`;
        uhid = uid;
      })
      .catch((error) => {
        console.error("Error while generating UHID", error);
      });
    return uhid;
  },
  generatePatizzzzentNo: () => {
    let patNo = "";
    // let totalDocuments = (await PatientRegn.countDocuments()) ?? 0;
    // if (totalDocuments === 0) {
    //   totalDocuments = totalDocuments + 1;
    // }
    // const patientNo = `PAT${totalDocuments.toString().padStart(6, "0")}`;
    // return patientNo;
    PatientRegn.findOne()
      .sort({ _id: -1 })
      .then((lastUser) => {
        let lastUserPatCount = +lastUser?.patientNo.split("D")[1] + 1;
        if (isNaN(lastUserPatCount)) {
          lastUserPatCount = "1";
        }
        const pid = `PAT${lastUserPatCount.toString().padStart(6, "0")}`;
        patNo = pid;
        console.log("Pat No", pid);
      })
      .catch((error) => {
        console.error("Error while generating patient No", error);
      });
    return patNo;
  },
  generatezzzBillID: () => {
    let billNo = "";
    // let totalDocuments = (await PaymentLedger.countDocuments()) ?? 0;
    // if (totalDocuments === 0 || totalDocuments === 1) {
    //   totalDocuments = totalDocuments + 1;
    // }
    // const BILL_ID = `BILL${totalDocuments.toString().padStart(8, "0")}`;
    // return BILL_ID;

    PaymentLedger.findOne()
      .sort({ _id: -1 })
      .then((lastUser) => {
        let lastBillNo = +lastUser?.billNo.split("LL")[1] + 1;
        if (isNaN(lastBillNo)) {
          lastBillNo = "1";
        }
        const bid = `BILL${lastBillNo.toString().padStart(8, "0")}`;
        console.log("Bill No", bid);
        billNo = bid;
      })
      .catch((error) => {
        console.error("Error while generating Bill No", error);
      });
    return billNo;
  },
};

module.exports = PatRegnController;
