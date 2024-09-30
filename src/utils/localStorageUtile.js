export const getAppointmentsFromStorage = () => {
    const appointments = localStorage.getItem("appointments");
    return appointments ? JSON.parse(appointments) : [];
  };
  
  export const saveAppointmentToStorage = (appointment) => {
    const appointments = getAppointmentsFromStorage();
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
  };
  