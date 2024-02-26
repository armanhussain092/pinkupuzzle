// Initial References
const moves = document.getElementById("moves");
const container = document.querySelector(".container");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const loveMessageElement = document.getElementById("love-message");
let currentElement = "";
let movesCount, imagesArr = [];

// Function to check if the browser supports touch events
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// Function to generate a random number for image selection
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

// Function to get row and column values from data-position attribute
const getCoords = (element) => {
  const [row, col] = element.getAttribute("data-position").split("_");
  return [parseInt(row), parseInt(col)];
};

// Function to check if two elements are adjacent in the grid
const checkAdjacent = (row1, row2, col1, col2) => {
  return (row1 == row2 && (col2 == col1 - 1 || col2 == col1 + 1)) ||
         (col1 == col2 && (row2 == row1 - 1 || row2 == row1 + 1));
};

// Function to fill the imagesArr array with random values
const randomImages = () => {
  while (imagesArr.length < 8) {
    let randomVal = randomNumber();
    if (!imagesArr.includes(randomVal) && randomVal !== 9) {
      imagesArr.push(randomVal);
    }
  }
  imagesArr.push(9); // Adding the blank image
};

// Array of image paths
const imagePaths = [
  "images/new_catu1.png",
  "images/new_catu3.png",
  "images/new_catu4.png",
  "images/new_catu5.png",
  "images/new_catu6.png",
  "images/new_catu7.png",
  "images/new_catu8.png",
  "images/new_catu9.png",
];

// Function to get a random message
const getRandomMessage = () => {
  const messages = [
    "hello KRITIKA",
    "how are you kritika",
    "i know you love pinku very much",
    "and i love you very much!",
    "i want you to love me",
    "tum pass hoti ho to mujhe bahut achacha lagta hai kritika",
    "kritika ek baat kahu me tumse",
    "kritika tum bahut achchha hasti ho",
    "Every moment with you feels like a beautiful dream. I love you, Kritika!",
    "Your smile brightens my darkest days. I'm grateful to have you, Kritika.",
    "In your presence, I find peace and joy. You're my source of happiness, Kritika.",
    "To the one who has stolen my heart, Kritika, I love you more with each passing day.",
    "You are the melody in the song of my life, Kritika. I love you endlessly.",
    "With you, every day is Valentine's Day. Sending love, Kritika!",
    "Your love is the most precious gift I've ever received. I cherish you, Kritika.",
    "In your eyes, I see a love that's pure and true. Lucky to call you mine, Kritika.",
    "You are my sunshine on cloudy days, Kritika. I love you to the moon and back.",
    "In the journey of life, having you by my side is the greatest blessing. Love you, Kritika.",
    "Your love is the anchor that keeps me grounded. Thank you for being my rock, Kritika.",
    "No words can express the depth of my love for you, Kritika. You mean everything to me.",
    "You are the missing piece that completes my puzzle, Kritika. I love you endlessly.",
    "To the one who fills my life with love and laughter, Kritika, you're my everything.",
    "With you, every moment is a celebration of love. Cheers to us, Kritika!",
    "Your love is the sweetest melody in the symphony of my life, Kritika.",
    "In your arms, I've found my forever home. Love you beyond words, Kritika.",
    "You're not just my love; you're my best friend and confidant. Forever grateful, Kritika.",
    "I fall in love with you more and more every day, Kritika. You're my heart's desire.",
    "Life with you is a beautiful love story, Kritika. Here's to many more chapters together.",
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

// Function to generate the grid
const gridGenerator = () => {
  let count = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement("div");
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener(isTouchDevice() ? "touchstart" : "click", selectImage);
      div.classList.add("image-container");
      div.innerHTML = `<img src="${imagePaths[imagesArr[count] - 1]}" class="image ${
        imagesArr[count] == 9 ? "target" : ""
      }" data-index="${imagesArr[count]}" style="width: 100%; height: 100%;"/>`;
      count += 1;
      container.appendChild(div);
    }
  }
};

// Function to handle image selection
const selectImage = (e) => {
  e.preventDefault();
  currentElement = e.target;
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  if (checkAdjacent(row1, row2, col1, col2)) {
    currentElement.remove();
    targetElement.remove();

    let currentIndex = parseInt(currentElement.getAttribute("data-index"));
    let targetIndex = parseInt(targetElement.getAttribute("data-index"));

    currentElement.setAttribute("data-index", targetIndex);
    targetElement.setAttribute("data-index", currentIndex);

    currentParent.appendChild(targetElement);
    targetParent.appendChild(currentElement);

    let currentArrIndex = imagesArr.indexOf(currentIndex);
    let targetArrIndex = imagesArr.indexOf(targetIndex);
    [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
      imagesArr[targetArrIndex],
      imagesArr[currentArrIndex],
    ];

    if (imagesArr.join("") === "123456789") {
      setTimeout(() => {
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        loveMessageElement.innerText = getRandomMessage();
        loveMessageElement.style.backgroundColor = getRandomColor();
        loveMessageElement.classList.remove("hide");
        result.innerText = `Total Moves: ${movesCount}`;
        startButton.innerText = "Restart Game";
      }, 1000);
    }

    movesCount += 1;
    moves.innerText = `Moves: ${movesCount}. ${getRandomMessage()}`;
    loveMessageElement.style.backgroundColor = getRandomColor(); // Change color on each move
  }
};

// Function to handle the start button click
startButton.addEventListener("click", () => {
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  loveMessageElement.classList.add("hide");
  container.innerHTML = "";
  imagesArr = [];
  randomImages();
  gridGenerator();
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}. ${getRandomMessage()}`;
});

// Display start screen first
window.onload = () => {
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
};

