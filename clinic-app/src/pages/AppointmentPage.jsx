import React, { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentModal from "../components/AppointmentModal";
import DeleteAppointmentModal from "../components/DeleteAppointmentModal";
import ConfirmDeleteOldModal from "../components/ConfirmDeleteOldModal";
import { showSuccess, showWarning } from "../utils/toast.jsx"; // не забудь .jsx!

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isConfirmDeleteOldOpen, setIsConfirmDeleteOldOpen] = useState(false);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];

    setAppointments(storedAppointments);
    setDoctors(storedDoctors);
    setPatients(storedPatients);
  }, []);

  const saveAppointments = (updated) => {
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleSave = (appointment) => {
    const isSlotTaken = appointments.some(
      (a) =>
        a.id !== appointment.id &&
        a.doctorId === appointment.doctorId &&
        a.date === appointment.date &&
        a.time === appointment.time
    );

    if (isSlotTaken) {
      showWarning("This slot is already taken!");
      return;
    }

    let updated;
    if (appointments.some((a) => a.id === appointment.id)) {
      updated = appointments.map((a) => (a.id === appointment.id ? appointment : a));
      showSuccess("Appointment updated successfully");
    } else {
      updated = [...appointments, appointment];
      showSuccess("Appointment added successfully");
    }
    saveAppointments(updated);
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    saveAppointments(updated);
    showWarning("Appointment deleted");
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const isPastAppointment = (dateStr) => {
    const today = new Date();
    const appointmentDate = new Date(dateStr);
    return appointmentDate < today.setHours(0, 0, 0, 0);
  };

  const confirmClearOldAppointments = () => {
    setIsConfirmDeleteOldOpen(true);
  };

  const handleClearOldAppointments = () => {
    const updated = appointments.filter((a) => !isPastAppointment(a.date));
    saveAppointments(updated);
    showSuccess("Old appointments data was deleted");
    setIsConfirmDeleteOldOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Appointments
        </h1>
        <div className="flex gap-2">
          <button
            onClick={confirmClearOldAppointments}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md text-sm sm:text-base sm:px-6 sm:py-3 transition"
          >
            Delete old appointments
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md text-sm sm:text-base sm:px-6 sm:py-3 transition"
          >
            <span className="text-lg sm:text-xl">+</span>
            <span className="hidden sm:inline">Add Appointment</span>
          </button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-12">
          No appointments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              doctors={doctors}
              patients={patients}
              onEdit={() => handleEdit(appointment)}
              onDelete={() => {
                setAppointmentToDelete(appointment);
                setIsDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <AppointmentModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingAppointment(null);
          }}
          onSave={handleSave}
          initialData={editingAppointment}
          doctors={doctors}
          patients={patients}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteAppointmentModal
          appointment={appointmentToDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setAppointmentToDelete(null);
          }}
          onConfirm={(id) => {
            handleDelete(id);
            setIsDeleteModalOpen(false);
            setAppointmentToDelete(null);
          }}
        />
      )}

      {isConfirmDeleteOldOpen && (
        <ConfirmDeleteOldModal
          isOpen={isConfirmDeleteOldOpen}
          onCancel={() => setIsConfirmDeleteOldOpen(false)}
          onConfirm={handleClearOldAppointments}
        />
      )}
    </div>
  );
}