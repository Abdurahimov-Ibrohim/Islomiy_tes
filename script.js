const questions = [
    {
        question: "Islom olamida Andalusiya deb qayerni aytishadi ?",
        answers: [
            { text: "Latviya", correct: false},
            { text: "Portugaliya va Ispaniya", correct: true},
            { text: "Shvitsariya", correct: false},
            { text: "Gretsiya", correct: false},
        ]
    },
    {
        question: "Sahihi Buxoriy ga nechta sharh yozilgan ?",
        answers: [
            { text: "82 ta", correct: true},
            { text: "21 ta", correct: false},
            { text: "96 ta", correct: false},
            { text: "112 ta", correct: false},
        ]
    },
    {
        question: "Abu Bakir Siddiqning onalari ismi nima edi ?",
        answers: [
            { text: "Uchinchi javob to'g'ri", correct: false},
            { text: "Oysha", correct: false},
            { text: "Mariyam", correct: false},
            { text: "Ummul Xayr Salmo binti Saxir ibn Omir", correct: true},
        ]
    },
    {
        question: "Nuh payg'anbar kemasi to'xtagan tog' nomi nima ?",
        answers: [
            { text: "Ornon tog'i", correct: false},
            { text: "Himolay", correct:false },
            { text: "Ju'di tog'i", correct: true},
            { text: "Birinchi javob to'g'ri", correct: false},
        ]
    },
    {
        question: "Payg’ambarimis s.a.v qachon tug’ulib? Qachon vafot etganlar ?",
        answers: [
            { text: "571 tug’ulib 633 vafot etganlar", correct: false},
            { text: "571 tug’ulib 631 vafot etganlar", correct:false },
            { text: "571 tug’ulib 632 vafot etganlar", correct: true},
            { text: "571 tug’ulib 622 vafot etganlar", correct: false},
        ]
    },
    {
        question: "Dunyoning yarim go‘zalligi berilgan payg‘ambar bu ?",
        answers: [
            { text: "Dovud (a.s)", correct: false},
            { text: "Yusuf (a.s)", correct: true},
            { text: "Ibrohim (a.s)", correct: false},
            { text: "Xizir (a.s)", correct: false},
        ]
    },
    {
        question: "Allohning va Rasullullohning Arsloni deb nom olgan sahoba bu ?",
        answers: [
            { text: "Xamza Ibn Abd Muttalib (r.a)", correct: true},
            { text: "Umar (r.a)", correct: false},
            { text: "Ali (r.a)", correct: false},
            { text: "Uchinchi javob to'g'ri", correct: false},
        ]
    },
    {
        question: "Ummatning ichida ummatga eng rahmli bo‘lgan sahoba bu ?",
        answers: [
            { text: "Ikkinchi javob to'g'ri", correct: false},
            { text: "Xamza Ibn Abd Muttalib (r.a)", correct: false},
            { text: "Umar (r.a)", correct: false},
            { text: "Abu Bakr Siddiq (r.a)", correct: true},
        ]
    },
    {
        question: "Qaysi payg‘ambar o‘lim farishtasi kelganda bir shapaloq urganlar ?",
        answers: [
            { text: "Xizir (a.s)", correct: false},
            { text: "Dovud (a.s)", correct:false },
            { text: "Muso (a.s)", correct: true},
            { text: "Birinchi javob to'g'ri", correct: false},
        ]
    },
    {
        question: "Payg‘ambarimiz s.a.v hadicha onamizga mahrga nima xadya qilganlar ?",
        answers: [
            { text: "20 ta tuya", correct: false},
            { text: "30 ta tuya", correct:false },
            { text: "20 ta bo‘taloq", correct: true},
            { text: "3 ta qo'y", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `siz ${questions.length} ta savoldan ${score} tasini topdingiz!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
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
    }
})

startQuiz();
