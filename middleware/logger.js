const logger = (fish) => (req, res, next) => {
  console.log("logger", req.method);
  req.hello = "logger";
  next();
};
module.exports = logger;
