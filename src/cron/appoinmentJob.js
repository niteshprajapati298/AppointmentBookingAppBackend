const cron = require("node-cron");
const AppointmentModel = require("../models/appointment.model");

cron.schedule("0 0 * * * *", async () => {
    try {
        // Convert UTC → IST
        const nowUTC = new Date();
        const nowIST = new Date(nowUTC.getTime() + 5.5 * 60 * 60 * 1000);

        const currDay = nowIST.getDay();
        const currentHour = nowIST.getHours();
        const pastHour = currentHour === 0 ? 23 : currentHour - 1;

        let pastHourStr = pastHour.toString().padStart(2, "0") + ":00";

        console.log("Day:", currDay);
        console.log("Current Hour (IST):", currentHour);
        console.log("Past Hour (IST):", pastHourStr);

        const appts = await AppointmentModel.find({
            "appointMentDetails.date.day": currDay,
            "appointMentDetails.date.time": pastHourStr,
            "appointMentDetails.status": "Completed",
        });

        const bulkOps = appts.map(appt => ({
            updateOne: {
                filter: {
                    _id: appt.toDoctorId,
                    "availability.day": currDay,
                    "availability.slots.time": pastHourStr
                },
                update: {
                    $set: { "availability.$[day].slots.$[slot].isBooked": false }
                },
                arrayFilters: [
                    { "day.day": currDay },
                    { "slot.time": pastHourStr }
                ]
            }
        }));

        if (bulkOps.length > 0) {
            await DoctorModel.bulkWrite(bulkOps);
        }
        console.log("Appointments marked completed:", result.modifiedCount);
    } catch (error) {
        console.error("Error in cron job:", error.message);
    }
});
  