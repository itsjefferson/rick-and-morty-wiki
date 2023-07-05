const getCurrentDate = () => {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return now.toLocaleString("en-US", options).replace(",", " at");
};

export { getCurrentDate };
