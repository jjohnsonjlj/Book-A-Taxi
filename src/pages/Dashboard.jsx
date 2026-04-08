export default function Dashboard() {
  const rides = JSON.parse(localStorage.getItem("rides")) || [];
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.email}
      </h1>

      <h2 className="text-xl mb-6">Your Ride History</h2>

      {rides.length === 0 && <p>No rides yet.</p>}

      {rides.map((ride, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-gray-800 mb-4 rounded-lg shadow"
        >
          <p><strong>From:</strong> {ride.pickup}</p>
          <p><strong>To:</strong> {ride.dropoff}</p>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Distance:</strong> {ride.distance} miles</p>
          <p className="text-yellow-500 font-semibold">
            ${ride.price}
          </p>
        </div>
      ))}
    </div>
  );
}