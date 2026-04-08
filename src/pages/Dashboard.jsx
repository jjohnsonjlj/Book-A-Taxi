import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [rides, setRides] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [profile, setProfile] = useState({
    username: user?.username || "",
    password: user?.password || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  // 🚕 FETCH RIDES
  useEffect(() => {
    if (!user) return;

    const fetchRides = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/rides?userId=${user.id}`
        );
        const data = await res.json();
        setRides(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [user]);

  // 🗑️ DELETE RIDE
  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:3001/rides/${deletingId}`, {
        method: "DELETE",
      });

      setRides(rides.filter((r) => r.id !== deletingId));
      setDeletingId(null);

      toast.success("Ride deleted");
    } catch (err) {
      toast.error("Failed to delete ride");
    }
  };

  // ✏️ UPDATE PROFILE
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );

      const updatedUser = await res.json();

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);

      toast.success("Profile updated");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-10">

      {/* 👤 PROFILE */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        {!editing ? (
          <div className="flex gap-6 items-center">
            <img
              src={
                user?.avatar ||
                "https://ui-avatars.com/api/?name=User&background=FACC15&color=000&size=100"
              }
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div>
              <p className="font-semibold text-lg">{user?.username}</p>
              <p className="text-sm text-gray-500">{user?.bio}</p>
              <p className="text-sm">{user?.phone}</p>

              <button
                onClick={() => setEditing(true)}
                className="mt-3 bg-yellow-400 px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              placeholder="Username"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              placeholder="Avatar URL"
              value={profile.avatar}
              onChange={(e) =>
                setProfile({ ...profile, avatar: e.target.value })
              }
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <textarea
              placeholder="Bio"
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            <div className="flex gap-3">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="bg-gray-400 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🚕 RIDES */}
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Your Ride History
        </h1>

        {/* ⏳ LOADING */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && rides.length === 0 && (
          <p className="text-gray-500">No rides yet.</p>
        )}

        {!loading &&
          rides.map((ride) => (
            <div
              key={ride.id}
              className="p-4 bg-white dark:bg-gray-800 mb-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p><strong>From:</strong> {ride.origin}</p>
                <p><strong>To:</strong> {ride.destination}</p>
                <p><strong>Date:</strong> {ride.date}</p>
                <p className="text-yellow-500 font-semibold">
                  ${ride.price}
                </p>
              </div>

              <button
                onClick={() => setDeletingId(ride.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {/* ⚠️ DELETE MODAL */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">
              Delete this ride?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setDeletingId(null)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}