const express = require("express");

const PORT = process.env.PORT || 5001;
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
app.use(cors());
app.use(express.json());
// connect to database
const db = process.env.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongodb running"))
  .catch((err) => {
    console.log("the error is", err);
  });

app.use("/", require("./routes/routes"));
app.get("/age", () => {
  console.log("age");
});

app.listen(PORT, () => {
  console.log(`currently running on ${PORT}`);
});
