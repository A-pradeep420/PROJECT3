const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
    },
    {
      question: "What is the largest planet in our Solar System?",
      answers: ["Earth", "Jupiter", "Mars", "Saturn"],
      correct: 1
    },
    {
      question: "Which programming language is used for web development?",
      answers: ["Python", "C++", "JavaScript", "Ruby"],
      correct: 2
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Au", "Ag", "Pb", "Fe"],
      correct: 0
    },
    {
      question: "Who developed the theory of relativity?",
      answers: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
      correct: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  const questionText = document.getElementById('question-text');
  const answerList = document.getElementById('answer-list');
  const timeDisplay = document.getElementById('time');
  const scoreDisplay = document.getElementById('score');
  const nextBtn = document.getElementById('next-btn');
  const resultScreen = document.getElementById('result');
  const retryBtn = document.getElementById('retry-btn');
  const quizScreen = document.getElementById('quiz');
  
  function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.innerHTML = question.question;
  
    answerList.innerHTML = '';
    question.answers.forEach((answer, index) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.classList.add('answer-btn');
      button.textContent = answer;
      button.onclick = () => checkAnswer(index, button);
      li.appendChild(button);
      answerList.appendChild(li);
    });
  
    nextBtn.classList.add('hidden'); // Hide the next button initially
  }
  
  function checkAnswer(selected, button) {
    const correct = questions[currentQuestion].correct;
    if (selected === correct) {
      score++;
      scoreDisplay.innerHTML = `Score: ${score}`;
    }
  
    // Disable all answer buttons after selection
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.disabled = true);
  
    // Show the next question button
    nextBtn.classList.remove('hidden');
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.innerHTML = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        currentQuestion++;
        if (currentQuestion < questions.length) {
          loadQuestion();
          resetTimer();
        } else {
          endQuiz();
        }
      }
    }, 1000);
  }
  
  function resetTimer() {
    timeLeft = 30;
    timeDisplay.innerHTML = timeLeft;
  }
  
  function endQuiz() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    document.getElementById('final-score').innerHTML = `Your Score: ${score}`;
  }
  
  nextBtn.onclick = function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
      resetTimer();
      startTimer();
      nextBtn.classList.add('hidden'); // Hide next button until the next answer is selected
    } else {
      endQuiz();
    }
  };
  
  retryBtn.onclick = function() {
    score = 0;
    currentQuestion = 0;
    scoreDisplay.innerHTML = `Score: 0`;
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
    startTimer();
  };
  
  window.onload = () => {
    loadQuestion();
    startTimer();
  };
  