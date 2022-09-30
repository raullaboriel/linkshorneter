const origin = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://linkshortener-api.herokuapp.com";
  }
  return "http://localhost:5000";
};

module.exports = origin;
