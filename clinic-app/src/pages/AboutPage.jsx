export default function AboutPage() {
  return (
    <div className="card space-y-4 text-center">
      <h2 className="text-2xl font-bold">About Us</h2>
      <p>
        This application is designed to help clinic administrators manage doctors, appointments, and patient records efficiently.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Built with React, TailwindCSS and localStorage. Designed for modern healthcare teams.
      </p>
    </div>
  );
}