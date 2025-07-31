import React, { useState, useEffect } from "react";
import { Plus, User } from "lucide-react";
import toast from "react-hot-toast";

import PatientModal from "../components/PatientModal";
import PatientCard from "../components/PatientCard";
import DeletePacientModal from "../components/DeletePatientModal";

export default function ProfilePage() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, []);

  const savePatients = (newList) => {
    setPatients(newList);
    localStorage.setItem("patients", JSON.stringify(newList));
  };

  const handleSave = (patient) => {
    // Ensure consistent key naming
    const normalizedPatient = {
      ...patient,
      birthDate: patient.birthDate || patient.birthdate,
    };

    if (editingPatient) {
      const updated = patients.map((p) =>
        p.id === patient.id ? normalizedPatient : p
      );
      savePatients(updated);
      toast.success("Patient updated");
    } else {
      const newPatient = {
        ...normalizedPatient,
        id: crypto.randomUUID(),
      };
      savePatients([...patients, newPatient]);
      toast.success("Patient added");
    }
    setModalOpen(false);
    setEditingPatient(null);
  };

  const confirmDelete = () => {
    const filtered = patients.filter((p) => p.id !== patientToDelete.id);
    savePatients(filtered);
    toast.success("Patient deleted");
    setPatientToDelete(null);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="relative mb-6">
        <h1 className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
          <User /> Patients
        </h1>
        <button
          onClick={() => {
            setModalOpen(true);
            setEditingPatient(null);
          }}
          className="absolute right-0 top-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-96 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Cards */}
      {filteredPatients.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No patients found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={() => {
                setEditingPatient(patient);
                setModalOpen(true);
              }}
              onDelete={() => setPatientToDelete(patient)}
            />
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      {modalOpen && (
        <PatientModal
          onClose={() => {
            setModalOpen(false);
            setEditingPatient(null);
          }}
          onSave={handleSave}
          initialData={editingPatient}
        />
      )}

      {/* Delete confirmation modal */}
      {patientToDelete && (
        <DeletePacientModal
          patient={patientToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setPatientToDelete(null)}
        />
      )}
    </div>
  );
}