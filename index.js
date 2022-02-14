const headerDiv = document.querySelector("#headerDiv");
const header = document.querySelector("h1");
const portalImageDiv = document.querySelector("#portalImageDiv");
const portalImage = document.querySelector("#portal-image");

portalImageDiv.addEventListener("click", function () {
  runAnimation();
  setTimeout(() => enterSite(), 1100);
});

function runAnimation() {
  portalImage.src = "./images/portal.gif";
  setTimeout(() => portalImageDiv.remove(), 1100);
}

function enterSite() {
  imageHeader = document.createElement("img");
  imageHeader.src = "./images/title.jpg";
  imageHeader.alt = "Rick and Morty Title";
  imageHeader.id = "imageHeader";
  headerDiv.prepend(imageHeader);
  header.innerText =
    "idk what yall wanna put here but we should put something here i think";
  //   portalImageDiv.remove();
}
