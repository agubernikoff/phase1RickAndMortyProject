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
const audio = new Audio("./audio/LETS GO - AUDIO FROM JAYUZUMI.COM.mp3");
document.onclick = function () {
  audio.play();
};

function runAnimation() {
  portalImage.src = "./images/portal.gif";
  header.setAttribute("style", "color:rgb(16, 16, 20)");
  setTimeout(() => portalImageDiv.remove(), 1250);
}

function enterSite() {
  body.id = "body2";
  imageHeader = document.createElement("img");
  imageHeader.src = "./images/title2.png";
  imageHeader.alt = "Rick and Morty Title";
  imageHeader.id = "imageHeader";
  headerDiv.prepend(imageHeader);
  header.remove();
  setTimeout(() => header.setAttribute("style", "color:turquoise"), 100);
  setTimeout(() => fetchCharacters(), 100);
  setTimeout(() => {
    const faves = document.createElement("h3");
    faves.innerText = "FAVORITES";
    const favesUl = document.createElement("ul");
    favesUl.id = "faves-list";
    const charListUl = document.createElement("ul");
    charListUl.id = "char-list";
    const charactersTitle = document.createElement("h3");
    charactersTitle.innerText = "CHARACTERS";
    charListDiv.append(faves, favesUl, charactersTitle, charListUl);
  }, 110);
  setTimeout(() => renderSearchBar(), 100);
  setTimeout(() => search(), 101);
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
    charLi.className = "clickableChar";
    charList.append(charLi);
    charLi.addEventListener("click", function () {
      return renderCharacter(char);
    });
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
}

function populateCharactersArray(data) {
  data.results.forEach((char) => charactersArray.push(char));
}

function search() {
  const bigCharactersDiv = document.createElement("div");
  bigCharactersDiv.id = "bigCharactersDiv";
  body.append(bigCharactersDiv);
  const form = document.querySelector("#searchBarForm");
  const input = document.querySelector("#searchBar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    charactersArray.forEach((char) => {
      if (input.value.toUpperCase() === char.name.toUpperCase()) {
        renderCharacter(char);
      }
    });
    form.reset();
  });
}

function renderCharacter(char) {
  console.log(char);
  const characterDiv = document.createElement("div");
  characterDiv.className = "characterDiv";
  console.log(characterDiv);
  const name = document.createElement("h1");
  name.innerText = char.name;
  const image = document.createElement("img");
  image.src = char.image;
  image.alt = char.name;
  image.className = "characterImage";
  const species = document.createElement("h4");
  species.innerText = `Species: ${char.species}`;
  const type = document.createElement("h4");
  type.innerText = `Type: ${char.type}`;
  const status = document.createElement("h4");
  status.innerText = `Status: ${char.status}`;
  const gender = document.createElement("h4");
  gender.innerText = `Gender: ${char.gender}`;
  const origin = document.createElement("h4");
  origin.innerText = `Origin: ${char.origin.name}`;
  const location = document.createElement("h4");
  location.innerText = `Location: ${char.location.name}`;
  const episodes = document.createElement("h4");
  //episodes.innerText = renderEpisode;
  char.episode.forEach((epi) => {
    fetch(`${epi}`)
      .then((resp) => resp.json())
      .then((data) => renderEpisode(data));
  });
  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "X";
  deleteBttn.addEventListener("click", function () {
    characterDiv.remove();
  });
  const addToFaves = document.createElement("h4");
  addToFaves.innerText = `ADD TO FAVORITES, BROH: `;
  const likeBttn = document.createElement("button");
  likeBttn.className = "like-bttn";
  likeBttn.textContent = "♡";
  likeBttn.addEventListener("click", function () {
    likeBttn.textContent = "♥";
    addtoFavorites(char);
  });
  addToFaves.append(likeBttn);
  characterDiv.append(
    deleteBttn,
    name,
    image,
    species,
    type,
    status,
    gender,
    origin,
    location,
    episodes,
    addToFaves
  );
  bigCharactersDiv.append(characterDiv);
}

function renderEpisode(episodes) {
  const epiInfo = document.createElement("ul");
  const epiName = document.createElement("h1");
  const epiAirDate = document.createElement("li");
  const epiCode = document.createElement("li");
  epiName.innerText = `Episode Name: ${episodes.name}`;
  epiAirDate.innerText = `Air Date: ${episodes.air_date}`;
  epiCode.innerText = `Season and Episode: ${episodes.episode}`;
  epiInfo.append(epiName, epiAirDate, epiCode);
  //   console.log(epiInfo);
}

function addtoFavorites(char) {
  charInCharList = document.getElementById(`${char.id}`);
  console.log(charInCharList);
  const favesList = document.querySelector("#faves-list");
  console.log(favesList);
  charInCharList.remove();
  favesList.append(charInCharList);
}
