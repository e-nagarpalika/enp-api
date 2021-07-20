/** @format */

const logout = async (req, res) => {
  // res.cookie("token", accessToken, { httpOnly: true });
  res.clearCookie("token");

  return res.json({
    status: "Success",
    message: "Logout success",
  });
};

module.exports = logout;
