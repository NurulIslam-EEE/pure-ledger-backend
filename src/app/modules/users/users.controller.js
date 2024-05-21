const userService = require("./users.service");

exports.createUser = async (req, res) => {
  try {
    console.log("rrr", req.body);
    const result = await userService.createUser(req.body);
    res.send({
      message: "successfully created",
      success: true,
      data: result,
    });
  } catch (err) {
    res.send({
      message: "failed to  created",
      success: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.send({
      message: "successfully login",
      success: true,
      data: result,
    });
  } catch (err) {
    res.send({
      message: "failed to  login",
      success: false,
    });
  }
};
