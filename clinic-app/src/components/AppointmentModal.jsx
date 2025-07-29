import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uk } from "date-fns/locale";
import { isBefore } from "date-fns";
import { registerLocale } from "react-datepicker";

registerLocale("uk", uk);

export default function AppointmentModal({ onClose, onSave, initialData = {}, doctors = [] }) {
  const {
    doctor = "",
    date = "",
    time = "",
    patient = "",
  } = initialData || {};

  // 🧠 Конвертуємо дату та час в об'єкт Date
  const initialDateTime =
    date && time ? new Date(`${date}T${time}`) : null;

  const [form, setForm] = useState({
    doctor,
    patient,
    dateTime: initialDateTime,
  });

  const [error, setError] = useState("");
  const selectedDoctor = doctors.find((d) => d.name === form.doctor) || null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.doctor || !form.patient || !form.dateTime) {
      setError("All fields are required.");
      return;
    }

    if (isBefore(form.dateTime, new Date())) {
      setError("Appointment date and time must be in the future.");
      return;
    }

    const formattedDate = form.dateTime.toISOString().split("T")[0];
    const formattedTime = form.dateTime.toTimeString().slice(0, 5);

    const appointment = {
      id: initialData?.id || Date.now(),
      doctor: form.doctor,
      date: formattedDate,
      time: formattedTime,
      patient: form.patient,
    };

    onSave(appointment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          {initialData?.id ? "Edit Appointment" : "New Appointment"}
        </h2>
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Doctor */}
          <Listbox
            value={selectedDoctor}
            onChange={(doc) => handleChange("doctor", doc.name)}
          >
            <div className="relative">
              <Listbox.Button className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-left dark:text-white flex justify-between items-center">
                <span>
                  {selectedDoctor ? `Dr. ${selectedDoctor.name}` : "Select Doctor"}
                </span>
                <ChevronDown size={16} />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 border rounded-md z-10 shadow-lg">
                  {doctors.map((doc) => (
                    <Listbox.Option
                      key={doc.id}
                      value={doc}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${active ? "bg-blue-500 text-white" : "dark:text-white"}`
                      }
                    >
                      {({ selected }) => (
                        <span className="flex justify-between">
                          {`Dr. ${doc.name}`}
                          {selected && <Check size={16} />}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          {/* Date & Time Picker */}
          <DatePicker
            selected={form.dateTime}
            onChange={(val) => handleChange("dateTime", val)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Час"
            dateFormat="dd.MM.yyyy HH:mm"
            locale="uk"
            minDate={new Date()}
            placeholderText="Оберіть дату та час"
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white w-full"
          />

          {/* Patient */}
          <input
            type="text"
            name="patient"
            value={form.patient}
            onChange={(e) => handleChange("patient", e.target.value)}
            placeholder="Patient Full Name"
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {initialData?.id ? "Save Changes" : "Add Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}