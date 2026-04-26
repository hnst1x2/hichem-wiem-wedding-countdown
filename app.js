const WEDDING_DATE = new Date("2026-06-28T15:00:00+01:00").getTime();

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const previous = { days: null, hours: null, minutes: null, seconds: null };

function pad(n, size = 2) {
  return String(n).padStart(size, "0");
}

function update(el, value, key) {
  const formatted = key === "days" ? pad(value, 3) : pad(value);
  if (previous[key] !== formatted) {
    el.textContent = formatted;
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
    previous[key] = formatted;
  }
}

function tick() {
  const now = Date.now();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    update(els.days, 0, "days");
    update(els.hours, 0, "hours");
    update(els.minutes, 0, "minutes");
    update(els.seconds, 0, "seconds");
    document.querySelector(".quote").textContent =
      "C'est le grand jour ! Que l'amour vous accompagne pour toujours.";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  update(els.days, days, "days");
  update(els.hours, hours, "hours");
  update(els.minutes, minutes, "minutes");
  update(els.seconds, seconds, "seconds");
}

tick();
setInterval(tick, 1000);

const petalsLayer = document.querySelector(".petals");
const PETAL_COUNT = 28;

function spawnPetal(initial = false) {
  const p = document.createElement("span");
  const isGold = Math.random() < 0.3;
  const sizeRoll = Math.random();
  p.className = "petal" +
    (isGold ? " gold" : "") +
    (sizeRoll < 0.3 ? " tiny" : sizeRoll > 0.85 ? " large" : "");

  const duration = 8 + Math.random() * 10;
  const drift = (Math.random() * 240 - 120).toFixed(0) + "px";
  const delay = initial ? -Math.random() * duration : Math.random() * 4;

  p.style.left = Math.random() * 100 + "vw";
  p.style.setProperty("--drift", drift);
  p.style.animationDuration = duration + "s";
  p.style.animationDelay = delay + "s";

  p.addEventListener("animationiteration", () => {
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--drift", (Math.random() * 240 - 120).toFixed(0) + "px");
  });

  petalsLayer.appendChild(p);
}

for (let i = 0; i < PETAL_COUNT; i++) spawnPetal(true);
