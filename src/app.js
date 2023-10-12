require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const contributorRoutes = require("./routes/contributorRoutes");
const bugRoutes = require("./routes/bugRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");
const quickActionRoutes = require("./routes/quickActionRoutes");

//Initialize express app
const app = express();

//Set up environment variables
const PORT = process.env.PORT || 5555;
const MONGO_URI = process.env.MONGO_URI;

//Set up middlewares
app.use(cors()); //Enable CORS
app.use(morgan("combined"));
app.use(express.json()); //Parse JSON
app.use("/uploads", express.static("uploads")); //Specify uploads folder as static folder

//Set up routes
const apiRouter = express.Router();
app.use("/api", apiRouter);


apiRouter.use("/data", dataRoutes);
apiRouter.use("/contributors", contributorRoutes);
apiRouter.use("/onboarding", onboardingRoutes);
apiRouter.use("/bugs", bugRoutes);
apiRouter.use("/quickactions", quickActionRoutes);
apiRouter.use("/posts", postRoutes);


//Establish connection to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`E-Mobility backend listening on port ${PORT}`);
});
