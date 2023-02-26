const bcrypt = require("bcryptjs");
const Students = require("../../collection/model");
let Auth = require("../Middleware/auth");

exports.getStudents = async (req, res) => {
  const student = new Students(req.body);
  student
    .save()
    .then(() => {
      res.status(201).json(student.fullname);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getHome = (req, res) => {
  res.status(200).render("home");
};

exports.getSecret = Auth.auth,
  (req, res) => {
    res.writeHead(200);
    res.status(200).render("secret");
  };

exports.getRegisterData = (req, res) => {
  res.status(200).render("registration");
};

exports.createRegisterData = async (req, res) => {
  try {
    const password = req.body.pass;
    const conPassword = req.body.conPass;
    if (password === conPassword) {
      const student = new Students({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        pass: password,
        conPass: conPassword,
        gender: req.body.gender,
      });

      // Password Hash Middleware in schema folder

      // Token Middleware in schema folder
      const token = await student.generateAuthToken();
      // console.log(token);

      // the res.cookie() func used to set the cookie name to value
      // the value parameter must b e string or object converted to json
      // syntax: res.cookie(name, value, [options])
      // _shopify_y
      res.cookie("dev", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      console.log(cookie);

      const postData = await student.save();
      // console.log(postData);
      res.writeHead(201);
      res.render("home");
    } else {
      res.send("Password Not Match");
    }
  } catch (err) {
    res.send(err);
  }
};

exports.getLoginData = (req, res) => {
  res.status(200).render("login");
};

exports.createLoginData = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Students.findOne({ email });
    if (!userEmail) {
      res.writeHead(400);
      return res.json("user not found");
    }

    // /////Middlware for read hashing password
    // const isMatch = await bcrypt.compare(user input password, user input password where register)
    const isMatch = await bcrypt.compare(password, userEmail.pass);

    const token = await userEmail.generateAuthToken();
    console.log(token);

    res.cookie("dev_login", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
    });
    console.log(cookie);

    // if (userEmail.pass === password) {
    if (isMatch) {
      res.status(201).render("home");
    } else {
      res.status(401).send("Invalid Data");
    }

    res.send(userEmail);
    // console.log(userEmail);
    // console.log(`${email}, ${password}`);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.error = (req, res) => {
  res.status(200).json("Error");
};

// bcrypt..................
// const bcrypt = require("bcryptjs");

// const securePass = async (pass) => {
//   const passHash = await bcrypt.hash(pass, 12);
//   console.log(passHash);
//   const passHashReturn = await bcrypt.compare(pass, passHash);
//   console.log(passHashReturn);
// };

// securePass("dev45");

// jwt token ...................
// const jwt = require("jsonwebtoken");

// const createToken = async () => {
//   // token link = header.payload.verify Signature
//   // const token = await jwt.sign({_id:"unique parameter of document"},"secret key",{"expiresIn"});
//   const token = await jwt.sign(
//     { _id: "63b7cb9560a64241bb082e4a" },
//     "$2a$12$7vtLZ/crrGLm6/exjBlNMO9kaNQbWcP5k2CFhMZ/cQIISwUqq6r",
//     {
//       expiresIn: "50d",
//     }
//   );
//   console.log(token);

//   const isVerifyUser = await jwt.verify(token, "$2a$12$7vtLZ/crrGLm6/exjBlNMO9kaNQbWcP5k2CFhMZ/cQIISwUqq6r")
//   console.log(isVerifyUser);
// };

// createToken();
