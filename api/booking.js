const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, phone, eventType, eventDate, guests, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"8Course Catering Website" <${process.env.GMAIL_USER}>`,
      to: "8coursecatering@gmail.com",
      subject: `New Booking Inquiry - ${eventType}`,
      text: `
New Booking Inquiry

Name: ${name}
Phone: ${phone}
Event Type: ${eventType}
Event Date: ${eventDate}
Guests: ${guests}

Message:
${message || "No message provided"}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("BOOKING EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};