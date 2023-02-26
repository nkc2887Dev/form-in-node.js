const express = require("express");
const app = express();
// const Routes = express.Router();
const StudentsController = require("../Controller/userController");

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


