# Server side

- Create the server with Express

```javascript
import express from "express";
const app = express();
app.listen(3001, () => {
  console.log("Server is running..");
});
```

- HTTP req and res. How they work?

```javascript
app.get("/test", (req, res) => {
  res.status(201).send({
    message: "Server is running fine...",
  });
});
```

- How to use nodemon and morgan package

```bsh
npm i --save-dev <package-name>
```

- API testing (GET, POST, DELETE, PUT) with Postman and Thunder CLI

```javascript
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
```

- Middleware - works between request and response

```javascript
const isLoggedIn = (req, res, next) => {
  console.log("Some text");
  next();
};

app.get("/api/profile", isLoggedIn, (req, res) => {
  res.status(201).send({
    message: "Showing user profile...",
  });
});
```

In that case, before showing user profile, it will check is user logged in. </br> We can also use logical conditions in the middleware

```javascript
const isLoggedIn = (req, res, next) => {
  const flag = false;
  if (flag) {
    next();
  } else {
    return res.status(401).json({
      message: "Log in first...",
    });
  }
};
```

learn more from [here](https://expressjs.com/en/guide/using-middleware.html)
