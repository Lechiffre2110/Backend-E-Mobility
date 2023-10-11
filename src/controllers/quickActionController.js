const { sendMeetingWebhook } = require("../utils/discord.js");
const { sendBookingEmail, sendUploadInvite } = require("../utils/email.js");

/**
 * Function to send a meeting notification to Discord
 * @param {*} req tje HTTP request object 
 * @param {*} res the HTTP response object 
 */
exports.sendMeetingReminder = async (req, res) => {
  if (
    req.body.title === undefined ||
    req.body.title === "" ||
    req.body.date === undefined ||
    req.body.date === "" ||
    req.body.time === undefined ||
    req.body.time === ""
  ) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const title = req.body.title;
  const time = req.body.time;
  const date = req.body.date;

  // Send notification about meeting to Discord, including the title, date and time
  sendMeetingWebhook(title, date, time);
  // TODO: you could also send an email here to all participants of the current semester

  return res.status(200).json({ message: "OK" });
};

/**
 * Function to send a booking request to the email addresses of the uni staff responsible for the garage
 * @param {*} req the HTTP request object
 * @param {*} res the HTTP response object
 */
exports.sendBookingRequest = async (req, res) => {

    // Check that request body contains all required fields
    if (
        req.body.text === undefined ||
        req.body.text === null ||
        req.body.text === ""
    ) {
        return res
        .status(400)
        .json({ error: "Bad Request: " + JSON.stringify(req.body) });
    }
    const text = req.body.text;

    // Send booking request via email
    sendBookingEmail(text);

    // Send ok response if successful
    return res.status(200).json({ message: "OK" });
    };

/**
 * Function to send an upload invite to a person via email
 * @param {*} req the HTTP request object
 * @param {*} res the HTTP response object
 */
exports.sendUploadInvite = async (req, res) => {
  // Check that request body contains all required fields
  if (
    req.body.email === undefined ||
    req.body.email === "" ||
    req.body.name === undefined ||
    req.body.name === "" ||
    req.body.link === undefined ||
    req.body.link === ""
  ) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

    const email = req.body.email;
    const name = req.body.name;
    const link = req.body.link;

    // Send upload invite via email, containing the name of the person and the personalized link to the upload page
    sendUploadInvite(email, name, link);

    // Send ok response if successful
    return res.status(200).json({ message: "OK" });

};
