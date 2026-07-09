document.querySelectorAll(".know-more-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const craftSection = document.getElementById("craft-details");

    craftSection.classList.remove("hidden");

    document.querySelectorAll(".craft-box").forEach(function (box) {
      box.classList.add("hidden");
    });

    const selectedBox = document.getElementById(targetId);
    selectedBox.classList.remove("hidden");

    const slides = selectedBox.querySelectorAll(".craft-slideshow img");
    slides.forEach(function (slide, index) {
      slide.classList.remove("active");
      if (index === 0) slide.classList.add("active");
    });

    craftSection.scrollIntoView({ behavior: "smooth" });
  });
});

function startSlideshow(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = container.querySelectorAll(".craft-slideshow img");
  if (slides.length === 0) return;

  let current = 0;

  setInterval(function () {
    slides[current].classList.remove("active");

    current++;
    if (current >= slides.length) current = 0;

    slides[current].classList.add("active");
  }, 3000);
}

startSlideshow("ala-carte-info");
startSlideshow("buffet-info");
startSlideshow("canapes-info");

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

  submitButton.textContent = "Send Booking Inquiry";
  submitButton.disabled = false;
});