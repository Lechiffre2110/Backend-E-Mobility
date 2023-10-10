const e = require("express");
var nodemailer = require("nodemailer");
var emailTemplate = require("./emailTemplate");

/**
 * Function to send an email to send an onboarding email to an approved user
 * @param {String} email email of the user 
 * @param {String} name name of the user 
 */
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

};

/**
 * Function to send an email to send a booking email to the garage team
 * @param {String} text the text of the email 
 */
exports.sendBookingEmail = async (text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"Projekt E-Mobility" <***-${process.env.EMAIL}>`,
    to: [process.env.EMAIL_HALLE_HAUFFE, process.env.EMAIL_HALLE_STURM],
    subject: "Projekt E-Mobility - Booking Request",
    text: text
  });
}

exports.sendUploadInvite = async (email, name, link) => {
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
    subject: "Projekt E-Mobility - Upload",
    text: `Sehr geehrte/r ${name},\n\nbitte nutzen Sie diesen Link um die gesammelten Dateien hochzuladen: ${link}\n\nMit freundlichen Grüßen,\n\nProjekt E-Mobility`
  });
}


