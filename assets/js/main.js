/* Pelican Muay Thai — interactions */
(function(){
  "use strict";

  /* ---- Mobile menu ---- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu");
  if(burger && menu){
    burger.addEventListener("click", function(){
      burger.classList.toggle("open");
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        burger.classList.remove("open");
        menu.classList.remove("open");
      });
    });
  }

  /* ---- Carousel ---- */
  document.querySelectorAll(".carousel").forEach(function(car){
    var track = car.querySelector(".carousel-track");
    var prev = car.querySelector("[data-prev]");
    var next = car.querySelector("[data-next]");
    if(!track) return;
    function step(){
      var slide = track.querySelector(".slide");
      return slide ? slide.getBoundingClientRect().width + 18 : 360;
    }
    if(prev) prev.addEventListener("click", function(){ track.scrollBy({left:-step(),behavior:"smooth"}); });
    if(next) next.addEventListener("click", function(){ track.scrollBy({left:step(),behavior:"smooth"}); });

    /* autoplay (pause au survol, reprise à la sortie) */
    var timer = null;
    function tick(){
      if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8){
        track.scrollTo({left:0,behavior:"smooth"});
      }else{
        track.scrollBy({left:step(),behavior:"smooth"});
      }
    }
    function play(){ if(!timer) timer = setInterval(tick, 4500); }
    function pause(){ if(timer){ clearInterval(timer); timer = null; } }
    play();
    car.addEventListener("mouseenter", pause);
    car.addEventListener("mouseleave", play);
  });

  /* ---- Reveal on scroll ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  /* ---- Lightbox / zoom sur les affiches ---- */
  var zoomables = document.querySelectorAll(".zoomable");
  if(zoomables.length){
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<span class="lb-close" aria-label="Fermer">&times;</span><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    function openLb(src, alt){ lbImg.src = src; lbImg.alt = alt || ""; lb.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeLb(){ lb.classList.remove("open"); document.body.style.overflow = ""; }
    zoomables.forEach(function(img){
      img.addEventListener("click", function(){ openLb(img.getAttribute("src"), img.getAttribute("alt")); });
    });
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeLb(); });
  }

  /* ---- Footer year ---- */
  var y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();

  /* ---- Bandeau cookies ----
     Le site ne dépose AUCUN cookie de suivi (pas de Google Analytics, pas de
     carte Google Maps en iframe). Ce bandeau est une notice de transparence,
     réaffichable via le lien « Cookies » du pied de page. Le choix est mémorisé
     en localStorage (exempté de consentement, ce n'est pas un cookie). */
  var COOKIE_KEY = "pmt-cookie-choice";
  var banner = null;
  function buildBanner(){
    if(banner) return banner;
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Information cookies");
    banner.innerHTML =
      '<h4>🍪 Cookies &amp; confidentialité</h4>' +
      '<p>Ce site ne dépose aucun cookie de mesure d\'audience ni de publicité. ' +
      'Seules les données strictement nécessaires au fonctionnement sont utilisées. ' +
      'Plus d\'infos dans notre <a href="politique-confidentialite.html">politique de confidentialité</a>.</p>' +
      '<div class="cb-actions">' +
        '<button class="btn" data-cookie-ok>J\'ai compris</button>' +
        '<a class="btn btn--ghost" href="politique-confidentialite.html">En savoir plus</a>' +
      '</div>';
    document.body.appendChild(banner);
    banner.querySelector("[data-cookie-ok]").addEventListener("click", function(){
      try{ localStorage.setItem(COOKIE_KEY, "ok"); }catch(e){}
      banner.classList.remove("show");
    });
    return banner;
  }
  function showBanner(){ var b = buildBanner(); requestAnimationFrame(function(){ b.classList.add("show"); }); }
  var hasChoice = false;
  try{ hasChoice = localStorage.getItem(COOKIE_KEY) === "ok"; }catch(e){}
  if(!hasChoice){ setTimeout(showBanner, 900); }

  /* Réouverture depuis le pied de page (lien « Cookies ») */
  document.querySelectorAll("[data-cookie-settings]").forEach(function(link){
    link.addEventListener("click", function(e){ e.preventDefault(); showBanner(); });
  });

  /* ---- Contact form (mailto fallback) ---- */
  var form = document.getElementById("contactForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var d = new FormData(form);
      var body = "Nom: "+(d.get("name")||"")+"%0D%0A"
               + "Téléphone: "+(d.get("phone")||"")+"%0D%0A"
               + "Section: "+(d.get("section")||"")+"%0D%0A%0D%0A"
               + (d.get("message")||"");
      window.location.href = "mailto:pelicanmuaythai@gmail.com?subject="
        + encodeURIComponent("Contact site — "+(d.get("name")||""))
        + "&body="+body;
    });
  }
})();
