import React, { useEffect, useState } from "react";
import { X, Star } from "lucide-react";

export default function PatientHistoryModal({ patient, onClose }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const patientAppointments = storedAppointments.filter(
      (a) => a.patientId === patient.id
    );

    setAppointments(patientAppointments);
  }, [patient]);

  const handleRate = (appointmentId, ratingValue) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === appointmentId ? { ...appt, rating: ratingValue } : appt
    );

    setAppointments(updatedAppointments);

    // Оновлюємо всі appointments у localStorage
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAllAppointments = allAppointments.map((appt) =>
      appt.id === appointmentId ? { ...appt, rating: ratingValue } : appt
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAllAppointments));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-xl shadow-lg text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            History for {patient.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-sm text-gray-500">No appointments found.</p>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-md p-4 bg-gray-100 dark:bg-gray-700"
              >
                <p>
                  <span className="font-medium">Doctor:</span>{" "}
                  {appointment.doctor}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {appointment.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {appointment.time}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      size={18}
                      className={`cursor-pointer ${
                        appointment.rating >= value
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleRate(appointment.id, value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}