const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, phone, eventType, eventDate, guests, message } = req.body;

    if (!name || !phone || !eventType || !eventDate || !guests) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Missing Gmail environment variables"
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const emailText = `
NEW 8COURSE CATERING BOOKING INQUIRY

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
      to: "8coursecatering@gmail.com",
      subject: `New Booking Inquiry - ${eventType}`,
      text: emailText
    });

    return res.status(200).json({
      success: true,
      message: "Booking inquiry sent successfully"
    });

  } catch (error) {
    console.error("Booking email error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};