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
// const audio = new Audio("./audio/LETS GO - AUDIO FROM JAYUZUMI.COM.mp3");
// document.onclick = function () {
//   audio.play();
// };

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
    const charListUl = document.createElement("ul");
    charListUl.id = "char-list";
    charListDiv.append(charListUl);
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
        console.log(char);
        const characterDiv = document.createElement("div");
        characterDiv.className = "characterDiv";
        console.log(characterDiv);
        const name = document.createElement("h1");
        name.innerText = char.name;
        console.log(name);
        const image = document.createElement("img");
        image.src = char.image;
        console.log(image);
        const species = document.createElement("h2");
        species.innerText = char.species;
        console.log(species);
        const type = document.createElement("h2");
        type.innerText = char.type;
        console.log(type);
        const status = document.createElement("h2");
        status.innerText = char.status;
        console.log(status);
        const gender = document.createElement("h2");
        gender.innerText = char.gender;
        console.log(gender);
        const origin = document.createElement("h2");
        origin.innerText = char.origin.name;
        console.log(origin);
        const location = document.createElement("h2");
        location.innerText = char.location.name;
        console.log(location);
        const episodes = document.createElement("h2");
        //episodes.innerText = renderEpisode;
        char.episode.forEach((epi) => {
          fetch(`${epi}`)
            .then((resp) => resp.json())
            .then((data) => renderEpisode(data));
        });

        characterDiv.append(
          name,
          image,
          species,
          type,
          status,
          gender,
          origin,
          location,
          episodes
        );
        bigCharactersDiv.append(characterDiv);
      }
    });
    form.reset();
  });
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
  console.log(epiInfo);
}
