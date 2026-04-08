# 🚖 Book-A-Taxi App

This is a ride-booking web app I built to simulate the core experience of a modern rideshare platform. Users can log in, book rides, choose different service types, and view their ride history — all in a clean, responsive interface.

This is my **second portfolio project**, where I focused on improving UI/UX, building realistic app flows, and integrating a mock backend.

---

## 🌟 What This App Does

The goal of this project was to go beyond a basic React app and build something that actually feels like a real product.

With this app, users can:

* Log in using a modal (with validation)
* Book a ride with pickup and dropoff locations
* Choose between different ride types (standard, premium, etc.)
* See dynamic pricing based on distance and service
* Get a confirmation screen after booking
* View their ride history in a dashboard
* Send a message through a contact form

---

## 🚀 Features

### 🔐 Authentication

* Login modal (no page redirects)
* Username + password validation
* JSON Server used as a mock backend
* Session stored with localStorage

---

### 🚕 Booking Experience

* Service selection with interactive cards
* Real-time distance + price calculation
* Ride summary before booking
* Smooth confirmation screen with animation

---

### 📊 Dashboard

* Displays previous bookings
* Shows distance, service type, and pricing
* Data persisted locally

---

### 📬 Contact Page

* Fully responsive contact form
* Inline validation (on blur)
* Simulated API submission with loading + success states

---

### 🎨 UI / UX

* Fully responsive (mobile-first design)
* Dark mode toggle
* Hamburger menu for mobile navigation
* Toast notifications instead of alerts
* Animated service selection cards

---

## 🛠️ Tech Stack

* React + Vite
* Tailwind CSS (v3)
* React Router
* Lucide React (icons)
* React Hot Toast (notifications)
* JSON Server (mock backend)

---

## 📁 Project Structure

```
src/
├── components/
├── pages/
├── utils/
├── App.jsx
├── main.jsx
```

---

## ⚙️ How to Run It

```bash
npm install
npm run dev
```

To run the mock backend:

```bash
json-server --watch db.json --port 3001
```

---

## 🧠 What I Focused On

With this project, I really wanted to move past “just making something work” and start thinking more like a product developer.

Some things I focused on:

* Building a complete user flow (login → booking → confirmation → dashboard)
* Making the UI feel smooth and responsive
* Writing reusable and organized components
* Simulating real backend behavior
* Paying attention to small UX details

---

## 🚀 What I’d Improve Next

If I keep building on this, I’d like to add:

* Real map integration (Google Maps)
* Backend authentication (JWT or Firebase)
* Payment processing
* Real-time ride tracking
* User profiles

---

## 👤 About Me

**Joshua Johnson**

* GitHub: https://github.com/jjohnsonjlj

---

## 📌 Final Thoughts

This project helped me get more comfortable building apps that feel closer to real-world products instead of just demos. It also pushed me to think more about user experience, not just functionality.

---
