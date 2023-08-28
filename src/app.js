require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const contributorRoutes = require("./routes/contributorRoutes");
const bugRoutes = require("./routes/bugRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const errorHandler = require("./middlewares/errorHandler");


const app = express();
const port = 5555;

app.use(cors());

//Set up logging
app.use(morgan("combined"));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use('/hub', dataRoutes);

app.use('/api', contributorRoutes);

app.use('/api', onboardingRoutes);

app.use('/bug', bugRoutes);

//TODO: change routes to make more sense

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
  console.log(`E-Mobility backend listening on port ${port}`);
});
