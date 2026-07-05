document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = this.querySelector("button");
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  const bookingData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    eventType: document.getElementById("eventType").value,
    eventDate: document.getElementById("eventDate").value,
    guests: document.getElementById("guests").value,
    message: document.getElementById("message").value,
  };

  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      alert("Thank you! Your booking inquiry has been sent.");
      document.getElementById("quoteForm").reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Unable to send inquiry. Please contact Yzabel directly at 0413 326 097.");
  }

  submitButton.textContent = "Send Inquiry";
  submitButton.disabled = false;
});