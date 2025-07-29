import toast from "react-hot-toast";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { jsx as _jsx } from "react/jsx-runtime";

const customToast = (message, Icon, bg = "#fff", color = "#111") => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 px-4 py-3 gap-3`}
      style={{ background: bg, color }}
    >
      <Icon size={22} className="mt-0.5 text-green-500" />
      <div className="text-sm font-medium">{message}</div>
    </div>
  ));
};

export const showSuccess = (msg) => customToast(msg, CheckCircle, "#ecfdf5", "#065f46");

export const showWarning = (msg) => customToast(msg, AlertTriangle, "#fef2f2", "#991b1b");