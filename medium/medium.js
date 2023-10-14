const questions = [
    {
        question:"Who wrote the famous play 'Romeo and Juliet'?",
        answers:[
            {text:"Charles Dickens",correct:false},
            {text:"William Shakespeare", correct:true},
            {text:"Jane Austen",correct:false},
            {text:"Leo Tolstoy",correct:false},

        ]
    },
    {
        question:"What is the chemical symbol for gold?",
        answers:[
            {text:"Go",correct:false},
            {text:"Gd", correct:false},
            {text:"Au",correct:true},
            {text:"Ag",correct:false},
        ] 
    },
    {
        question:"Who painted the Mona Lisa?",
        answers:[
            {text:"Vincent van Gogh",correct:false},
            {text:"Pablo Picasso", correct:false},
            {text:"Leonardo da Vinci",correct:true},
            {text:"Salvador Dalí",correct:false},
        ]
    },
    {
        question:"What is the chemical symbol for oxygen?",
        answers:[
            {text:"Ox",correct:false},
            {text:"Oy", correct:false},
            {text:"Oxg",correct:false},
            {text:"O",correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const timerElement = document.getElementById("timer"); // Add this line

let currentQuestionIndex=0;
let score=0;
let startTime; // Add this line
let timerInterval; // Add this line

// Function to start the timer
function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        const elapsedTime = new Date(currentTime - startTime);
        const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');
        timerElement.textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
    startTimer(); // Start the timer when the quiz begins
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo +". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled= true ;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
    stopTimer(); // Stop the timer when the quiz is over
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});
startQuiz();



