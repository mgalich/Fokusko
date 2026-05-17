const screens = {
  home: document.getElementById("home-screen"),
  instructions: document.getElementById("instructions-screen"),
  level: document.getElementById("level-screen"),
  game1: document.getElementById("game1-screen"),
  game2: document.getElementById("game2-screen"),
  game3: document.getElementById("game3-screen"),
  end: document.getElementById("end-screen")
};

const startBtn = document.getElementById("start-btn");
const instructionsBtn = document.getElementById("instructions-btn");
const backHomeBtn = document.getElementById("back-home-btn");
const easyBtn = document.getElementById("easy-btn");
const hardBtn = document.getElementById("hard-btn");
const restartBtn = document.getElementById("restart-btn");

const game1Answers = document.querySelectorAll("#game1-answers button");
const game2Answers = document.querySelectorAll("#game2-answers button");
const game3Answers = document.querySelectorAll("#game3-answers button");

const game1Feedback = document.getElementById("game1-feedback");
const game2Feedback = document.getElementById("game2-feedback");
const game3Feedback = document.getElementById("game3-feedback");
const finalScore = document.getElementById("final-score");

let score = 0;
let selectedLevel = "easy";

let game1Index = 0;
let game2Index = 0;
let game3Index = 0;

const game1Tasks = {
  easy: [
    {
      question: "Klikni slovo M",
      answers: ["A", "M", "S"],
      correct: "M"
    },
    {
      question: "Klikni slovo A",
      answers: ["A", "T", "P"],
      correct: "A"
    },
    {
      question: "Klikni slovo L",
      answers: ["K", "L", "R"],
      correct: "L"
    }
  ],
  hard: [
    {
      question: "Klikni slovo M",
      answers: ["A", "M", "S", "P"],
      correct: "M"
    },
    {
      question: "Klikni slovo A",
      answers: ["A", "T", "P", "K"],
      correct: "A"
    },
    {
      question: "Klikni slovo L",
      answers: ["K", "L", "R", "B"],
      correct: "L"
    }
  ]
};

const game2Tasks = {
  easy: [
    {
      question: "Odaberi sliku za slovo S",
      answers: [
        { text: "Sunce", image: "images/sunce.png", correct: true },
        { text: "Auto", image: "images/auto.png", correct: false },
        { text: "Mačka", image: "images/mačka.png", correct: false }
      ]
    },
    {
      question: "Odaberi sliku za slovo A",
      answers: [
        { text: "Pas", image: "images/pas.png", correct: false },
        { text: "Auto", image: "images/auto.png", correct: true },
        { text: "Cvijet", image: "images/cvijet.png", correct: false }
      ]
    },
    {
      question: "Odaberi sliku za slovo M",
      answers: [
        { text: "Kućica", image: "images/kucica.png", correct: false },
        { text: "Mačka", image: "images/mačka.png", correct: true },
        { text: "Sunce", image: "images/sunce.png", correct: false }
      ]
    }
  ],
  hard: [
    {
      question: "Odaberi sliku za slovo S",
      answers: [
        { text: "Sunce", image: "images/sunce.png", correct: true },
        { text: "Auto", image: "images/auto.png", correct: false },
        { text: "Mačka", image: "images/mačka.png", correct: false },
        { text: "Kućica", image: "images/kucica.png", correct: false }
      ]
    },
    {
      question: "Odaberi sliku za slovo A",
      answers: [
        { text: "Pas", image: "images/pas.png", correct: false },
        { text: "Auto", image: "images/auto.png", correct: true },
        { text: "Cvijet", image: "images/cvijet.png", correct: false },
        { text: "Lopta", image: "images/lopta.png", correct: false }
      ]
    },
    {
      question: "Odaberi sliku za slovo M",
      answers: [
        { text: "Kućica", image: "images/kucica.png", correct: false },
        { text: "Mačka", image: "images/mačka.png", correct: true },
        { text: "Sunce", image: "images/sunce.png", correct: false },
        { text: "Bicikl", image: "images/bicikl.png", correct: false }
      ]
    }
  ]
};

const game3Tasks = {
  easy: [
    {
      question: "Klikni zelenu boju",
      answers: [
        { image: "images/zelena zvijezda.png", alt: "Zelena zvijezda", correct: true },
        { image: "images/crvena zvijezda.png", alt: "Crvena zvijezda", correct: false }
      ]
    },
    {
      question: "Klikni plavu boju",
      answers: [
        { image: "images/plavi krug.png", alt: "Plavi krug", correct: true },
        { image: "images/žuti krug.png", alt: "Žuti krug", correct: false }
      ]
    },
    {
      question: "Klikni crvenu boju",
      answers: [
        { image: "images/crveno srce.png", alt: "Crveno srce", correct: true },
        { image: "images/zeleno srce.png", alt: "Zeleno srce", correct: false }
      ]
    }
  ],
  hard: [
    {
      question: "Klikni zelenu boju",
      answers: [
        { image: "images/zelena zvijezda.png", alt: "Zelena zvijezda", correct: true },
        { image: "images/crvena zvijezda.png", alt: "Crvena zvijezda", correct: false },
        { image: "images/plava zvijezda.png", alt: "Plava zvijezda", correct: false }
      ]
    },
    {
      question: "Klikni plavu boju",
      answers: [
        { image: "images/plavi krug.png", alt: "Plavi krug", correct: true },
        { image: "images/žuti krug.png", alt: "Žuti krug", correct: false },
        { image: "images/crveni krug.png", alt: "Crveni krug", correct: false }
      ]
    },
    {
      question: "Klikni crvenu boju",
      answers: [
        { image: "images/crveno srce.png", alt: "Crveno srce", correct: true },
        { image: "images/zeleno srce.png", alt: "Zeleno srce", correct: false },
        { image: "images/plavo srce.png", alt: "Plavo srce", correct: false },
        { image: "images/zuto srce.png", alt: "Žuto srce", correct: false }
      ]
    }
  ]
};

function showScreen(screen) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function setRobotState(gameNumber, state, message = "") {
  const robot = document.getElementById(`game${gameNumber}-robot`);
  const robotMessage = document.getElementById(`game${gameNumber}-robot-message`);

  if (!robot || !robotMessage) return;

  if (state === "normal") {
    robot.src = "images/robot_normal.png";
  } else if (state === "happy") {
    robot.src = "images/robot_sretan.png";
  } else if (state === "sad") {
    robot.src = "images/robot_tuzan.png";
  }

  robotMessage.textContent = message;
}

function renderGame1() {
  const task = game1Tasks[selectedLevel][game1Index];

  setRobotState(1, "normal", "");
  document.getElementById("game1-question").textContent = task.question;
  document.getElementById("game1-feedback").textContent = "";

  const answersContainer = document.getElementById("game1-answers");
answersContainer.innerHTML = "";
answersContainer.className = "answers";

if (task.answers.length === 2) {
  answersContainer.classList.add("two-items");
} else if (task.answers.length === 3) {
  answersContainer.classList.add("three-items");
} else if (task.answers.length === 4) {
  answersContainer.classList.add("four-items");
}

  task.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answer === task.correct) {
        score++;
        document.getElementById("game1-feedback").textContent = "";        setRobotState(1, "happy", "Bravo!");

        setTimeout(() => {
          game1Index++;

          if (game1Index < game1Tasks[selectedLevel].length) {
            renderGame1();
          } else {
            game1Index = 0;
            game2Index = 0;
            showScreen(screens.game2);
            renderGame2();
          }
        }, 2000);
      } else {
        document.getElementById("game1-feedback").textContent = "";        setRobotState(1, "sad", "Pokušaj ponovno");
      }
    });

    answersContainer.appendChild(button);
  });
}

startBtn.addEventListener("click", () => {
  showScreen(screens.level);
});

instructionsBtn.addEventListener("click", () => {
  showScreen(screens.instructions);
});

backHomeBtn.addEventListener("click", () => {
  showScreen(screens.home);
});

easyBtn.addEventListener("click", () => {
  selectedLevel = "easy";
  game1Index = 0;
  showScreen(screens.game1);
  renderGame1();
});

hardBtn.addEventListener("click", () => {
  selectedLevel = "hard";
  game1Index = 0;
  showScreen(screens.game1);
  renderGame1();
});

function renderGame2() {
  const task = game2Tasks[selectedLevel][game2Index];
  setRobotState(2, "normal", "");

  document.getElementById("game2-question").textContent = task.question;
  document.getElementById("game2-feedback").textContent = "";

const answersContainer = document.getElementById("game2-answers");
answersContainer.innerHTML = "";
answersContainer.className = "answers";

if (task.answers.length === 2) {
  answersContainer.classList.add("two-items");
} else if (task.answers.length === 3) {
  answersContainer.classList.add("three-items");
} else if (task.answers.length === 4) {
  answersContainer.classList.add("four-items");
}

  task.answers.forEach(answer => {
    const button = document.createElement("button");
    button.classList.add("image-answer");

    button.innerHTML = `
  <img src="${answer.image}" alt="${answer.text}">
`;

    button.addEventListener("click", () => {
      if (answer.correct) {
        document.getElementById("game2-feedback").textContent = "";
        setRobotState(2, "happy", "Bravo!");
        score++;

        setTimeout(() => {
          game2Index++;

          if (game2Index < game2Tasks[selectedLevel].length) {
            renderGame2();
          } else {
            game2Index = 0;
            game3Index = 0;
            showScreen(screens.game3);
            renderGame3();
          }
        }, 2000);
      } else {

        document.getElementById("game2-feedback").textContent = "";
        setRobotState(2, "sad", "Pokušaj ponovno");
}
    });

    answersContainer.appendChild(button);
  });
}

function renderGame3() {
  const task = game3Tasks[selectedLevel][game3Index];
  setRobotState(3, "normal", "");

  document.getElementById("game3-question").textContent = task.question;
  document.getElementById("game3-feedback").textContent = "";

  const answersContainer = document.getElementById("game3-answers");
  answersContainer.innerHTML = "";
  answersContainer.className = "answers";

  if (task.answers.length === 2) {
    answersContainer.classList.add("two-items");
  } else if (task.answers.length === 3) {
    answersContainer.classList.add("three-items");
  } else if (task.answers.length === 4) {
    answersContainer.classList.add("four-items");
  }

  task.answers.forEach(answer => {
    const button = document.createElement("button");
    button.classList.add("image-answer");

    button.innerHTML = `
      <img src="${answer.image}" alt="${answer.alt}">
    `;

    button.addEventListener("click", () => {
      if (answer.correct) {
        score++;
        document.getElementById("game3-feedback").textContent = "";
        setRobotState(3, "happy", "Bravo!");

        setTimeout(() => {
          game3Index++;

          if (game3Index < game3Tasks[selectedLevel].length) {
            renderGame3();
          } else {
            game3Index = 0;
            finalScore.textContent = score;
            showScreen(screens.end);
          }
        }, 2000);
      } else {
        document.getElementById("game3-feedback").textContent = "";
        setRobotState(3, "sad", "Pokušaj ponovno");
      }
    });

    answersContainer.appendChild(button);
  });
}

restartBtn.addEventListener("click", () => {
  score = 0;
  game1Index = 0;
  game2Index = 0;
  game3Index = 0;
  showScreen(screens.home);
});