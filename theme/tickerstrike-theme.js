/* ============================================================
   TickerStrike — "Big Board" theme behaviors · v0.1
   Framework-agnostic vanilla JS. Zero dependencies. ~120 lines.
   API: data attributes only, so it works with plain HTML, ERB,
   Turbo-rendered fragments, or any framework. Also exported on
   window.TickerStrikeTheme for programmatic use / Stimulus wrappers.

   Behaviors:
     [data-ts-toast="MSG"]        → click shows machine-voice toast
     [data-ts-guard]              → two-step strike control container:
                                    expects .ts-guard + .ts-fire children;
                                    guard lifts, fire arms, auto-reseats after
                                    data-ts-reseat ms (default 8000)
     [data-ts-boot]               → progressive teletype reveal, ordered by
                                    data-ts-boot="1","2","3"… within a
                                    [data-ts-session] container; re-runs each
                                    time the session becomes visible
     .ts-bars inside a session    → histogram bars rise on boot
   Turbo-safe: init() is idempotent; call on turbo:load / DOMContentLoaded.
   ============================================================ */
(function () {
  "use strict";
  const TS = {};

  /* ---------- toast ---------- */
  let toastEl, toastTimer;
  function ensureToast() {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "ts-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    return toastEl;
  }
  TS.toast = function (msg, ms) {
    const t = ensureToast();
    t.textContent = msg;
    t.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-shown"), ms || 4200);
  };

  /* ---------- two-step strike ---------- */
  function initGuard(ctl) {
    if (ctl._tsInit) return; ctl._tsInit = true;
    const guard = ctl.querySelector(".ts-guard");
    const fire = ctl.querySelector(".ts-fire");
    if (!guard || !fire) return;
    const reseatMs = parseInt(ctl.getAttribute("data-ts-reseat") || "8000", 10);
    let reseatTimer;
    fire.disabled = true;

    guard.addEventListener("click", () => {
      guard.classList.add("is-open");
      fire.disabled = false;
      fire.classList.add("is-live");
      ctl.dispatchEvent(new CustomEvent("ts:guard-lifted", { bubbles: true }));
      reseatTimer = setTimeout(reseat, reseatMs);
    });
    function reseat() {
      if (!guard.classList.contains("is-open") || fire.dataset.fired) return;
      guard.classList.remove("is-open");
      fire.disabled = true;
      fire.classList.remove("is-live");
      ctl.dispatchEvent(new CustomEvent("ts:guard-reseated", { bubbles: true }));
    }
    fire.addEventListener("click", () => {
      if (fire.disabled) return;
      clearTimeout(reseatTimer);
      fire.dataset.fired = "1";
      fire.disabled = true;
      fire.classList.remove("is-live");
      /* the host app decides what firing means: listen for ts:fired */
      ctl.dispatchEvent(new CustomEvent("ts:fired", { bubbles: true }));
    });
  }

  /* ---------- machine-session boot (teletype reveal) ---------- */
  function bootSession(sess) {
    const items = Array.from(sess.querySelectorAll("[data-ts-boot]"))
      .sort((a, b) => (+a.dataset.tsBoot || 0) - (+b.dataset.tsBoot || 0));
    items.forEach((el) => el.classList.remove("is-booted"));
    sess.querySelectorAll(".ts-bars").forEach((b) => b.classList.remove("is-booted"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let delay = 100;
    items.forEach((el) => {
      if (reduced) { el.classList.add("is-booted"); return; }
      setTimeout(() => el.classList.add("is-booted"), delay);
      delay += parseInt(el.getAttribute("data-ts-boot-delay") || "450", 10);
    });
    const bars = sess.querySelectorAll(".ts-bars");
    bars.forEach((b) => setTimeout(() => b.classList.add("is-booted"), reduced ? 0 : delay));
  }
  TS.bootSession = bootSession;

  function initSession(sess) {
    if (sess._tsObserved) return; sess._tsObserved = true;
    /* boot when it becomes visible (works for tabs, Turbo frames, pages) */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) bootSession(sess); });
    }, { threshold: 0.2 });
    io.observe(sess);
  }

  /* ---------- theme packs (v0.2) ----------
     Themes are pure CSS token packs; JS only flips data-ts-theme and
     persists the choice. "bigboard" = the default mix (no attribute). */
  TS.THEMES = {
    "bigboard": "BIG BOARD",
    "bigboard-blue": "BOARD BLUE",
    "sim-green": "SIM GREEN",
    "sim-blue": "SIM BLUE"
  };
  const THEME_KEY = "ts-theme";
  TS.getTheme = function () {
    const app = document.querySelector(".ts-app");
    return (app && app.getAttribute("data-ts-theme")) || "bigboard";
  };
  TS.setTheme = function (name) {
    if (!TS.THEMES[name]) name = "bigboard";
    document.querySelectorAll(".ts-app").forEach((app) => {
      if (name === "bigboard") app.removeAttribute("data-ts-theme");
      else app.setAttribute("data-ts-theme", name);
    });
    try { localStorage.setItem(THEME_KEY, name); } catch (e) { /* private mode */ }
    document.querySelectorAll("[data-ts-theme-toggle] button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.tsThemeName === name);
    });
    document.dispatchEvent(new CustomEvent("ts:theme-changed", { detail: { theme: name } }));
  };
  function initThemeToggle(el) {
    if (el._tsInit) return; el._tsInit = true;
    const current = TS.getTheme();
    Object.keys(TS.THEMES).forEach((name) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = TS.THEMES[name];
      b.dataset.tsThemeName = name;
      b.classList.toggle("is-active", name === current);
      b.addEventListener("click", () => TS.setTheme(name));
      el.appendChild(b);
    });
  }
  function applySavedTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }
    if (saved && TS.THEMES[saved]) TS.setTheme(saved);
  }

  /* ---------- init (idempotent; Turbo-safe) ---------- */
  TS.init = function (root) {
    const scope = root || document;
    scope.querySelectorAll("[data-ts-toast]").forEach((el) => {
      if (el._tsInit) return; el._tsInit = true;
      el.addEventListener("click", () => TS.toast(el.getAttribute("data-ts-toast")));
    });
    scope.querySelectorAll("[data-ts-guard]").forEach(initGuard);
    scope.querySelectorAll("[data-ts-session]").forEach(initSession);
    scope.querySelectorAll("[data-ts-theme-toggle]").forEach(initThemeToggle);
    applySavedTheme();
  };

  document.addEventListener("DOMContentLoaded", () => TS.init());
  document.addEventListener("turbo:load", () => TS.init());
  document.addEventListener("turbo:frame-load", (e) => TS.init(e.target));

  window.TickerStrikeTheme = TS;
})();
