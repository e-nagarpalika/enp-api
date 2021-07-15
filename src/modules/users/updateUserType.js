/** @format */

const userModel = require("./model");

const updateUserType = async (req, res) => {
  const { role } = req.user;
  // eslint-disable-next-line no-console
  // console.log(role);
  if (role !== 2) {
    return res.status(403).send("Forbidden Action");
  }

  const { phoneNumber, accountType, city } = req.body;

  const user = await userModel.findOne({ phoneNumber });

  if (accountType === 2) {
    user.accountType = accountType;
  }

  if (accountType === 1 && city) {
    user.accountType = accountType;
    user.city = city;
  }

  if (accountType === 1 && !city) {
    return res.status(409).json({
      status: false,
      message: "Incomplete Request",
    });
  }

  await user.save();
  return res.status(200).json({
    status: true,
    message: "Upgraded to Admin",
  });
};

module.exports = updateUserType;
