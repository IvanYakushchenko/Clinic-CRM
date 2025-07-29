import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Clock,
  UserRound,
  Phone,
  Cake,
  VenetianMask
} from "lucide-react";
import PatientHistoryModal from "./PatientHistoryModal";

export default function PatientCard({ patient, onEdit, onDelete }) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 hover:shadow-xl transition flex flex-col justify-between">
      <div className="space-y-4 text-gray-800 dark:text-white">
        {/* Name */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UserRound size={16} />
            <span>Patient</span>
          </div>
          <p className="text-lg font-semibold">{patient.name}</p>
        </div>

        {/* Phone */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Phone size={16} />
            <span>Phone</span>
          </div>
          <p>{patient.phone}</p>
        </div>

        {/* Age */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Cake size={16} />
            <span>Age</span>
          </div>
          <p>{patient.age}</p>
        </div>

        {/* Gender */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <VenetianMask size={16} />
            <span>Gender</span>
          </div>
          <p>{patient.gender}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6 gap-2">
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
        >
          <Clock size={16} />
          History
        </button>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* History Modal */}
      {isHistoryOpen && (
        <PatientHistoryModal
          patient={patient}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}
    </div>
  );
}