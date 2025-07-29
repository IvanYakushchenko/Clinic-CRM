import React from "react";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AppointmentCard({ appointment, onEdit, onDelete }) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 hover:shadow-xl transition flex flex-col justify-between">
      <div className="space-y-3 text-gray-800 dark:text-white">
        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
            <Stethoscope size={16} />
            <span>Doctor</span>
          </div>
          <p className="text-lg font-medium">Dr. {appointment.doctor}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
            <User size={16} />
            <span>Patient</span>
          </div>
          <p>{appointment.patient}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDays size={16} />
            <span>Date</span>
          </div>
          <p>{appointment.date}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} />
            <span>Time</span>
          </div>
          <p>{appointment.time}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
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