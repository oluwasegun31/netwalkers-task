const memberBtn = document.querySelector(".membership-btn");
const historyTable = document.querySelector(".home-table > .history");
const closeHistoryBtn = document.querySelector(".close-history");
const sideNavbtn = document.querySelector(".sideNav");
const sideNav = document.querySelector("main > aside");
const gymBtn = document.querySelector(".home-table > button");
const gym = document.querySelector(".gym");

memberBtn.addEventListener("click", () => {
  historyTable.style.display = "block";
});
closeHistoryBtn.addEventListener("click", () => {
  historyTable.style.display = "none";
});
// side navigation events
sideNavbtn.addEventListener("mouseover", () => {
  sideNav.classList.add("show");
  sideNav.style.zIndex = 50;
});
sideNav.addEventListener("mouseleave", () => {
  sideNav.classList.remove("show");
});
gymBtn.addEventListener("click", () => {
  gym.classList.toggle("show");
});
