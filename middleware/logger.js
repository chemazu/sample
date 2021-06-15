const logger = (fish) => (req, res, next) => {
  console.log("logger", req.method);
  req.hello = "logger";
  console.log(fish);
  next();
};
module.exports = logger;
