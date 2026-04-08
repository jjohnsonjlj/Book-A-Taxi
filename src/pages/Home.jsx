export default function Home() {
  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="text-center mt-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Your Ride, Anytime, Anywhere 🚕
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
          Book reliable rides in seconds. Safe, affordable, and always on time.
        </p>

        <a
          href="/booking"
          className="bg-yellow-400 hover:bg-yellow-300 px-6 py-3 rounded-lg font-semibold"
        >
          Book a Ride
        </a>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-4">
        {[
          {
            title: "Fast Pickup",
            desc: "Drivers arrive within minutes of booking.",
          },
          {
            title: "Affordable Pricing",
            desc: "Transparent pricing with no hidden fees.",
          },
          {
            title: "Safe Rides",
            desc: "Verified drivers and secure journeys.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center"
          >
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center bg-yellow-400 py-10 rounded-xl mx-4">
        <h2 className="text-2xl font-bold mb-4">
          Ready to ride?
        </h2>
        <a
          href="/booking"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Book Now
        </a>
      </section>

    </div>
  );
}