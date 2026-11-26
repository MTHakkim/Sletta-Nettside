/* ==========================================================
   Sletta Ekeberg – script
   ========================================================== */

(function () {
  "use strict";

  /* ---------- Mobilmeny ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function setMenu(open) {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny");
    mobileMenu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Lukk menyen når man klikker på en lenke
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Lukk med Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });

    // Lukk hvis vinduet blir bredt nok til desktop-meny
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1000) setMenu(false);
    });
  }

  /* ---------- Marker aktiv seksjon i menyen ---------- */
  var navLinks = document.querySelectorAll(".nav-left a[data-nav]");
  var sections = ["hjem", "om-oss", "apningstider"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.dataset.nav === entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Marker dagens åpningstid ---------- */
  var today = new Date().getDay(); // 0 = søndag
  var todayRow = document.querySelector('#hours-list li[data-day="' + today + '"]');
  if (todayRow) todayRow.classList.add("is-today");

  /* ---------- Årstall i footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
