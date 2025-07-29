import React from "react";

export default function DeleteDoctorModal({ doctor, onConfirm, onCancel }) {
  return (
    <>
      {/* Blur + semi-transparent background */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-md relative">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            Delete Doctor
          </h2>
          <p className="mb-6 dark:text-gray-300">
            Are you sure you want to delete{" "}
            <span className="font-bold">{doctor.name}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(doctor.id)}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}