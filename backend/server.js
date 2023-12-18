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
const adminPhotosRouter = require("./routers/admin/photos");
const adminCategoriesRouter = require("./routers/admin/categories");
const usersRouter = require("./routers/users");

// body parser config
app.use(express.json());

// static files
// app.use("/uploads", express.static("uploads"));

// cors
app.use(cors());

// GUEST routes
app.use("/photos", photosRouter);
app.use("/categories", categoriesRouter);
app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

// ADMIN routes
app.use("/admin/photos", adminPhotosRouter);
app.use("/admin/categories", adminCategoriesRouter);

// AUTH routes
app.use("", authRouter);

// middlewares
app.use(notFoundRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
