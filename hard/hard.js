const questions = [
    {
        question:"In which year was the first successful powered flight by the Wright brothers?",
        answers:[
            {text:"1903",correct:true},
            {text:"1912", correct:false},
            {text:"1925",correct:false},
            {text:"1938",correct:false},

        ]
    },
    {
        question:"What is the highest mountain in the world?",
        answers:[
            {text:"K2",correct:false},
            {text:"Mount Kilimanjaro", correct:false},
            {text:"Mount Everest",correct:true},
            {text:"Mount Fuji",correct:false},
        ] 
    },
    {
        question:"Which planet is known as the 'Red Planet'?",
        answers:[
            {text:"Jupiter",correct:false},
            {text:"Venus", correct:false},
            {text:"Mars",correct:true},
            {text:"Saturn",correct:false},
        ]
    },
    {
        question:"What is the largest species of shark in the world?",
        answers:[
            {text:"Great White Shark",correct:false},
            {text:"Hammerhead Shark", correct:false},
            {text:"Whale Shark",correct:true},
            {text:"Tiger Shark",correct:false},
        ]
    },
    {
        question:"Who is the author of the novel 'To Kill a Mockingbird'?",
        answers:[
            {text:"F. Scott Fitzgerald",correct:false},
            {text:"Ernest Hemingway", correct:false},
            {text:"Harper Lee",correct:true},
            {text:"Mark Twain",correct:false},
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



