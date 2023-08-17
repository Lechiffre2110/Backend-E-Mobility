require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 5555;

//Set up logging
app.use(morgan("combined"));

app.use("/uploads", express.static("uploads"));

app.use('/hub', dataRoutes);

app.use(errorHandler);


const mongoUrI = process.env.MONGO_URI;

//Establish connection to MongoDB
mongoose
  .connect(mongoUrI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
