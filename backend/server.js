const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const photosRouter = require("./routers/photos");
const categoriesRouter = require("./routers/categories");
const messagesRouter = require("./routers/messages");
const errorHandler = require("./middlewares/errorHandler");
const notFoundRoute = require("./middlewares/notFoundRoute");
const authRouter = require("./routers/auth");

// body parser config
app.use(express.json());

// cors
app.use(cors());

// routes
app.use("/photos", photosRouter);
app.use("/categories", categoriesRouter);
app.use("", authRouter);
app.use("/messages", messagesRouter);

// middlewares
app.use(notFoundRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
