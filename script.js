document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const eventType = document.getElementById("eventType").value;
  const eventDate = document.getElementById("eventDate").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("message").value;

  const inquiry = `
New Catering Inquiry:

Name: ${name}
Phone: ${phone}
Event Type: ${eventType}
Event Date: ${eventDate}
Guests: ${guests}
Message: ${message}
  `;

  const encodedMessage = encodeURIComponent(inquiry);

  // Replace this with your WhatsApp number later
  const whatsappNumber = "639000000000";

  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
});