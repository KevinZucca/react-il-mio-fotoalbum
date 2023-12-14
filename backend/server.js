const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const photosRouter = require("./routers/photos");
const usersRouter = require("./routers/users");

// body parser config
app.use(express.json());

// cors
app.use(cors());

// routes
app.use("/photos", photosRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
