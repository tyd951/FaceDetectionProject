const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "face_project"
  }
});

app.use(bodyParser.json());
app.use(cors());

// root route
app.get("/", (req, res) => {
  res.send(database.users);
});

// signin route
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// register route
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// profile route
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// image route
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
