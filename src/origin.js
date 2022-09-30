const origin = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://link-shortener-api-production.up.railway.app/";
  }
  return "http://localhost:5000";
};

module.exports = origin;
