import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DoctorModal from "../components/DoctorModal";
import DoctorCard from "../components/DoctorCard";
import ConfirmDeleteModal from "../components/DeleteDoctorModal";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("doctors");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteDoctor, setConfirmDeleteDoctor] = useState(null); // Замість ID

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleAdd = (newDoctor) => {
    if (editingDoctor) {
      setDoctors((prev) =>
        prev.map((doc) => (doc.id === editingDoctor.id ? newDoctor : doc))
      );
    } else {
      setDoctors((prev) => [...prev, newDoctor]);
    }
    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updated = doctors.filter((doc) => doc.id !== id);
    setDoctors(updated);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const term = searchTerm.toLowerCase();
    return (
      doc.name.toLowerCase().includes(term) ||
      doc.specialization.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="grid grid-cols-3 items-center mb-6">
        <div></div>
        <h2 className="text-3xl font-semibold text-center">Doctors</h2>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditingDoctor(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2"
          >
            <Plus size={18} /> Add Doctor
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards */}
      {filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No doctors found.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onEdit={() => handleEdit(doc)}
              onDelete={() => setConfirmDeleteDoctor(doc)} // <-- передаємо об’єкт
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <DoctorModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingDoctor(null);
          }}
          onSave={handleAdd}
          initialData={editingDoctor}
        />
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteDoctor && (
        <ConfirmDeleteModal
          doctor={confirmDeleteDoctor}
          onConfirm={() => {
            handleDelete(confirmDeleteDoctor.id);
            setConfirmDeleteDoctor(null);
          }}
          onCancel={() => setConfirmDeleteDoctor(null)}
        />
      )}
    </div>
  );
}