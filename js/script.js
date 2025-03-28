const bodyElement = document.querySelector("body"),
  circleIntro = document.querySelector(".intro-circle"),
  links = document.querySelectorAll(".social-link"),
  menuLinks = document.querySelectorAll(".item"),
  circleMenu = document.querySelector(".circle-menu"),
  screenContainer = document.querySelector(".screen-container"),
  homeContainer = document.querySelector(".home-container"),
  contents = document.querySelector(".contents"),
  contentsDemos = document.querySelector(".contents .contents__demos"),
  dynamicText = document.querySelector(".writing h1 span"),
  words = ["a Embedded  Developer", "Ahmet Hakan \u015Eahin"],
  writing = document.querySelector(".writing"),
  projectContent = document.getElementById("container__project"),
  sliderItem = document.querySelectorAll(".contents__demos .slider-item img");
let wordIndex = 0,
  charIndex = 0;
isDeleting = !1;
const typeEffect = () => {
  const a = words[wordIndex],
    b = a.substring(0, charIndex);
  (dynamicText.textContent = b),
    dynamicText.classList.add("stop-blinking"),
    !isDeleting && charIndex < a.length
      ? (charIndex++, setTimeout(typeEffect, 200))
      : isDeleting && 0 < charIndex
      ? (charIndex--, setTimeout(typeEffect, 100))
      : ((isDeleting = !isDeleting),
        dynamicText.classList.remove("stop-blinking"),
        (wordIndex = isDeleting ? wordIndex : (wordIndex + 1) % words.length),
        setTimeout(typeEffect, 1200));
};
typeEffect(),
  links.forEach(function (a) {
    a.addEventListener("mouseenter", function (a) {
      a.target.classList.add("active"),
        links.forEach(function (a) {
          a.classList.contains("active") || a.classList.add("not-active");
        });
    }),
      a.addEventListener("mouseleave", function (a) {
        a.target.classList.remove("active"),
          links.forEach(function (a) {
            a.classList.contains("not-active") &&
              a.classList.remove("not-active");
          });
      });
  });
function activeFunction() {
  circleIntro.querySelector(".circle").classList.add("active"),
    setTimeout(nondisplaying, 2500),
    setTimeout(displaying, 3500),
    setTimeout(opaciting, 3600);
}
function nondisplaying() {
  circleIntro.classList.add("hide");
}
function displaying() {
  circleIntro.remove("intro-circle"),
    screenContainer.classList.remove("hide-display");
}
function opaciting() {
  homeContainer.insertBefore(circleIntro, homeContainer.firstChild),
    circleIntro.classList.remove("intro-circle"),
    circleIntro.classList.add("home-circle"),
    screenContainer.classList.remove("hide"),
    handleResize();
}
menuLinks.forEach(function (a) {
  a.addEventListener("click", function () {
    writing.classList.add("hide"),
      contents.classList.add("contents-time"),
      homeContainer.classList.add("contents-time");
      if (projectContent.classList.contains("show")) {
        projectContent.classList.remove("show");
      } 
    for (let b of menuLinks)
      a === b
        ? a.classList.contains("active") || a.classList.add("active")
        : b.classList.remove("active");
    for (let b in [...menuLinks])
      a == menuLinks[b]
        ? contents.children[b].classList.add("show")
        : contents.children[b].classList.remove("show");
  }),
    (a.innerHTML = a.innerText
      .split("")
      .map((a, b) => `<span style="transition-delay:${40 * b}ms;">${a}</span>`)
      .join(""));
});
const lerp = (a, b, c) => (1 - c) * a + c * b,
  clamp = (a, b, c) => Math.max(b, Math.min(a, c));
class DragScroll {
  constructor(a) {
    (this.el = document.querySelector(a.el)),
      (this.wrap = document.querySelector(a.wrap)),
      (this.items = document.querySelectorAll(a.item)),
      (this.bar = document.querySelector(a.bar)),
      this.init();
  }
  init() {
    (this.progress = 0),
      (this.speed = 0),
      (this.oldX = 0),
      (this.x = 0),
      (this.playrate = 0),
      this.bindings(),
      this.events(),
      this.calculate(),
      this.raf();
  }
  bindings() {
    [
      "events",
      "calculate",
      "raf",
      "handleWheel",
      "move",
      "handleTouchStart",
      "handleTouchMove",
      "handleTouchEnd",
    ].forEach((a) => {
      this[a] = this[a].bind(this);
    });
  }
  calculate() {
    (this.progress = 0),
      (this.wrapWidth = this.items[0].clientWidth * this.items.length),
      (this.wrap.style.width = `${this.wrapWidth}px`),
      (this.maxScroll = this.wrapWidth - (90 * this.el.clientWidth) / 100);
  }
  handleWheel(a) {
    (this.progress += a.deltaY), this.move();
  }
  handleTouchStart(a) {
    "A" === a.target.tagName || a.target.closest("a") || a.preventDefault(),
      (this.dragging = !0),
      (this.startX = a.clientX || a.touches[0].clientX);
  }
  handleTouchMove(a) {
    if (!this.dragging) return !1;
    const b = a.clientX || a.touches[0].clientX;
    (this.progress += 2.5 * (this.startX - b)), (this.startX = b), this.move();
  }
  handleTouchEnd() {
    this.dragging = !1;
  }
  move() {
    this.progress = clamp(this.progress, 0, this.maxScroll);
  }
  events() {
    window.addEventListener("resize", this.calculate),
      window.addEventListener("wheel", this.handleWheel),
      this.el.addEventListener("touchstart", this.handleTouchStart),
      window.addEventListener("touchmove", this.handleTouchMove),
      window.addEventListener("touchend", this.handleTouchEnd),
      document
        .querySelector(".contents__demos")
        .addEventListener("mousedown", this.handleTouchStart),
      window.addEventListener("mousemove", this.handleTouchMove),
      window.addEventListener("mouseup", this.handleTouchEnd),
      document.body.addEventListener("mouseleave", this.handleTouchEnd);
  }
  raf() {
    (this.x = lerp(this.x, this.progress, 0.1)),
      (this.playrate = this.x / this.maxScroll),
      (this.wrap.style.transform = `translate(${-this.x}px)`),
      (this.bar.style.transform = `scaleX(${0.18 + 0.82 * this.playrate})`),
      (this.speed = Math.min(100, this.oldX - this.x)),
      (this.oldX = this.x),
      (this.scale = lerp(this.scale, this.speed, 0.1)),
      this.items.forEach((a) => {
        (a.style.transform = `scale(${1 - 0.005 * Math.abs(this.speed)})`),
          (a.querySelector("img").style.transform = `scaleX(${
            1 + 0.004 * Math.abs(this.speed)
          })`);
      });
  }
}
document.querySelector(".pages__demos").addEventListener("click", function () {
  const a = new DragScroll({
      el: ".contents__demos .slider",
      wrap: ".contents__demos .slider-wrapper",
      item: ".contents__demos .slider-item",
      bar: ".contents__demos .slider-progress-bar",
    }),
    b = () => {
      requestAnimationFrame(b), a.raf();
    };
  b();
});
function activeMenuCircle() {
  const a = document.querySelector(".menu");
  (circleIntro.querySelector(".img").style.display = "none"),
    circleIntro.querySelector(".circle").classList.add("mobile"),
    circleIntro.classList.add("mobile"),
    circleMenu.classList.add("active"),
    circleMenu.insertBefore(a, circleMenu.firstChild),
    circleIntro.insertBefore(
      circleIntro.querySelector(".circle"),
      circleIntro.firstChild
    );
}
function notActiveMenuCircle() {
  const a = document.querySelector(".menu");
  (circleIntro.querySelector(".img").style.display = "block"),
    circleIntro.querySelector(".circle").classList.remove("mobile"),
    circleIntro.classList.remove("mobile"),
    circleMenu.classList.remove("active"),
    homeContainer.insertBefore(a, homeContainer.firstChild),
    circleIntro.insertBefore(
      circleIntro.querySelector(".circle"),
      circleIntro.firstChild
    );
}
function handleResize() {
  let a = window.innerWidth;
  490 > a ? activeMenuCircle() : notActiveMenuCircle();
}
let width = window.innerWidth;
900 < width && window.addEventListener("resize", handleResize),
  ("ontouchstart" in window || navigator.maxTouchPoints) &&
    (document.querySelectorAll(".overlay").forEach(function (a) {
      a.classList.add("mobile-overlay"), a.classList.remove("overlay");
    }),
    document
      .querySelectorAll(
        ".screen-container .home-container .contents__demos .slider-item figure"
      )
      .forEach(function (a) {
        a.removeAttribute("class");
      }));
let vh = 0.01 * window.innerHeight;
document.documentElement.style.setProperty("--vh", `${vh}px`),
  window.addEventListener("resize", () => {
    let a = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${a}px`);
  }),
  activeFunction();



  // Tüm slider item'lar için tıklama olayını dinle
document.querySelectorAll(".slider-item a").forEach(item => {
    item.addEventListener("click", function(event) {
      event.preventDefault(); // Varsayılan link davranışını engelle
  
      const targetId = event.target.closest(".slider-item").getAttribute("data-target"); // Tıklanan slider item'ın target'ını al
      contentsDemos.classList.remove("show");
      
      showProjectContent(targetId); // O target ile ilgili içeriği göster
  
      projectContent.classList.add("show");
    });
  });
  
  // İçeriği gösterme fonksiyonu
  function showProjectContent(targetId) {
    const allProjects = document.querySelectorAll(".contents__project");
    
    // Tüm içerikleri gizle
    allProjects.forEach(project => {
      project.classList.remove("show");
    });
  
    // Hedeflenen içeriği göster
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add("show");
    }
  }