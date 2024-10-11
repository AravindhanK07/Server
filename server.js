const express = require("express");
const dotenv = require("dotenv");
const userController = require("./routes/userDetails");
const droneController = require("./routes/droneDetails");
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/user", userController);
app.use("/api/drone", droneController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
