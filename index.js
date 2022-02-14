const headerDiv = document.querySelector("#headerDiv");
const header = document.querySelector("h1");
const portalImageDiv = document.querySelector("#portalImageDiv");
const portalImage = document.querySelector("#portal-image");

portalImageDiv.addEventListener("click", function () {
  runAnimation();
  setTimeout(() => enterSite(), 1900);
});

function runAnimation() {
  portalImage.src = "./images/portal.gif";
  header.setAttribute("style", "color:rgb(16, 16, 20)");
  setTimeout(() => portalImageDiv.remove(), 1250);
}

function enterSite() {
  imageHeader = document.createElement("img");
  imageHeader.src = "./images/title.png";
  imageHeader.alt = "Rick and Morty Title";
  imageHeader.id = "imageHeader";
  headerDiv.prepend(imageHeader);
  header.innerText =
    "idk what yall wanna put here but we should put something here i think";
  setTimeout(() => header.setAttribute("style", "color:turquoise"), 100);
}
