import initSwipers from "./mainSlider.js";
import nav from "./header.js";
import news from "./news.js";
import footer from "./footer.js";
import footerbt from "./footerbt.js";
import freegames from "./freegames.js";
import initAllSliders from "./createslider.js";
import colslider from "./colslider.js";

nav();
news("news1", "n1");
news("news2", "n2");
news("news3", "n3");
news("news4", "n4");
news("news5", "n5");
news("news6", "n6");
footer();
footerbt();
freegames();
initSwipers();
initAllSliders();
colslider("colslider1", "s1");
colslider("colslide2", "s2");
colslider("closlider3", "s3");
// createSlider();
// initSlider('.slider1', 'slider1');
// initSlider(SavingsSpotlight, ".SavingsSpotlight");

// (function () {
//   const btn = document.getElementById("backToTop");
//   const scrollThreshold = 300;

//   function checkScroll() {
//     if (window.pageYOffset > scrollThreshold) {
//       btn.classList.remove("hidden");
//     } else {
//       btn.classList.add("hidden");
//     }
//   }

//   window.addEventListener("scroll", checkScroll, { passive: true });
//   window.addEventListener("load", checkScroll);

//   btn.addEventListener("click", function () {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });

//   // دسترسی‌پذیری: کلیدهای میانبر
//   document.addEventListener("keydown", function (e) {
//     if ((e.ctrlKey || e.metaKey) && e.key === "ArrowUp") {
//       e.preventDefault();
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   });
// })();

const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.remove("expanded");
    header.classList.add("compact");
  } else {
    header.classList.remove("compact");
    header.classList.add("expanded");
  }
});
