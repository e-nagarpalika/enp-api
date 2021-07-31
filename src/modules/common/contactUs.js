/** @format */

const nodemailer = require("nodemailer");

const { MAILER_USERNAME, MAILER_PASSWORD } = process.env;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAILER_USERNAME,
    pass: MAILER_PASSWORD,
  },
});

const contactUs = async (req, res) => {
  const { email, title, description } = req.body;

  const mailOptions = {
    from: MAILER_USERNAME,
    to: MAILER_USERNAME,
    subject: {
      title,
    },
    html: `Email: ${email}
    ${description}
    `,
  };

  await transporter.sendMail(mailOptions);

  return res.json({
    status: "Success",
  });
};

module.exports = contactUs;
