import express from "express";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.status(201).send({
    message: "Server is running fine...",
  });
});

app.post("/test", (req, res) => {
  res.status(201).send({
    message: "POST: Server is running fine...",
  });
});

app.put("/test", (req, res) => {
  res.status(201).send({
    message: "PUT: Server is running fine...",
  });
});

app.delete("/test", (req, res) => {
  res.status(201).send({
    message: "DELETE: Server is running fine...",
  });
});

app.listen(3001, () => {
  console.log("Server is running..");
});
