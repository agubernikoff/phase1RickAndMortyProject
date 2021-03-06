const headerDiv = document.querySelector("#headerDiv");
const header = document.querySelector("h1");
const portalImageDiv = document.querySelector("#portalImageDiv");
const portalImage = document.querySelector("#portal-image");
const charListDiv = document.querySelector("#char-list-div");
const body = document.querySelector("body");
const charactersArray = [];
const searchWrapper = document.querySelector("#searchWrapper");
portalImageDiv.addEventListener("click", function () {
  const audio = new Audio("./audio/LETS GO - AUDIO FROM JAYUZUMI.COM.mp3");
  audio.play();
  runAnimation();
  setTimeout(() => enterSite(), 1900);
});

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
    faves.innerText = `OOOOOWEEEEE!\nIT'S MY FAVORITE CHARACTERS`;
    const favesUl = document.createElement("ul");
    favesUl.id = "faves-list";
    const charListUl = document.createElement("ul");
    charListUl.id = "char-list";
    const charactersTitle = document.createElement("h3");
    charactersTitle.innerText = "AW GEEZ\n THE REST OF THE CHARACTERS";
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
    charLi.id = char.name + char.id;
    charLi.className = "clickableChar";
    charList.append(charLi);
    charLi.addEventListener("click", function () {
      return renderCharacter(char);
    });
  });
  rick = document.getElementById("Rick Sanchez1");
  morty = document.getElementById("Morty Smith2");
  summer = document.getElementById("Summer Smith3");
  beth = document.getElementById("Beth Smith4");
  jerry = document.getElementById("Jerry Smith5");
  function playAudio(name, audioPath) {
    name.addEventListener("click", function () {
      const audio3 = new Audio(audioPath);
      audio3.volume = 0.008;
      audio3.play();
    });
  }
  playAudio(rick, "audio/WUBBA LUBBA DUB DUB - AUDIO FROM JAYUZUMI.COM.mp3");
  playAudio(morty, "audio/OH GEEZ PT1 - AUDIO FROM JAYUZUMI.COM.mp3");
  playAudio(summer, "audio/I AM TOTALLY FINE - AUDIO FROM JAYUZUMI.COM.mp3");
  playAudio(beth, "audio/AM I EVIL - AUDIO FROM JAYUZUMI.COM.mp3");
  playAudio(
    jerry,
    "audio/HAVE YOU EVER TRIED TO RELAX - AUDIO FROM JAYUZUMI.COM.mp3"
  );
}

function renderSearchBar() {
  const searchHeader = document.createElement("h2");
  searchHeader.innerText = "Search for a character:";
  searchHeader.id = "searchHead";
  const searchForm = document.createElement("form");
  searchForm.id = "searchBarForm";
  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.name = "searchBar";
  searchBar.id = "searchBar";
  searchBar.placeholder = "show me what you got!";
  const searchBttn = document.createElement("button");
  searchBttn.innerText = "Find that character, broh";
  searchBttn.type = "submit";
  searchWrapper.append(searchHeader, searchForm);
  searchForm.append(searchBar, searchBttn);
}

function populateCharactersArray(data) {
  data.results.forEach((char) => charactersArray.push(char));
}

function search() {
  const form = document.querySelector("#searchBarForm");
  const input = document.querySelector("#searchBar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const audio1 = new Audio(
      "audio/SHOW ME WHAT YOU GOT - AUDIO FROM JAYUZUMI.COM.mp3"
    );
    audio1.play();
    charactersArray.forEach((char) => {
      if (input.value.toUpperCase() === char.name.toUpperCase()) {
        renderCharacter(char);
      }
    });
    form.reset();
  });
}

function renderCharacter(char) {
  const characterDiv = document.createElement("div");
  characterDiv.className = "characterDiv";
  characterDiv.id = `charCard${char.id}`;
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
  const episodesHeader = document.createElement("h4");
  episodesHeader.innerText = "Appears in:";
  episodesHeader.className = "epiHead";
  const episodes = document.createElement("h4");
  episodes.className = "episodes";
  char.episode.forEach((epi) => {
    fetch(`${epi}`)
      .then((resp) => resp.json())
      .then((data) => {
        episodes.append(renderEpisode(data));
      });
  });
  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "X";
  deleteBttn.addEventListener("click", function () {
    characterDiv.remove();
  });
  const addToFaves = document.createElement("h4");
  addToFaves.innerText = `ADD TO FAVORITES, BROH: `;
  const bttnImg = document.createElement("img");
  const specificLi = document.getElementById(char.name + char.id);
  if (specificLi.className === "clickableChar") {
    bttnImg.src = "./images/emptyHeartIcon.png";
  } else {
    bttnImg.src = "./images/heartIcon.png";
  }
  bttnImg.id = "heart";
  bttnImg.addEventListener("click", function () {
    if (specificLi.className === "clickableChar") {
      bttnImg.src = "./images/heartIcon.png";
      specificLi.className = "favorite";
    } else if (specificLi.className === "favorite") {
      bttnImg.src = "./images/emptyHeartIcon.png";
      specificLi.className = "clickableChar";
    }

    addtoFavorites(char, specificLi);
  });
  addToFaves.append(bttnImg);
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
    episodesHeader,
    episodes,
    addToFaves
  );
  const specificCharCard = document.getElementById(`charCard${char.id}`);
  if (specificCharCard === null) bigCharactersDiv.append(characterDiv);
}

function renderEpisode(episodes) {
  const epiInfo = document.createElement("ul");
  epiInfo.className = "epiInfo";
  const epiName = document.createElement("h4");
  epiName.className = "epiName";
  const epiAirDate = document.createElement("li");
  const epiCode = document.createElement("li");
  epiName.innerText = `${episodes.name}`;
  epiAirDate.innerText = `Air Date: ${episodes.air_date}`;
  epiCode.innerText = `Season and Episode: ${episodes.episode}`;
  epiInfo.append(epiName, epiAirDate, epiCode);
  return epiInfo;
}

function addtoFavorites(char, specificLi) {
  const favesList = document.querySelector("#faves-list");
  const charList = document.querySelector("#char-list");
  specificLi.remove();
  if (specificLi.className === "favorite") {
    favesList.append(specificLi);
  } else {
    charList.prepend(specificLi);
  }
}
