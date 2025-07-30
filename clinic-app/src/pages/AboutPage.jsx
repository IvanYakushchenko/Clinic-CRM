import React from "react";
import { Github } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">About This Project</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        This web application was developed by Ivan Yakushchenko as a diploma project
        for the Front-End Development course at IT Step Academy.
      </p>

      <a
        href="https://github.com/IvanYakushchenko/Clinic-CRM"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-6"
      >
        <Github className="w-5 h-5" />
        View on GitHub
      </a>
    </div>
  );
}