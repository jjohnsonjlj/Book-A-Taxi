import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // 🧠 Validate single field
  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    }

    if (name === "email" && value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
    }

    return error;
  };

  // 🎯 On blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // 🚀 Submit with fake API
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors");
      return;
    }

    const loading = toast.loading("Sending message...");

    setTimeout(() => {
      toast.dismiss(loading);
      toast.success("Message sent successfully 📩");

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10 grid md:grid-cols-2 gap-10">
      
      {/* LEFT SIDE */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>

        <p className="text-gray-600 dark:text-gray-300">
          Have questions or need help? Our team is here 24/7 to assist you.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-yellow-400" />
            <span>Orlando, Florida</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-yellow-400" />
            <span>(555) 123-4567</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-yellow-400" />
            <span>support@bookataxi.com</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Send a Message</h2>

        {/* Name */}
        <div>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-red-500 text-sm">{errors.name}</p>
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-red-500 text-sm">{errors.email}</p>
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-red-500 text-sm">{errors.message}</p>
        </div>

        <button className="w-full bg-yellow-400 hover:bg-yellow-300 p-3 rounded-lg font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
}