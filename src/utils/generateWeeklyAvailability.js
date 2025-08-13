module.exports.generateWeeklyAvalability = function (params) {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "wednesday",
        "Thursday",
        "Fridayday",
        "Saturday",

    ];
    const slots =[];
    for(let hour = 9; hour<=17;hour++){
        const time = `${hour.toString().padStart(2, "0")}:00`;
        slots.push({time,isBooked:false});
    }
    return days.map(day=>({
        day,
        slots:[...slots],
    }))
};