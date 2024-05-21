const jwtHelpers = require("../../../helpers/jwtHelpers");
const User = require("./user.model");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BYCRYPT_SALT_ROUND)
  );
  const createService = await User.create(user);
  // if (!createService) {
  //   throw new ApiError(400, "Failed to create user");
  // }

  return createService;
};

exports.loginUser = async (loginData) => {
  const { employeeID, password } = loginData;
  const isUserExist = await User.findOne(
    { employeeID },
    { employeeID: 1, email: 1, password: 1, role: 1 }
  );

  if (!isUserExist) {
    return {
      message: "user not exist",
    };
  }

  const matchPassword = await bcrypt.compare(password, isUserExist.password);

  if (!matchPassword) {
    return {
      message: "wrong password",
    };
  }
  const { _id, email, employeeID: ID } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, email, employeeID: ID },
    process.env.SECRET,
    process.env.JWT_EXPIRES_IN
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email, employeeID: ID },
    process.env.SECRET,
    process.env.JWT_REFRESH_EXPIRES_IN
  );
  console.log("lllll", accessToken);
  return {
    accessToken,
    refreshToken,
  };
};
