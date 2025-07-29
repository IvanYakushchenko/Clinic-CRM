import React from "react";
import { Dialog } from "@headlessui/react";
import { Trash2, X } from "lucide-react";

export default function DeletePacientModal({ patient, onConfirm, onCancel }) {
  return (
    <Dialog open={true} onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-sm w-full bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl relative">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-4 text-red-600">
            <Trash2 size={24} />
            <Dialog.Title className="text-lg font-bold">
              Delete patient?
            </Dialog.Title>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete <strong>{patient.name}</strong>? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-sm"
            >
              Confirm Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}