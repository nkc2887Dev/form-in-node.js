const express = require("express");
const app = express();
require("dotenv").config();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
require("../db/connect");
require("../src/Routes/Routes");

// Middleware
// const auth = require("../src/Middleware/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// same for body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public/css")));

const partialPath = path.join(__dirname, "../public/partials");
hbs.registerPartials(partialPath);

const templatePath = path.join(__dirname, "../public/Modal");
// console.log(path.join(__dirname, "../public/Modal"))

app.set("view engine", "hbs");
app.set("views", templatePath);

const StudentsController = require("../src/Controller/userController");

app.route("/").get(StudentsController.getHome);
app.route("/students").post(StudentsController.getStudents);
app.route("/secret").get(StudentsController.getSecret);
app
  .route("/register")
  .get(StudentsController.getRegisterData)
  .post(StudentsController.createRegisterData);
app
  .route("/login")
  .get(StudentsController.getLoginData)
  .post(StudentsController.createLoginData);
app.route("*").get(StudentsController.error);

app.listen(4000, "127.0.0.1", () => {
  console.log("Listening.......");
});
