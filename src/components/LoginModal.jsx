import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // ✅ Validation
  const validateField = (name, value) => {
    let error = "";

    if (!value) error = "Required";

    if (name === "password" && value.length < 4) {
      error = "Min 4 characters";
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  // 🔐 Login API call
  const handleLogin = async () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Fix errors before submitting");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${form.username}&password=${form.password}`
      );

      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem("user", JSON.stringify(data[0]));
        toast.success("Login successful 🎉");
        onClose();
        window.location.reload();
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {/* Username */}
        <div className="mb-4 dark:text-gray-300">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-red-500 text-sm">{errors.username}</p>
        </div>

        {/* Password */}
        <div className="mb-4 dark:text-gray-300">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-red-500 text-sm">{errors.password}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-yellow-400 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}