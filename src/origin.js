const origin = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://api.lilink.click";
  }
  return "http://localhost:5000";
};

module.exports = origin;
