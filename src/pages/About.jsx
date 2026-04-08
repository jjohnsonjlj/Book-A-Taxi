export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">About Book-A-Taxi</h1>

      <p className="text-gray-600 dark:text-gray-300">
        Book-A-Taxi is a modern rideshare platform designed to make transportation
        simple, fast, and accessible. Inspired by leading services, we aim to
        provide reliable rides with a focus on safety and convenience.
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Our mission is to connect riders with trusted drivers through a seamless
        booking experience. Whether you're commuting to work or heading to the airport,
        we ensure a smooth journey every time.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
          <h2 className="font-bold text-xl">10K+</h2>
          <p>Rides Completed</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
          <h2 className="font-bold text-xl">500+</h2>
          <p>Active Drivers</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
          <h2 className="font-bold text-xl">4.9★</h2>
          <p>Customer Rating</p>
        </div>
      </div>
    </div>
  );
}