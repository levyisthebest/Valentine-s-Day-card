// script.js
const shell = document.getElementById("shell");
const typedEl = document.getElementById("typed");
const hint = document.getElementById("hint");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");

const lines = [
  "Happy Valentine’s Day, my dear 🫶",
  "I have a tiny question…",
  "Will you be my Valentine? 💖"
];

function typeLine(text, speed = 35) {
  return new Promise((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      typedEl.textContent = text.slice(0, i++);
      if (i > text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function runTyping() {
  typedEl.textContent = "";
  hint.textContent = "✨ Opening...";
  for (const l of lines) {
    await typeLine(l);
    await new Promise(r => setTimeout(r, 550));
  }
  hint.textContent = "👆 Choose one";
}

runTyping();

// Click to "open" on mobile (no hover)
shell.addEventListener("click", (e) => {
  // don't toggle when clicking buttons
  if (e.target.closest("button")) return;
  shell.classList.toggle("open");
});

// Yes button: confetti-ish hearts burst (simple)
btnYes.addEventListener("click", () => {
  hint.textContent = "Yay!! 💞 I knew it!";
  burstHearts();
});

// No button: run away
btnNo.addEventListener("mouseenter", moveNo);
btnNo.addEventListener("click", moveNo);

function moveNo() {
  const rect = btnNo.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - 24;
  const maxY = window.innerHeight - rect.height - 24;
  const x = Math.max(12, Math.min(maxX, Math.random() * maxX));
  const y = Math.max(12, Math.min(maxY, Math.random() * maxY));
  btnNo.style.position = "fixed";
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
  btnNo.style.zIndex = 9999;
  hint.textContent = "No is not an option 🙈";
}

function burstHearts() {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.textContent = "💗";
    s.style.position = "fixed";
    s.style.left = `${Math.random() * window.innerWidth}px`;
    s.style.top = `${window.innerHeight - 40}px`;
    s.style.fontSize = `${14 + Math.random() * 18}px`;
    s.style.transition = "transform 1.2s ease, opacity 1.2s ease";
    s.style.opacity = "1";
    s.style.zIndex = "9999";
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      const dx = (Math.random() - 0.5) * 240;
      const dy = 220 + Math.random() * 280;
      s.style.transform = `translate(${dx}px, -${dy}px) rotate(${(Math.random()-0.5)*60}deg)`;
      s.style.opacity = "0";
    });

    setTimeout(() => s.remove(), 1300);
  }
}
