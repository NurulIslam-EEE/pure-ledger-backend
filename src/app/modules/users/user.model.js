const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Please Provide a email"],
      unique: true,
    },
    employeeID: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: [true, "Please Provide a address"],
    },
    password: {
      type: String,
      required: [true, "Please Provide a password"],
      select: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
