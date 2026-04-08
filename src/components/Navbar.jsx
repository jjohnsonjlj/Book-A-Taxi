import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [dark, setDark] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🌙 Dark mode toggle
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-4 md:px-8 py-4">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-yellow-500">
          Book-A-Taxi
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          {user && <Link to="/dashboard">Dashboard</Link>}

          {/* 🚕 BOOK BUTTON */}
          <Link
            to="/booking"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
          >
            Book
          </Link>

          {/* 🌙 DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* 🔐 AUTH */}
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-yellow-400 px-4 py-2 rounded-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        {/* 🍔 MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {user && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {/* 🚕 BOOK BUTTON */}
          <Link
            to="/booking"
            onClick={() => setMenuOpen(false)}
            className="bg-yellow-400 text-center px-4 py-2 rounded-lg font-semibold"
          >
            Book a Ride
          </Link>

          {/* 🌙 DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center justify-center gap-2 p-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>

          {/* 🔐 AUTH */}
          {!user ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="bg-yellow-400 px-4 py-2 rounded-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
}