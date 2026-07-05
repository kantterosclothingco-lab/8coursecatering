const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, eventType, eventDate, guests, message } = req.body;

  if (!name || !phone || !eventType || !eventDate || !guests) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const emailBody = `
New Catering Booking Inquiry

Name: ${name}
Phone: ${phone}
Event Type: ${eventType}
Event Date: ${eventDate}
Number of Guests: ${guests}

Message:
${message || "No message provided"}

Website:
8coursecatering.com
`;

  await transporter.sendMail({
    from: `"8Course Catering Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Booking Inquiry - ${eventType}`,
    text: emailBody,
  });

  return res.status(200).json({ message: "Booking inquiry sent successfully" });
};