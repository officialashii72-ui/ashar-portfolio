const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const hamburger = $("#hamburger");
const navLinks = $("#navLinks");
hamburger &&
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    navLinks.classList.remove("show");
  });
});

(function typing() {
  const el = document.getElementById("typing");
  if (!el) return;
  const words = [
    "Websites",
    "Automations",
    "Landing Pages",
    "Digital Products",
  ];
  let wi = 0,
    ci = 0,
    deleting = false;
  function step() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);
    if (!deleting) {
      if (ci < word.length) {
        ci++;
        setTimeout(step, 80);
      } else {
        deleting = true;
        setTimeout(step, 900);
      }
    } else {
      if (ci > 0) {
        ci--;
        setTimeout(step, 40);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(step, 240);
      }
    }
  }
  step();
})();

const revealEls = $$(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

(function counters() {
  const nums = $$(".num");
  if (!nums.length) return;
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nums.forEach((n) => {
            const target = parseInt(n.dataset.target || "0", 10);
            let current = 0;
            const step = Math.max(1, Math.floor(target / 90));
            const id = setInterval(() => {
              current += step;
              if (current >= target) {
                n.textContent = target;
                clearInterval(id);
              } else n.textContent = current;
            }, 16);
          });
          o.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  const profile = document.querySelector(".card");
  if (profile) obs.observe(profile);
})();

(function netlifyForm() {
  const form = $("#contactForm");
  const msg = $("#formMsg");
  const btn = $("#submitBtn");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending...";
    msg.textContent = "";

    const data = new FormData(form);
    fetch("/", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          msg.style.color = "#8fe39a";
          msg.textContent = "Message sent — thank you!";
          form.reset();
        } else {
          return res.text().then((text) => {
            throw new Error(text || "Network error");
          });
        }
      })
      .catch((err) => {
        msg.style.color = "#ff9b9b";
        msg.textContent =
          "Oops — unable to send. Try again or email me directly.";
        console.error("Form error", err);
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "Send message";
      });
  });
})();

window.addEventListener("keydown", (e) => {
  if (e.key === "Tab")
    document.documentElement.classList.add("show-focus");
});
