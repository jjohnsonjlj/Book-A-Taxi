import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Confirmation() {
  const navigate = useNavigate();

  const ride = JSON.parse(localStorage.getItem("lastRide"));

  // ⏳ Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!ride) return null;

  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center px-4 animate-fade-in">

      {/* ✅ Animated Icon */}
      <CheckCircle className="text-green-500 animate-bounce mb-4" size={80} />

      <h1 className="text-3xl font-bold mb-2">
        Booking Confirmed!
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Your ride has been successfully scheduled 🚕
      </p>

      {/* 🧾 Ride Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-md text-left space-y-2">
        <p><strong>Name:</strong> {ride.name}</p>
        <p><strong>From:</strong> {ride.pickup}</p>
        <p><strong>To:</strong> {ride.dropoff}</p>
        <p><strong>Service:</strong> {ride.service}</p>
        <p><strong>Distance:</strong> {ride.distance} miles</p>
        <p className="text-yellow-500 font-semibold">
          ${ride.price}
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Redirecting to dashboard...
      </p>
    </div>
  );
}