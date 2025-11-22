require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

// Use environment variable for SendGrid key
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.sendEmailReceipt = functions.https.onCall(async (data, context) => {
  const { to, subject, html } = data;

  if (!to || !subject || !html) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing 'to', 'subject', or 'html' parameter"
    );
  }

  try {
    const msg = {
      to,
      from: "you@yourdomain.com", // your verified SendGrid sender
      subject,
      html,
    };
    await sgMail.send(msg);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    console.error("SendGrid error:", err);
    throw new functions.https.HttpsError("unknown", err.message || err);
  }
});
