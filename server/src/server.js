import express from "express";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));

const isLoggedIn = (req, res, next) => {
  console.log("Checking user authentication...");
  next();
};

app.get("/api/profile", isLoggedIn, (req, res) => {
  res.status(201).send(console.log("Showing user profile..."));
});

app.get("/test", (req, res) => {
  res.status(201).send({
    message: "Server is running fine...",
  });
});

app.listen(3001, () => {
  console.log("Server is running..");
});
