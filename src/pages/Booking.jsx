import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { estimateDistance, calculatePrice } from "../utils/pricing";
import {
  Car,
  Crown,
  Plane,
  Users,
} from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    pickup: "",
    dropoff: "",
    date: "",
    service: "standard",
  });

  const [errors, setErrors] = useState({});

  const distance = estimateDistance(form.pickup, form.dropoff);
  const price = calculatePrice(distance, form.service);

  const services = [
    {
      id: "standard",
      title: "Standard",
      desc: "Affordable everyday rides",
      icon: Car,
    },
    {
      id: "premium",
      title: "Premium",
      desc: "Luxury vehicles",
      icon: Crown,
    },
    {
      id: "airport",
      title: "Airport",
      desc: "On-time airport transfers",
      icon: Plane,
    },
    {
      id: "carpool",
      title: "Carpool",
      desc: "Shared rides",
      icon: Users,
    },
  ];

  const validate = () => {
    let e = {};
    if (!form.name) e.name = "Required";
    if (!form.pickup) e.pickup = "Required";
    if (!form.dropoff) e.dropoff = "Required";
    if (!form.date) e.date = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      toast.error("Please fill all fields");
      return;
    }

    const ride = {
      ...form,
      distance,
      price,
    };

    const rides = JSON.parse(localStorage.getItem("rides")) || [];
    rides.push(ride);
    localStorage.setItem("rides", JSON.stringify(rides));

    toast.success("Ride booked 🚕");

    // Save last ride separately
    localStorage.setItem("lastRide", JSON.stringify(ride));

    // Go to confirmation screen
    navigate("/confirmation");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Book Your Ride
      </h1>

      {/* 🚕 SERVICE SELECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {services.map((s) => {
          const Icon = s.icon;
          const isActive = form.service === s.id;

          return (
            <div
              key={s.id}
              onClick={() => setForm({ ...form, service: s.id })}
              className={`
          p-4 rounded-2xl cursor-pointer border transition-all duration-300
          flex flex-col items-center text-center gap-2
          hover:scale-105 hover:shadow-lg active:scale-95
          ${isActive
                  ? "bg-yellow-400 text-black shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800"
                }
        `}
            >
              {/* ICON */}
              <div
                className={`
            p-3 rounded-full transition
            ${isActive ? "bg-black text-white" : "bg-gray-100 dark:bg-gray-700"}
          `}
              >
                <Icon size={24} />
              </div>

              {/* TEXT */}
              <h2 className="font-semibold">{s.title}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 📄 FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.name}</p>

        <input
          placeholder="Pickup Location"
          value={form.pickup}
          onChange={(e) =>
            setForm({ ...form, pickup: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.pickup}</p>

        <input
          placeholder="Dropoff Location"
          value={form.dropoff}
          onChange={(e) =>
            setForm({ ...form, dropoff: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.dropoff}</p>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.date}</p>

        <button className="w-full bg-yellow-400 p-3 rounded-lg font-semibold">
          Confirm Booking
        </button>
      </form>

      {/* 🧾 SUMMARY */}
      {form.pickup && form.dropoff && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-6">
          <h2 className="font-bold mb-2">Ride Summary</h2>

          <p><strong>Service:</strong> {form.service}</p>
          <p><strong>Distance:</strong> {distance} miles</p>

          <p className="text-yellow-500 font-semibold mt-2">
            Estimated Price: ${price}
          </p>
        </div>
      )}
    </div>
  );
}