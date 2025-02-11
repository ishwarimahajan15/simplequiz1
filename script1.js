
const questions = [
    {
      question: "What comes next in the series 2,6,12,20,30?",
      answers: [
        { text: "38", correct: false },
        { text: "42", correct: true },
        { text: "40", correct: false },
        { text: "44", correct: false }
      ]
    },
    {
      question: "A is the father of B. But B is not the son of A. How is B related to A?",
      answers: [
        { text: "Daughter", correct: true},
        { text: "Son", correct: false },
        { text: "Wife", correct: false },
        { text: "Sister", correct: false }
      ]
    },
    {
      question: "If APPLE is written as ELPPA, how will ORANGE be written",
      answers: [
        { text: "EGNORA", correct: false },
        { text: "EONGAR", correct: false },
        { text: "ENOGRA", correct: false },
        { text: "EGNARO", correct: true }
      ]
    },
    {
      question: "A person walks 5 km towards the north, then turns right and walks 3 km. Again, he turns right and walks 5 km. In which direction is he now facing?",
      answers: [
        { text: "South", correct: false },
        { text: "East", correct: true },
        { text: "North", correct: false },
        { text: "West", correct: false }
      ]
    },
    {
      question: "A clock shows 10:10. If the minute hand points towards east, in which direction does the hour hand point?",
      answers: [
        { text: "North-East", correct: true },
        { text: "South-East", correct: false },
        { text: "North", correct: false },
        { text: "South", correct: false }
      ]
    },
  ];
  
  const questionElement = document.getElementById("Question");
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
    currentQuestion.answers.forEach(answer => {
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
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
  