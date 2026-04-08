export default function Services() {
  const services = [
    {
      title: "Standard Rides",
      desc: "Affordable everyday rides for your daily commute.",
    },
    {
      title: "Premium Rides",
      desc: "Luxury vehicles for a comfortable experience.",
    },
    {
      title: "Airport Transfers",
      desc: "On-time pickups and drop-offs to all major airports.",
    },
    {
      title: "Carpool",
      desc: "Share rides and save money with others going your way.",
    },
    {
      title: "Hourly Rentals",
      desc: "Keep a driver with you for multiple stops.",
    },
    {
      title: "Business Travel",
      desc: "Reliable rides for corporate and business needs.",
    },
  ];

  return (
    <div className="px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our Services
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}