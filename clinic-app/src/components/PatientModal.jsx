import React, { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import { X, Check, ChevronDown } from "lucide-react";

const genderOptions = ["Male", "Female", "Other"];

export default function PatientModal({ onClose, onSave, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name, phone, age, gender]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !age || !gender) {
      setError("Please fill out all fields");
      return;
    }

    const patientData = {
      id: initialData?.id || null,
      name: name.trim(),
      phone: phone.trim(),
      age: Number(age),
      gender,
    };

    onSave(patientData);
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-xl bg-white dark:bg-gray-900 p-6 shadow-lg relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>

          <Dialog.Title className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            {initialData ? "Edit Patient" : "Add Patient"}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                placeholder="Enter full name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                placeholder="+380501234567"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Age
              </label>
              <input
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                placeholder="Enter age"
              />
            </div>

            {/* Gender using Listbox */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <Listbox value={gender} onChange={setGender}>
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2 border rounded-lg text-left dark:bg-gray-800 dark:text-white">
                    <span>{gender || "Select gender"}</span>
                    <span className="absolute inset-y-0 right-3 flex items-center">
                      <ChevronDown size={16} />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white dark:bg-gray-800 shadow-lg">
                    {genderOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active, selected }) =>
                          `px-4 py-2 cursor-pointer ${
                            active ? "bg-blue-100 dark:bg-gray-700" : ""
                          } ${selected ? "font-medium" : ""}`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {selected && <Check size={16} />}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {initialData ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}