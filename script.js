document.querySelectorAll(".know-more-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const craftSection = document.getElementById("craft-details");

    craftSection.classList.remove("hidden");

    document.querySelectorAll(".craft-box").forEach(function (box) {
      box.classList.add("hidden");
    });

    document.getElementById(targetId).classList.remove("hidden");

    craftSection.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("quoteForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = this.querySelector("button");
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  const formData = new FormData(this);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert("Thank you! Your booking inquiry has been sent.");
      this.reset();
    } else {
      alert("Something went wrong. Please contact Yzabel at 0413 326 097.");
    }
  } catch (error) {
    alert("Unable to send inquiry. Please contact Yzabel at 0413 326 097.");
  }

  submitButton.textContent = "Send Inquiry";
  submitButton.disabled = false;
});