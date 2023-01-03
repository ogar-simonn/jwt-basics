const { BadRequest } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const id = new Date().getTime();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return res.status(200).json({ msg: "user create", token });
  } else {
    throw new BadRequest("Please Provide values");
  }
};
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  return res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};
module.exports = {
  login,
  dashboard,
};
