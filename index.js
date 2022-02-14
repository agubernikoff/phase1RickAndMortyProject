const headerDiv = document.querySelector("#headerDiv");
const header = document.querySelector("h1");
const portalImageDiv = document.querySelector("#portalImageDiv");
const portalImage = document.querySelector("#portal-image");
const charListDiv = document.querySelector("#char-list-div");
const body = document.querySelector("body");

portalImageDiv.addEventListener("click", function () {
  runAnimation();
  setTimeout(() => enterSite(), 1900);
});
//const audio = new Audio("file name");
//document.onclick = function() {
//  audio.play()
//}
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
  setTimeout(() => fetchCharacters(), 100);
  setTimeout(() => {
    const charListUl = document.createElement("ul");
    charListUl.id = "char-list";
    charListDiv.append(charListUl);
  }, 100);
  body.id = "body2";
  renderSearchBar();
}

function fetchCharacters() {
  for (let i = 1; i <= 42; i++) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
      .then((resp) => resp.json())
      .then((data) => {
        renderCharacters(data);
      });
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

function renderSearchBar() {
  const searchWrapper = document.createElement("div");
  searchWrapper.id = "searchWrapper";
  const searchBar = document.createElement("form");
  searchBar.id = "searchBarForm";
  const searchBarInput = document.createElement("input");
  searchBarInput.type = "text";
  searchBarInput.name = "searchBar";
  searchBarInput.id = "searchBar";
  searchBarInput.placeholder = "search for a character";
  searchBttn = document.createElement("button");
  searchBttn.innerText = "Find that character, broh";
  searchBttn.type = "submit";
  body.append(searchWrapper);
  searchWrapper.append(searchBar);
  searchBar.append(searchBarInput, searchBttn);
  console.log(searchWrapper);
  // searchBarForm.addEventListener("submit", () {
  //   searchRes = document.querySelector("#searchBar").value
  //   if (searchRes.value === char.name)
  //   return X.append(searchRes.value);
  //   else (searchRes.value !== char.name)
  //   return ("alert", "Can/'t find that character broh!")
  //   searchRes.reset();
  //})
}
