document.addEventListener("DOMContentLoaded", () => {
  const wordle = document.getElementById("name-wordle");
  const tiles = document.querySelectorAll("#name-wordle .flip");
  const panels = document.querySelectorAll(".panel-reveal");
  const skipHash = window.location.hash === "#about";
  const timeouts = [];
  let animating = false;

  const clearTimeouts = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.length = 0;
  };

  const hideHint = () => {
    const hint = document.querySelector(".animation-hint");
    if (hint) hint.classList.add("is-hidden");
  };

  const finishAnimation = () => {
    if (!animating && !skipHash) return;
    animating = false;
    clearTimeouts();
    if (wordle) wordle.classList.add("skip-anim");
    tiles.forEach((flip) => flip.classList.add("reveal"));
    panels.forEach((panel) => panel.classList.add("is-visible"));
    hideHint();
  };

  if (skipHash) {
    if (wordle) wordle.classList.add("skip-anim");
    tiles.forEach((flip) => flip.classList.add("reveal"));
    panels.forEach((panel) => panel.classList.add("is-visible"));
    return;
  }

  if (tiles.length === 0) {
    panels.forEach((panel) => panel.classList.add("is-visible"));
    return;
  }

  animating = true;

  const hint = document.createElement("p");
  hint.className = "animation-hint";
  hint.textContent = "Press any key to skip animation";
  if (wordle && wordle.parentNode) {
    wordle.insertAdjacentElement("afterend", hint);
  }

  const TILE_STAGGER = 270;
  const PANEL_STAGGER = 140;
  const AFTER_TILES = 200;

  tiles.forEach((flip, index) => {
    timeouts.push(
      setTimeout(() => {
        flip.classList.add("reveal");
      }, index * TILE_STAGGER)
    );
  });

  const revealDelay = tiles.length * TILE_STAGGER + AFTER_TILES;

  panels.forEach((panel, index) => {
    timeouts.push(
      setTimeout(() => {
        panel.classList.add("is-visible");
      }, revealDelay + index * PANEL_STAGGER)
    );
  });

  const totalMs =
    revealDelay + Math.max(panels.length - 1, 0) * PANEL_STAGGER + 400;

  timeouts.push(
    setTimeout(() => {
      animating = false;
      hideHint();
    }, totalMs)
  );

  const onSkipKey = (e) => {
    if (!animating) return;
    if (e.target.closest("input, textarea, select, button, [contenteditable='true']")) {
      return;
    }
    e.preventDefault();
    finishAnimation();
  };

  document.addEventListener("keydown", onSkipKey);
});

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
