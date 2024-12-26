const AppointmentController = {
  generateTimeSlots: (startTime, endTime, slotDuration, gapDuration) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(startTime.hours, startTime.minutes, 0, 0);

    const endTimeDate = new Date();
    endTimeDate.setHours(endTime.hours, endTime.minutes, 0, 0);

    while (currentTime < endTimeDate) {
      // Calculate the end time for the current slot
      let slotEndTime = new Date(currentTime);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + slotDuration);

      // Format start and end times
      let formattedStartTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      let formattedEndTime = slotEndTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      slots.push({
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });

      // Move currentTime forward by the slot duration + gap
      currentTime.setMinutes(
        currentTime.getMinutes() + slotDuration + gapDuration
      );
    }

    return slots;
    // Set the time range (2:00 PM to 10:00 PM)
    // const startTime = { hours: 14, minutes: 0 }; // 2:00 PM
    // const endTime = { hours: 22, minutes: 0 }; // 10:00 PM
    // const slotDuration = 15; // 15 minutes per slot
    // const gapDuration = 1; // 1-minute gap between slots
  },

};

module.exports = AppointmentController;
