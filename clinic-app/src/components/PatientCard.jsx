import React from "react";
import {
  Phone,
  Calendar,
  Venus,
  Mars,
  User,
  Pencil,
  Trash2,
} from "lucide-react";

export default function PatientCard({ patient, onEdit, onDelete }) {
  const genderIcon =
    patient.gender === "Male" ? (
      <Mars size={16} />
    ) : patient.gender === "Female" ? (
      <Venus size={16} />
    ) : (
      <User size={16} />
    );

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="space-y-3 text-gray-800 dark:text-white">
        {/* Avatar */}
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center">
            <User size={24} />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-lg font-bold text-center">{patient.name}</h2>

        {/* Phone */}
        <div className="flex items-center gap-2 text-sm justify-center text-gray-600 dark:text-gray-400">
          <Phone size={16} />
          {patient.phone}
        </div>

        {/* Age */}
        <div className="flex items-center gap-2 text-sm justify-center text-gray-600 dark:text-gray-400">
          <Calendar size={16} />
          Age: {patient.age}
        </div>

        {/* Gender */}
        <div className="flex items-center gap-2 text-sm justify-center text-gray-600 dark:text-gray-400">
          {React.cloneElement(genderIcon, {
            className: "text-gray-500 dark:text-gray-400",
          })}
          Gender: {patient.gender}
        </div>
      </div>

      {/* Buttons (like in doctor card) */}
      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onEdit(patient)}
          className="w-1/2 flex items-center justify-center gap-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition text-sm"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={() => onDelete(patient)}
          className="w-1/2 flex items-center justify-center gap-1 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition text-sm"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}