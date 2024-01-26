let currentQuestion = 0;
let score = 0;
let questions = [];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsList = document.getElementById('options-list');
const nextButton = document.getElementById('next-btn');

const loadQuestion = () => {
  const current = questions[currentQuestion];
  questionElement.textContent = current.q;

  current.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = option;
    listItem.addEventListener('click', () => checkAnswer(index));
    optionsList.appendChild(listItem);
  });
};

const checkAnswer = (selectedIndex) => {
  const correctIndex = questions[currentQuestion].ans;

  if (selectedIndex === correctIndex) {
    optionsList.childNodes[selectedIndex].style.color = 'green';
    score++;
  } else {
    optionsList.childNodes[selectedIndex].style.color = 'red';
    optionsList.childNodes[correctIndex].style.color = 'green';
  }

  nextButton.disabled = false;
  optionsList.childNodes.forEach((option) => option.removeEventListener('click', checkAnswer));
};

const loadNextQuestion = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    optionsList.innerHTML = '';
    loadQuestion();
  } else {
    endQuiz();
  }
};

const endQuiz = () => {
  questionContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${questions.length}</p>`;
  nextButton.disabled = true;
};

nextButton.addEventListener('click', loadNextQuestion);

// Fetch questions from JSON file
fetch('qn.json')
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    loadQuestion();
    nextButton.disabled = true; // Disable next button initially
  })
  .catch((error) => console.error('Error fetching questions:', error));
