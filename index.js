const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config;
app.use(cors());
app.use("/", require("./routes/routes"));
app.listen(PORT, () => {
  console.log(`currently running on ${PORT}`);
});
