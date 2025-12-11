
document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll("#name-wordle .flip");

  tiles.forEach((flip, index) => {
    setTimeout(() => {
      flip.classList.add("reveal");
    }, index * 350); // 0ms, 200ms, 400ms, ...
  });
});

// CONTACT FORM

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending...";

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://kmy1rl7d2j.execute-api.us-west-2.amazonaws.com/default/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        statusEl.textContent = "Message sent! Thank you :)";
        form.reset();
      } else {
        statusEl.textContent = "Something went wrong. Please try again.";
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Please try again later.";
    }
  });
}
