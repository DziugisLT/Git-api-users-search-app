'use strict';

const inputSearch = document.querySelector('.input-search');
const form = document.querySelector('.form');
const field = document.querySelector('.main-info-box');
const changeMode = document.querySelector('.mode-switcher');
const errorMessage = document.querySelector('.error-message');
let state = 0; //dark

const getData = async function (url) {
  try {
    const fetchPro = await fetch(url);
    const res = await Promise.race([fetchPro, 5000]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);
    errorMessage.style.opacity = '0';
    return data;
  } catch (err) {
    errorMessage.style.opacity = '1';
    throw err;
  }
};

const populateFields = function (data) {
  const avatarUrl = data.avatar_url;
  const userName = data.name;
  const userTag = data.login;
  const createdAt = new Date(data.created_at);
  const bio = data.bio;
  const repos = data.public_repos;
  const followers = data.followers;
  const following = data.following;
  const location = data.location;
  const blog = data.blog;
  const twitter = data.twitter_username;
  const company = data.company;

  const markup = `<div class="profile-img-box">
  <img class="profile-img" src='${
    avatarUrl ? avatarUrl : 'assets/image.jpg'
  }' alt="profile picture"/>
</div>
<div class="name-date-box">
  <h2 class="heading-secondary ${
    state === 1 ? 'heading-secondary-light' : ''
  }">${userName}</h2>
  <p class="join-date ${
    state === 1 ? 'join-date-light' : ''
  }">Joined ${createdAt.toLocaleString('default', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}</p>
  <p class="git-tag">@${userTag}</p>
</div>
<p class="bio-text ${state === 1 ? 'bio-text-light' : ''}">${
    bio ? bio : 'This profile has no bio'
  }</p>
<div class="info-boxes ${state === 1 ? 'info-boxes-light' : ''}">
  <div class="repos info-box">
    <p class="repos-text info-box-text ${
      state === 1 ? 'info-box-text-light' : ''
    }">Repos</p>
    <p class="repos-num info-box-num ${
      state === 1 ? 'info-box-num-light' : ''
    }">${repos}</p>
  </div>
  <div class="followers info-box">
    <p class="followers-text info-box-text ${
      state === 1 ? 'info-box-text-light' : ''
    }">Followers</p>
    <p class="followers-num info-box-num ${
      state === 1 ? 'info-box-num-light' : ''
    }">${followers}</p>
  </div>
  <div class="Following info-box">
    <p class="Following-text info-box-text ${
      state === 1 ? 'info-box-text-light' : ''
    }">Following</p>
    <p class="Following-num info-box-num ${
      state === 1 ? 'info-box-num-light' : ''
    }">${following}</p>
  </div>
</div>
<div class="additional-info-box">
  <div class="living-place add-info-box ${
    location ? location : 'not-available'
  } ${state === 1 ? 'add-info-box-light' : ''}">
    <ion-icon name="navigate" class="additional-icon"></ion-icon>
    <p class="place-text add-text">${location ? location : 'Not available'}</p>
  </div>
  <div class="twitter add-info-box ${twitter ? twitter : 'not-available'} ${
    state === 1 ? 'add-info-box-light' : ''
  }">
    <ion-icon name="logo-twitter" class="additional-icon"></ion-icon>
    <p class="twitter-text add-text">${twitter ? twitter : 'Not available'}</p>
  </div>
  <div class="website add-info-box ${blog ? blog : 'not-available'} ${
    state === 1 ? 'add-info-box-light' : ''
  }">
    <ion-icon name="link" class="additional-icon"></ion-icon>
    <a class="link-text add-text">${blog ? blog : 'Not available'}</a>
  </div>
  <div class="city add-info-box ${company ? company : 'not-available'} ${
    state === 1 ? 'add-info-box-light' : ''
  }">
    <ion-icon name="business" class="additional-icon"></ion-icon>
    <p class="tag-text add-text">${company ? company : 'Not available'}</p>
  </div>
</div>`;
  field.innerHTML = markup;
  inputSearch.value = '';
};

const submitForm = async function (e) {
  e.preventDefault();
  const data = await getData(
    `https://api.github.com/users/${inputSearch.value}`
  );
  populateFields(data);
};

form.addEventListener('submit', submitForm);

const modeChange = function () {
  const iconMode = document.querySelector('.mode-icon');
  const textMode = document.querySelector('.mode-text');
  iconMode.setAttribute(
    'name',
    `${iconMode.getAttribute('name') === 'sunny' ? 'moon' : 'sunny'}`
  );
  textMode.textContent = `${
    iconMode.getAttribute('name') === 'sunny' ? 'Light' : 'Dark'
  }`;

  const body = document.body;
  const headingPrimary = document.querySelector('.heading-primary');
  const modeSwitcher = document.querySelector('.mode-switcher');
  //inputSearch
  //form
  //maininfobox = field;
  const headingSecondary = document.querySelector('.heading-secondary');
  const joinDate = document.querySelector('.join-date');
  const bioText = document.querySelector('.bio-text');
  const infoBoxes = document.querySelector('.info-boxes');
  const infoBoxText = document.querySelectorAll('.info-box-text');
  const infoBoxNum = document.querySelectorAll('.info-box-num');
  const addInfoBox = document.querySelectorAll('.add-info-box');

  body.classList.toggle('body-light');
  headingPrimary.classList.toggle('heading-primary-light');
  modeSwitcher.classList.toggle('mode-switcher-light');
  inputSearch.classList.toggle('input-search-light');
  form.classList.toggle('form-light');
  field.classList.toggle('main-info-box-light');
  headingSecondary.classList.toggle('heading-secondary-light');
  joinDate.classList.toggle('join-date-light');
  bioText.classList.toggle('bio-text-light');
  infoBoxes.classList.toggle('info-boxes-light');
  infoBoxText.forEach((item) => {
    item.classList.toggle('info-box-text-light');
  });
  infoBoxNum.forEach((item) => {
    item.classList.toggle('info-box-num-light');
  });
  addInfoBox.forEach((item) => {
    item.classList.toggle('add-info-box-light');
  });

  if (state === 0) state = 1;
  else state = 0;
};

changeMode.addEventListener('click', modeChange);
