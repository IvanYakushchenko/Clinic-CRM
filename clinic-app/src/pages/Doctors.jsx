import { useState, useEffect } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("doctors");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    specialization: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.specialization) return;

    const updated = [...doctors];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }
    setDoctors(updated);
    localStorage.setItem("doctors", JSON.stringify(updated));
    setForm({ fullName: "", phone: "", specialization: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setForm(doctors[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmed) return;

    const updated = doctors.filter((_, i) => i !== index);
    setDoctors(updated);
    localStorage.setItem("doctors", JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Doctors Management</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingIndex !== null ? "Save Changes" : "Add Doctor"}
        </button>
      </form>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No doctors found.</p>
      ) : (
        <ul className="space-y-3">
          {doctors.map((doctor, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{doctor.fullName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.phone}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 dark:text-blue-400 text-sm underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 dark:text-red-400 text-sm underline ml-4"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}