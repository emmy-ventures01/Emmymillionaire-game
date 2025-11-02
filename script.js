// =============================
// 🏆 Prize Money Ladder
const prizeMoney = [
  "₦500","₦1,000","₦2,000","₦4,000","₦8,000",
  "₦16,000","₦32,000","₦64,000","₦125,000","₦250,000",
  "₦500,000","₦1,000,000","₦2,000,000","₦5,000,000","₦10,000,000"
];

// =============================
// ⚽ 15 Premier League Questions
const questions = [
  { q:"Which Premier League club has won the most titles?", options:["Manchester United","Liverpool","Arsenal","Chelsea"], answer:0 },
  { q:"Who won the 2022/23 Premier League season?", options:["Manchester City","Arsenal","Liverpool","Chelsea"], answer:0 },
  { q:"Which club is nicknamed 'The Gunners'?", options:["Arsenal","Manchester United","Liverpool","Tottenham"], answer:0 },
  { q:"Which player has scored the most Premier League goals in a single season?", options:["Mohamed Salah","Alan Shearer","Sergio Aguero","Thierry Henry"], answer:1 },
  { q:"Which team plays home at Old Trafford?", options:["Manchester United","Manchester City","Chelsea","Liverpool"], answer:0 },
  { q:"Which manager won the Premier League with Leicester City in 2015/16?", options:["Claudio Ranieri","Pep Guardiola","Jurgen Klopp","Arsene Wenger"], answer:0 },
  { q:"Which club is known as 'The Blues'?", options:["Chelsea","Manchester United","Everton","Tottenham"], answer:0 },
  { q:"Who scored the fastest hat-trick in Premier League history?", options:["Sadio Mane","Cristiano Ronaldo","Robbie Fowler","Thierry Henry"], answer:0 },
  { q:"Which Premier League club has the nickname 'The Reds'?", options:["Liverpool","Manchester United","Arsenal","Chelsea"], answer:0 },
  { q:"Who holds the record for most Premier League appearances?", options:["Gareth Barry","Ryan Giggs","Frank Lampard","Jamie Carragher"], answer:0 },
  { q:"Which player won the Golden Boot in the 2021/22 season?", options:["Mohamed Salah","Son Heung-min","Cristiano Ronaldo","Harry Kane"], answer:0 },
  { q:"Which club plays at the Etihad Stadium?", options:["Manchester City","Manchester United","Liverpool","Chelsea"], answer:0 },
  { q:"Which team has the nickname 'The Toffees'?", options:["Everton","Chelsea","Tottenham","Leicester City"], answer:0 },
  { q:"Who scored the winning goal in the 2019/20 Premier League season to secure Liverpool's title?", options:["Mohamed Salah","Sadio Mane","Virgil van Dijk","Roberto Firmino"], answer:1 },
  { q:"Which player has won the most Premier League Player of the Season awards?", options:["Cristiano Ronaldo","Kevin De Bruyne","Thierry Henry","Mohamed Salah"], answer:2 }
];

// =============================
// 🔹 Track Current Question & Lifelines
let currentQuestion = 0;
let lifelinesUsed = { "50/50": false, "phone": false, "audience": false };

// =============================
// 💻 Load Question on Quiz Page
function loadQuestion() {
  const questionBox = document.querySelector(".question-box h2");
  const questionText = document.querySelector(".question-box p");
  const answerButtons = document.querySelectorAll(".answers button");

  questionBox.textContent = `Question ${currentQuestion + 1}`;
  questionText.textContent = questions[currentQuestion].q;

  answerButtons.forEach((btn,index)=>{
    btn.textContent = questions[currentQuestion].options[index];
    btn.disabled = false;
    btn.style.display = "inline-block";
    btn.onclick = ()=>checkAnswer(index);
  });

  // Highlight money ladder
  document.querySelectorAll(".money-step").forEach((step, idx)=>{
    step.classList.remove("active");
    if(idx === currentQuestion) step.classList.add("active");
  });
}

// =============================
// ✅ Check Answer
function checkAnswer(selected){
  if(selected === questions[currentQuestion].answer){
    currentQuestion++;
    if(currentQuestion >= questions.length){
      alert("🎉 Congratulations! You won the game! 💰");
      window.location.href="index.html";
    } else {
      loadQuestion();
    }
  } else {
    let moneyWon = "₦0";
    if(currentQuestion>9) moneyWon = prizeMoney[9];
    else if(currentQuestion>4) moneyWon = prizeMoney[4];
    else if(currentQuestion>0) moneyWon = prizeMoney[currentQuestion-1];
    window.location.href = `lost.html?money=${moneyWon}`;
  }
}

// =============================
// 🟦 Lifelines
function use5050(){
  if(lifelinesUsed["50/50"]) return alert("You already used 50/50!");
  lifelinesUsed["50/50"] = true;

  const correct = questions[currentQuestion].answer;
  const answerButtons = document.querySelectorAll(".answers button");
  let removed = 0;
  for(let i=0;i<answerButtons.length;i++){
    if(i!==correct && removed<2){
      answerButtons[i].style.display="none";
      removed++;
    }
  }
}

function usePhone(){
  if(lifelinesUsed["phone"]) return alert("You already used Phone a Friend!");
  lifelinesUsed["phone"]=true;
  const correct = questions[currentQuestion].answer;
  alert(`📞 Your friend thinks the answer might be: "${questions[currentQuestion].options[correct]}"`);
}

function useAudience(){
  if(lifelinesUsed["audience"]) return alert("You already used Ask the Audience!");
  lifelinesUsed["audience"]=true;
  const correct = questions[currentQuestion].answer;
  let votes = [10,20,30,40];
  // Give higher chance to correct answer
  votes[correct] += 50;
  alert(`👥 Audience votes:\nA: ${votes[0]}%\nB: ${votes[1]}%\nC: ${votes[2]}%\nD: ${votes[3]}%`);
}

// =============================
// 🎯 Initialize
document.addEventListener("DOMContentLoaded", ()=>{
  // Link buttons to lifeline functions
  document.querySelectorAll(".lifelines button")[0].onclick = use5050;
  document.querySelectorAll(".lifelines button")[1].onclick = usePhone;
  document.querySelectorAll(".lifelines button")[2].onclick = useAudience;

  loadQuestion();
});
