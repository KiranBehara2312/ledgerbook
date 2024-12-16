const User = require("../../models/User");

const DoctorController = {
  registerDoctor: async (payload, res) => {
    const { firstName, lastName, contactNumber } = payload;

    const existingUser = await User.findOne({
      $or: [{ contactNumber }],
    });
    const totalDocuments = (await User.countDocuments()) ?? 0;
    if (totalDocuments === 0) {
      totalDocuments = totalDocuments + 1;
    }
    const userName = `D${totalDocuments.toString().padStart(4, "0")}`;
    if (existingUser) {
      return res.status(400).json({
        message: "Already registered, please login to proceed.",
      });
    }
    // Create a new user instance
    const newDoctorUser = new User({
      password: "Simba@1234",
      firstName,
      lastName,
      userName,
      role: "DOCTOR",
      contactNumber,
    });
    await newDoctorUser.save();
    return userName;
  },
};

// export default DoctorController;
module.exports = DoctorController;
