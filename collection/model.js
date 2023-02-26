const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = "$2a$12$7vtLZ/crrGLm6/exjBlNMO9kaNQbWcP5k2CFhMZ/cQIISwUqq6r";

const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Error");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },
  pass: {
    type: String,
    required: true,
  },
  conPass: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Document Middleware == > for generate token
studentSchema.methods.generateAuthToken = async function () {
  try {
    const genToken = await jwt.sign({ _id: this._id.toString() }, secret_key, {
      expiresIn: "50d",
    });
    this.tokens = this.tokens.concat({ token: genToken });
    await this.save();
    return genToken;
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

// Document Middleware == > Middleware for hashing password in Registration Form
studentSchema.pre("save", async function (next) {
  if (this.isModified("pass") || this.isModified("conPass")) {
    this.pass = await bcrypt.hash(this.pass, 12);
    this.conPass = await bcrypt.hash(this.conPass, 12);
  }
  next();
});

// Created Collection
const Students = new mongoose.model("Students", studentSchema);

module.exports = Students;
