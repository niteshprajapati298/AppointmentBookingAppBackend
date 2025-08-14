module.exports.bookAppointment = async (doctorId,patientId,slot) => {
    if(!doctorId||!patientId||!slot) throw new Error("All Fields Are Required");
    
}