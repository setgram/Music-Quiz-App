const questions = [
  {
    question: "Best pop Artist in The World",
    answers: [
      { text: "Justin Bieber", correct: true },
      { text: "The weeknd", correct: false },
      { text: "Taylor Swift", correct: false },
      { text: "Wizkid", correct: false },
    ],
  },
  {
    question: "The Biggest Afrobeat Artist In Nigeria",
    answers: [
      { text: "Davido", correct: false },
      { text: "Wizkid", correct: true },
      { text: "BurnaBoy", correct: false },
      { text: "Omahlay", correct: false },
    ],
  },
  {
    question: "Promising Artist In Nigeria",
    answers: [
      { text: "Rema", correct: false },
      { text: "Omah Lay", correct: false },
      { text: "Tems", correct: false },
      { text: "Arya Starr", correct: true },
    ],
  },
  {
    question: "Best Rapper In Nigeria",
    answers: [
      { text: "Erigga", correct: false },
      { text: "Falz", correct: true },
      { text: "Ladipoe", correct: false },
      { text: "Blaqbonez", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
