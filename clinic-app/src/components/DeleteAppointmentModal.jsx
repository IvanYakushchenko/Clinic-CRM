import React from "react";

export default function DeleteAppointmentModal({ appointment, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Delete Appointment
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete the appointment for{" "}
          <span className="font-medium">{appointment.patient}</span> with{" "}
          <span className="font-medium">Dr. {appointment.doctor}</span> on{" "}
          <span className="font-medium">
            {appointment.date} at {appointment.time}
          </span>
          ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(appointment.id)}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}