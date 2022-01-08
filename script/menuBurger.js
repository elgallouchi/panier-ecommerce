
// display menu categories on mobile (responsive)
const mobileResponsive = () => {
  const showMobile = document.querySelector(".categories");
  const cartSection = document.querySelector(".cart-section");
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("menu-mobile") ||
      e.target.classList.contains("menu-mobile-img")
    ) {
      showMobile.classList.toggle("show-mobile");
      cartSection.classList.remove("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (
      e.target.classList.contains("access-cart") ||
      e.target.classList.contains("access-cart-img") ||
      e.target.classList.contains("access-cart-span")
    ) {
      cartSection.classList.toggle("show");
      showMobile.classList.add("show-mobile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
};

mobileResponsive();
