const jwt = require("jsonwebtoken");
const Students = require("../../collection/model");
const secret_key = "$2a$12$7vtLZ/crrGLm6/exjBlNMO9kaNQbWcP5k2CFhMZ/cQIISwUqq6r";

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.dev;
    // for postman check
    // const token = req.headers['authorization'];
    const verifyUser = jwt.verify(token, secret_key);
    console.log(verifyUser);

    const user = Students.findOne({ _id: verifyUser._id });
    console.log(user);
    if (verify) {
        next();
    }
    else {
        res.send({ "message": "please enter Valid authtoken" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
