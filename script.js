let currentQuestion = 0;
let score = 0;
let questions = [];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsList = document.getElementById('options-list');
const nextButton = document.getElementById('next-btn');

const loadQuestion = (question) => {
  questionElement.textContent = question.q;
  optionsList.innerHTML = '';

  question.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = option;
    listItem.setAttribute('data-index', index);
    listItem.addEventListener('click', checkAnswer);
    optionsList.appendChild(listItem);
  });
};

const checkAnswer = (event) => {
  const selectedOption = event.target;
  const selectedIndex = selectedOption.getAttribute('data-index');
  const correctIndex = questions[currentQuestion].ans;

  if (selectedIndex === correctIndex) {
    selectedOption.style.color = 'green';
    score++;
  } else {
    selectedOption.style.color = 'red';
  }

  optionsList.removeEventListener('click', checkAnswer);
  nextButton.disabled = false;
};

const loadNextQuestion = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion(questions[currentQuestion]);
    resetOptionsStyle();
  } else {
    endQuiz();
  }
};

const resetOptionsStyle = () => {
  optionsList.childNodes.forEach((option) => {
    option.style.color = '';
  });
};

const endQuiz = () => {
  questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${questions.length}</p>`;
};

nextButton.addEventListener('click', loadNextQuestion);

// Fetch questions from JSON file
fetch('qn.json')
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    loadQuestion(questions[currentQuestion]);
    nextButton.disabled = false; // Enable the next button after questions are loaded
  });
  
