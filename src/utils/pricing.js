export const estimateDistance = (pickup, dropoff) => {
  if (!pickup || !dropoff) return 0;

  const base = Math.abs(pickup.length - dropoff.length);

  const km = Math.max(3, base);

  // ✅ convert to miles
  const miles = km * 0.621371;

  return miles.toFixed(1);
};

export const calculatePrice = (distance, service) => {
  const baseFare = 5;

  const rates = {
    standard: 2,
    premium: 4,
    airport: 3,
    carpool: 1.5,
    hourly: 5,
    business: 3.5,
  };

  const rate = rates[service] || 2;

  return (baseFare + distance * rate).toFixed(2);
};