import { Pencil, Trash2, UserCircle2 } from "lucide-react";

export default function DoctorCard({ doctor, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col items-start space-y-4 transition-transform hover:scale-[1.015] duration-200">
      {/* Icon */}
      <div className="w-full flex justify-center">
        <UserCircle2 className="text-blue-500 dark:text-blue-400" size={48} />
      </div>

      {/* Info section */}
      <div className="w-full text-left space-y-1">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {doctor.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Phone:</span> {doctor.phone}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Specialization:</span> {doctor.specialization}
        </p>
      </div>

      {/* Action buttons */}
      <div className="mt-auto flex gap-2 w-full">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1.5 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}