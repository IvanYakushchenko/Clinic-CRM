import { useState, useEffect } from "react";

export default function DoctorModal({ onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
      setSpecialization(initialData.specialization);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !specialization) {
      alert("All fields are required");
      return;
    }

    const newDoctor = {
      id: initialData?.id || Date.now(),
      name,
      phone,
      specialization,
    };

    onSave(newDoctor);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Doctor" : "Add Doctor"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Specialization</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              {initialData ? "Save Changes" : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}