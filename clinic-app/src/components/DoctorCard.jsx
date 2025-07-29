import React from "react";
import { Pencil, Trash2, Star } from "lucide-react";

export default function DoctorCard({ doctor, onEdit, onDelete, appointments = [] }) {
  const doctorAppointments = appointments.filter(
    (appt) => appt.doctorId === doctor.id && appt.rating
  );

  const averageRating =
    doctorAppointments.length > 0
      ? (
          doctorAppointments.reduce((sum, appt) => sum + Number(appt.rating), 0) /
          doctorAppointments.length
        ).toFixed(1)
      : null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
      <div className="space-y-2 text-gray-900 dark:text-white">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialization}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {averageRating ? (
            <>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < Math.round(averageRating) ? "#facc15" : "none"}
                  stroke="#facc15"
                />
              ))}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {averageRating}/5
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-400">No ratings yet</span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Pencil size={16} /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}