/**
 * questions and answers
 * inspired by https://shorturl.at/DwMjG
 */
const questions = [
    {
        question: "On average, how many pups are in a capybara litter?",
        answers: [
            { text: "9 or 10", correct: false},
            { text: "12 or more", correct: false},
            { text: "4 or 5", correct: true},
            { text: "1 or 2", correct: false},
        ]
    },
    {
        question: "Which continent are capybaras native to?",
        answers: [
            { text: "South America", correct: true},
            { text: "Africa", correct: false},
            { text: "Australia", correct: false},
            { text: "Asia", correct: false},
        ]
    },
    {
        question: "What order do capybaras belong to?",
        answers: [
            { text: "Chiroptera", correct: false},
            { text: "Rodentia", correct: true},
            { text: "Carnivora", correct: false},
            { text: "Cingulata", correct: false},
        ]
    },
    {
        question: "What do capybaras eat?",
        answers: [
            { text: "Aquatic plants", correct: false},
            { text: "Grasses", correct: false},
            { text: "Bark", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "How long can a capybara hold their breath?",
        answers: [
            { text: "1 to 2 minutes", correct: false},
            { text: "Up to 5 minutes", correct: true},
            { text: "Up to 8 minutes", correct: false},
            { text: "10 to 12 minutes", correct: false},
        ]
    }
];

/**
 * additional variables
 */
const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answers-area");
const nextButton = document.getElementById("next-btn");

/**
 * question index and score
 */
let currentQuestionIndex = 0;
let score = 0;

/**
 * function to restart the quiz, resetting the score
 * and question count
 */
function quizStart(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/**
 * function to display current question
 */
function showQuestion() {
    fullReset();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    /**
     * creating answer buttons
     * code taken from: https://youtu.be/PBcqGxrr9g8?si=ryswgcVlomRzBkUs&t=1229
     */
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", answerSelect);
    });
}

/**
 * hiding the original buttons
 */
function fullReset() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

/**
 * adding correct/incorrect value event
 * and score increase
 */
function answerSelect(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    /**
     * disabling the ability to click other
     * buttons and revealing the 'next'
     * button
     * personally adjusted but inspired from https://youtu.be/Vp8x8-reqZA?si=N71h57t5flGGg59S&t=3649
     */
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

/**
 * displaying the users score
 */
function showScore(){
    fullReset();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Click below to try again!`;
    nextButton.innerHTML = "Try again";
    nextButton.style.display = "block";
}

/**
 * next button function
 */
function updateNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        updateNextButton();
    } else {
        quizStart();
    }
});

/**
 * calling the quizStart function
 */
quizStart();