const addMovieModal = document.getElementById("add-modal");
const cancelAddMovieButton = document.getElementById("cancel-modal");
const startAddMovieButton = document.querySelector("header button");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const backdrop = document.getElementById("backdrop");

const userInputs = addMovieModal.querySelectorAll("input");

const movies = [];

const entryTextSection = document.getElementById('entry-text');

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const renderNewMovie = (title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image>
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearMovieInputs();
};

const clearMovieInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5)');
    return;
  }

  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInputs();
  renderNewMovie(newMovie.title, newMovie.imageUrl, newMovie.rating);
  updateUI();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
