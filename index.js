const headerDiv = document.querySelector("#headerDiv");
const header = document.querySelector("h1");
const portalImageDiv = document.querySelector("#portalImageDiv");
const portalImage = document.querySelector("#portal-image");
const charListDiv = document.querySelector("#char-list-div");
const backgroundImg = document.querySelector("body");

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
  backgroundImg.setAttribute("style", "background-image:")
  backgroundImg.style.backgroundColor.remove();
  imageHeader = document.createElement("img");
  imageHeader.src = "./images/title.png";
  imageHeader.alt = "Rick and Morty Title";
  imageHeader.id = "imageHeader";
  headerDiv.prepend(imageHeader);
  header.innerText =
    "idk what yall wanna put here but we should put something here i think";
  setTimeout(() => header.setAttribute("style", "color:turquoise"), 100);
  setTimeout(() => fetchCharacters(), 100);
  setTimeout(() => {
    const charListUl = document.createElement("ul");
    charListUl.id = "char-list";
    charListDiv.append(charListUl);
  }, 100);
}

function fetchCharacters() {
  for (let i = 1; i <= 42; i++) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
      .then((resp) => resp.json())
      .then((data) => renderCharacters(data));
  }
}

function renderCharacters(data) {
  const charList = document.querySelector("#char-list");
  data.results.forEach((char) => {
    const charLi = document.createElement("li");
    charLi.innerText = char.name;
    charLi.id = char.id;
    charList.append(charLi);
  });
}

