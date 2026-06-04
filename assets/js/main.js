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

    /* autoplay */
    var timer = setInterval(function(){
      if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8){
        track.scrollTo({left:0,behavior:"smooth"});
      }else{
        track.scrollBy({left:step(),behavior:"smooth"});
      }
    }, 4500);
    car.addEventListener("mouseenter", function(){ clearInterval(timer); });
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
