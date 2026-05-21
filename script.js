const correctSound = new Audio("audio/correct.mp3");
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
const finalScore = document.getElementById("final-score");
const audioOnBtn = document.getElementById("audio-on-btn");
const audioOffBtn = document.getElementById("audio-off-btn");

const game1AudioBtn = document.getElementById("game1-audio-btn");
const game2AudioBtn = document.getElementById("game2-audio-btn");
const game3AudioBtn = document.getElementById("game3-audio-btn");
const instructionsAudio = new Audio("audio/upute.mp3");

let score = 0;
let selectedLevel = "easy";
let game1Index = 0;
let game2Index = 0;
let game3Index = 0;
let isTransitioning = false;
let audioEnabled = false;
let currentTaskAudio = null;

const game1Tasks = {
  easy: [
    { question: "Klikni slovo M", answers: ["A", "M", "S"], correct: "M", audio: "audio/slovo_M.mp3" },
    { question: "Klikni slovo A", answers: ["A", "T", "P"], correct: "A", audio: "audio/slovo_A.mp3" },
    { question: "Klikni slovo L", answers: ["K", "L", "R"], correct: "L", audio: "audio/slovo_L.mp3" }
  ],
  hard: [
    { question: "Klikni slovo M", answers: ["A", "M", "S", "P"], correct: "M", audio: "audio/slovo_M.mp3" },
    { question: "Klikni slovo A", answers: ["A", "T", "P", "K"], correct: "A", audio: "audio/slovo_A.mp3" },
    { question: "Klikni slovo L", answers: ["K", "L", "R", "B"], correct: "L", audio: "audio/slovo_L.mp3" }
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
      ],
      audio: "audio/slika_S.mp3"
    },
    {
      question: "Odaberi sliku za slovo A",
      answers: [
        { text: "Pas", image: "images/pas.png", correct: false },
        { text: "Auto", image: "images/auto.png", correct: true },
        { text: "Cvijet", image: "images/cvijet.png", correct: false }
      ],
      audio: "audio/slika_A.mp3"
    },
    {
      question: "Odaberi sliku za slovo M",
      answers: [
        { text: "Kućica", image: "images/kucica.png", correct: false },
        { text: "Mačka", image: "images/mačka.png", correct: true },
        { text: "Sunce", image: "images/sunce.png", correct: false }
      ],
      audio: "audio/slika_M.mp3"
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
      ],
      audio: "audio/slika_S.mp3"
    },
    {
      question: "Odaberi sliku za slovo A",
      answers: [
        { text: "Pas", image: "images/pas.png", correct: false },
        { text: "Auto", image: "images/auto.png", correct: true },
        { text: "Cvijet", image: "images/cvijet.png", correct: false },
        { text: "Lopta", image: "images/lopta.png", correct: false }
      ],
      audio: "audio/slika_A.mp3"
    },
    {
      question: "Odaberi sliku za slovo M",
      answers: [
        { text: "Kućica", image: "images/kucica.png", correct: false },
        { text: "Mačka", image: "images/mačka.png", correct: true },
        { text: "Sunce", image: "images/sunce.png", correct: false },
        { text: "Bicikl", image: "images/bicikl.png", correct: false }
      ],
      audio: "audio/slika_M.mp3"
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
      ],
      audio: "audio/zelena_boja.mp3"
    },
    {
      question: "Klikni plavu boju",
      answers: [
        { image: "images/plavi krug.png", alt: "Plavi krug", correct: true },
        { image: "images/žuti krug.png", alt: "Žuti krug", correct: false }
      ],
      audio: "audio/plava_boja.mp3"
    },
    {
      question: "Klikni crvenu boju",
      answers: [
        { image: "images/crveno srce.png", alt: "Crveno srce", correct: true },
        { image: "images/zeleno srce.png", alt: "Zeleno srce", correct: false }
      ],
      audio: "audio/crvena_boja.mp3"
    }
  ],
  hard: [
    {
      question: "Klikni zelenu boju",
      answers: [
        { image: "images/zelena zvijezda.png", alt: "Zelena zvijezda", correct: true },
        { image: "images/crvena zvijezda.png", alt: "Crvena zvijezda", correct: false },
        { image: "images/plava zvijezda.png", alt: "Plava zvijezda", correct: false }
      ],
      audio: "audio/zelena_boja.mp3"
    },
    {
      question: "Klikni plavu boju",
      answers: [
        { image: "images/plavi krug.png", alt: "Plavi krug", correct: true },
        { image: "images/žuti krug.png", alt: "Žuti krug", correct: false },
        { image: "images/crveni krug.png", alt: "Crveni krug", correct: false }
      ],
      audio: "audio/plava_boja.mp3"
    },
    {
      question: "Klikni crvenu boju",
      answers: [
        { image: "images/crveno srce.png", alt: "Crveno srce", correct: true },
        { image: "images/zeleno srce.png", alt: "Zeleno srce", correct: false },
        { image: "images/plavo srce.png", alt: "Plavo srce", correct: false },
        { image: "images/zuto srce.png", alt: "Žuto srce", correct: false }
      ],
      audio: "audio/crvena_boja.mp3"
    }
  ]
};

function showScreen(screen) {
  stopCurrentTaskAudio();
  Object.values(screens).forEach((s) => s.classList.remove("active"));
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

function setAnswersLayout(container, answersLength) {
  container.innerHTML = "";
  container.className = "answers";

  if (answersLength === 2) {
    container.classList.add("two-items");
  } else if (answersLength === 3) {
    container.classList.add("three-items");
  } else if (answersLength === 4) {
    container.classList.add("four-items");
  }
}

function playAudio(src) {
  if (!src) return;

  if (currentTaskAudio) {
    currentTaskAudio.pause();
    currentTaskAudio.currentTime = 0;
  }

  currentTaskAudio = new Audio(src);
  currentTaskAudio.play().catch(() => {});
}

function stopCurrentTaskAudio() {
  if (currentTaskAudio) {
    currentTaskAudio.pause();
    currentTaskAudio.currentTime = 0;
  }
}

function updateAudioButtonState(button) {
  if (!button) return;

  if (audioEnabled) {
    button.classList.remove("audio-off-look");
  } else {
    button.classList.add("audio-off-look");
  }
}

function stopInstructionsAudio() {
  instructionsAudio.pause();
  instructionsAudio.currentTime = 0;
}

function markAnswer(button, isCorrect) {
  if (isCorrect) {
    button.classList.add("answer-correct");

    const check = document.createElement("img");
    check.src = "images/kvacica.png";
    check.alt = "Točno";
    check.classList.add("answer-check");
    button.appendChild(check);
  } else {
    button.classList.add("answer-wrong");
  }
}

function renderGame1() {
  const task = game1Tasks[selectedLevel][game1Index];
  const question = document.getElementById("game1-question");
  const feedback = document.getElementById("game1-feedback");
  const answersContainer = document.getElementById("game1-answers");

  setRobotState(1, "normal", "");
  question.textContent = task.question;
  game1AudioBtn.onclick = () => playAudio(task.audio);
feedback.textContent = "";
isTransitioning = false;

if (audioEnabled) {
  playAudio(task.audio);
}

  setAnswersLayout(answersContainer, task.answers.length);

  task.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => {
  if (isTransitioning) return;

  if (answer === task.correct) {
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
    isTransitioning = true;
    markAnswer(button, true);
    score++;
    feedback.textContent = "";
    setRobotState(1, "happy", "Bravo!");

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
  markAnswer(button, false);
  feedback.textContent = "";
  setRobotState(1, "sad", "Pokušaj ponovno");
}
    });

    answersContainer.appendChild(button);
  });
}

function renderGame2() {
  const task = game2Tasks[selectedLevel][game2Index];
  const question = document.getElementById("game2-question");
  const feedback = document.getElementById("game2-feedback");
  const answersContainer = document.getElementById("game2-answers");

  setRobotState(2, "normal", "");
  question.textContent = task.question;
  game2AudioBtn.onclick = () => playAudio(task.audio);
  feedback.textContent = "";
  isTransitioning = false;
  
  if (audioEnabled) {
    playAudio(task.audio);
}

  setAnswersLayout(answersContainer, task.answers.length);

  task.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("image-answer");
    button.innerHTML = `<img src="${answer.image}" alt="${answer.text}">`;

    button.addEventListener("click", () => {
      if (isTransitioning) return;

      if (answer.correct) {
        correctSound.currentTime = 0;
        correctSound.play().catch(() => {});
        isTransitioning = true;
        markAnswer(button, true);
        score++;
        feedback.textContent = "";
        setRobotState(2, "happy", "Bravo!");

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
  markAnswer(button, false);
  feedback.textContent = "";
  setRobotState(2, "sad", "Pokušaj ponovno");
}
    });

    answersContainer.appendChild(button);
  });
}

function renderGame3() {
  const task = game3Tasks[selectedLevel][game3Index];
  const question = document.getElementById("game3-question");
  const feedback = document.getElementById("game3-feedback");
  const answersContainer = document.getElementById("game3-answers");

  setRobotState(3, "normal", "");
  question.textContent = task.question;
  game3AudioBtn.onclick = () => playAudio(task.audio);
  feedback.textContent = "";
  isTransitioning = false;
  
  if (audioEnabled) {
    playAudio(task.audio);
}

  setAnswersLayout(answersContainer, task.answers.length);

  task.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("image-answer");
    button.innerHTML = `<img src="${answer.image}" alt="${answer.alt}">`;

    button.addEventListener("click", () => {
      if (isTransitioning) return;

      if (answer.correct) {
        correctSound.currentTime = 0;
        correctSound.play().catch(() => {});
        isTransitioning = true;
        markAnswer(button, true);
        score++;
        feedback.textContent = "";
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
  markAnswer(button, false);
  feedback.textContent = "";
  setRobotState(3, "sad", "Pokušaj ponovno");
}
    });

    answersContainer.appendChild(button);
  });
}

startBtn.addEventListener("click", () => {
  stopInstructionsAudio();
  showScreen(screens.level);
});
instructionsBtn.addEventListener("click", () => {
  showScreen(screens.instructions);
  stopInstructionsAudio();
  instructionsAudio.play().catch(() => {});
});

backHomeBtn.addEventListener("click", () => {
  stopInstructionsAudio();
  showScreen(screens.home);
});

audioOnBtn.addEventListener("click", () => {
  audioEnabled = true;
  audioOnBtn.classList.add("selected-audio");
  audioOffBtn.classList.remove("selected-audio");
});

audioOffBtn.addEventListener("click", () => {
  audioEnabled = false;
  audioOffBtn.classList.add("selected-audio");
  audioOnBtn.classList.remove("selected-audio");
});

easyBtn.addEventListener("click", () => {
  score = 0;
  selectedLevel = "easy";
  game1Index = 0;
  game2Index = 0;
  game3Index = 0;
  isTransitioning = false;
  showScreen(screens.game1);
  renderGame1();
});

hardBtn.addEventListener("click", () => {
  score = 0;
  selectedLevel = "hard";
  game1Index = 0;
  game2Index = 0;
  game3Index = 0;
  isTransitioning = false;
  showScreen(screens.game1);
  renderGame1();
});

restartBtn.addEventListener("click", () => {
  stopInstructionsAudio();
  score = 0;
  game1Index = 0;
  game2Index = 0;
  game3Index = 0;
  isTransitioning = false;
  showScreen(screens.home);
});