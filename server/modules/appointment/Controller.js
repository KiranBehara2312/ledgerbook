const AppointmentController = {
  generateTimeSlots: (startDate, endDate, slotDuration, gapDuration) => {
    let slots = [];
    let currentTime = new Date(startDate);
    currentTime.setSeconds(0, 0); // Ensure seconds and milliseconds are zero for consistency

    const endTimeDate = new Date(endDate);
    endTimeDate.setSeconds(0, 0); // Ensure seconds and milliseconds are zero for consistency
    let slotCounter = 0;
    // Start generating slots while current time is before or equal to end time
    while (currentTime < endTimeDate) {
      // Calculate the end time for the current slot
      let slotEndTime = new Date(currentTime);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + slotDuration);
      // Ensure the slot end time does not exceed the endTimeDate
      if (slotEndTime > endTimeDate) {
        break;
      }
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
        slotNo: `S-${slotCounter}`,
        bookingStatus: "Free",
        color: "#078307",
        date : startDate.split('T')[0]
      });
      // Move currentTime forward by the slot duration + gap
      currentTime.setMinutes(
        currentTime.getMinutes() + slotDuration + gapDuration
      );
      slotCounter = slotCounter + 1;
    }

    return slots;
  },
};

module.exports = AppointmentController;
