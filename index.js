const headerDiv = document.querySelector("#headerDiv");
const header = document.querySelector("h1");
const portalImageDiv = document.querySelector("#portalImageDiv");
const portalImage = document.querySelector("#portal-image");
const charListDiv = document.querySelector("#char-list-div");
const body = document.querySelector("body");
const charactersArray = [];

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
  search();
}

function fetchCharacters() {
  for (let i = 1; i <= 42; i++) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
      .then((resp) => resp.json())
      .then((data) => {
        renderCharactersList(data);
        populateCharactersArray(data);
      });
  }
}

function renderCharactersList(data) {
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
  const searchForm = document.createElement("form");
  searchForm.id = "searchBarForm";
  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.name = "searchBar";
  searchBar.id = "searchBar";
  searchBar.placeholder = "search for a character";
  const searchBttn = document.createElement("button");
  searchBttn.innerText = "Find that character, broh";
  searchBttn.type = "submit";
  body.append(searchWrapper);
  searchWrapper.append(searchForm);
  searchForm.append(searchBar, searchBttn);
  // searchBarForm.addEventListener("submit", () {
  //   searchRes = document.querySelector("#searchBar").value
  //   if (searchRes.value === char.name)
  //   return X.append(searchRes.value);
  //   else (searchRes.value !== char.name)
  //   return ("alert", "Can/'t find that character broh!")
  //   searchRes.reset();
  //})
}

function populateCharactersArray(data) {
  data.results.forEach((char) => charactersArray.push(char.name));
}

function search() {
  form = document.querySelector("#searchBarForm");
  input = document.querySelector("#searchBar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    charactersArray.forEach((char) => {
      if (input.value === char) {
        console.log(char);
      }
    });
    form.reset();
  });
}
