import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setDoctors(savedDoctors);
    setAppointments(savedAppointments);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter(appt => appt.date === today);

  const averageRating =
    doctors.length > 0
      ? (
          doctors.reduce((acc, d) => acc + (d.rating || 0), 0) /
          doctors.filter(d => d.rating).length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Clinic Admin</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Manage doctors, appointments, and patients from one place.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold">{doctors.length}</h3>
          <p className="text-gray-700 dark:text-gray-200">Doctors</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold">{todayAppointments.length}</h3>
          <p className="text-gray-700 dark:text-gray-200">Appointments Today</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold">{averageRating}★</h3>
          <p className="text-gray-700 dark:text-gray-200">Average Rating</p>
        </div>
      </div>
    </div>
  );
}