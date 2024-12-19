const PatientRegn = require("../../models/PatientRegn");

const PatRegnController = {
  generateUHID: async () => {
    let totalDocuments = (await PatientRegn.countDocuments()) ?? 0;
    if (totalDocuments === 0) {
      totalDocuments = totalDocuments + 1;
    }
    const UHID = `UHID${totalDocuments.toString().padStart(6, "0")}`;
    return UHID;
  },
  generatePatientNo: async () => {
    let totalDocuments = (await PatientRegn.countDocuments()) ?? 0;
    if (totalDocuments === 0) {
      totalDocuments = totalDocuments + 1;
    }
    const patientNo = `PAT${totalDocuments.toString().padStart(6, "0")}`;
    return patientNo;
  },
};

module.exports = PatRegnController;
