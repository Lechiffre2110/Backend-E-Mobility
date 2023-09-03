const e = require("express");
var nodemailer = require("nodemailer");
var emailTemplate = require("./emailTemplate");

exports.sendOnboardingEmail = async (email, name) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"Projekt E-Mobility" <***-${process.env.EMAIL}>`,
    to: email,
    subject: "Projekt E-Mobility - Onboarding",
    html: emailTemplate.onboardingTemplate(name),
  });

  console.log(info.messageId);
};
