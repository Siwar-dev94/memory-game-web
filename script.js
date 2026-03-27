// --- Elements ---
const game = document.getElementById("game");
const timerSpan = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const toFind = document.getElementById("toFind");
const scoreSpan = document.getElementById("score");
const message = document.getElementById("message");

let timeLeft = 60;
 
let countdown;
let score = 0;
let gameActive = false;

// --- 16 cartes ---
const cardsArray = [
  {name:"Shah Rukh Khan", img:"shahrukh.jpg"},
  {name:"Salman Khan", img:"salman.jpg"},
  {name:"Aamir Khan", img:"aamir.jpg"},
  {name:"Amitabh Bachchan", img:"amitabh.jpg"},
  {name:"Hrithik Roshan", img:"hrithik.jpg"},
  {name:"Ranbir Kapoor", img:"ranbir.jpg"},
  {name:"Ranveer Singh", img:"ranveer.jpg"},
  {name:"Akshay Kumar", img:"akshay.jpg"},
  {name:"Sushant Singh Rajput", img:"sushant.jpg"},
  {name:"Tiger Shroff", img:"tiger.jpg"},
  {name:"Vicky Kaushal", img:"vicky.jpg"},
  {name:"Ajay Devgan", img:"ajay.jpg"},
  {name:"Saif Ali Khan", img:"saif.jpg"},
  {name:"Varun Dhawan", img:"varun.jpg"},
  {name:"Shahid Kapoor", img:"shahid.jpg"},
  {name:"Irrfan Khan", img:"irrfan.jpg"},
];

// --- Mélange simple ---
function shuffle(array){ return array.sort(()=>Math.random()-0.5); }

let fullCards = shuffle([...cardsArray]);

// --- Créer les cartes ---
function createBoard(){
  game.innerHTML = "";
  fullCards.forEach(c=>{
    const card = document.createElement("div");
    card.className="card";

    const inner = document.createElement("div");
    inner.className="card-inner";

    const front = document.createElement("div");
    front.className="card-front";

    const back = document.createElement("div");
    back.className="card-back";
    back.style.backgroundImage=`url(${c.img})`;
    back.textContent=c.name;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.dataset.name=c.name;

    card.onclick=()=>handleClick(card);

    game.appendChild(card);
  });
}


createBoard();

// --- Commencer le jeu ---
startBtn.onclick = ()=>{
  startBtn.disabled = true;
  replayBtn.disabled = true;

  document.querySelectorAll(".card").forEach(c=>c.classList.add("flipped"));

  countdown = setInterval(()=>{
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if(timeLeft===0){
      clearInterval(countdown);
      hideCards();
      startGame();
    }
  },1000);
};

// --- Cacher cartes ---
function hideCards(){
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("flipped"));
}

// --- Début vrai jeu ---
function startGame(){
  gameActive=true;
  score=0;
  scoreSpan.textContent=0;
  message.textContent="";
  replayBtn.disabled=false;
  pickRandomName();
}

// --- Choisir un nom aléatoire ---
function pickRandomName(){
  let remaining = document.querySelectorAll(".card:not(.found)");
  if(remaining.length===0){
    message.textContent=`🎉 Félicitations ! Vous avez réussi ! Score : ${score}`;
    gameActive=false;
    return;
  }
  let random = remaining[Math.floor(Math.random()*remaining.length)];
  toFind.textContent=random.dataset.name;
}

// --- Cliquer sur carte ---
function handleClick(card){
  if(!gameActive || card.classList.contains("found") || card.classList.contains("flipped")) return;
  card.classList.add("flipped");

  if(card.dataset.name===toFind.textContent){
    score++;
    scoreSpan.textContent=score;
    card.classList.add("found");
    setTimeout(()=>pickRandomName(),500);
  } else {
    gameActive=false;
    message.textContent=`❌ Vous avez perdu ! Score : ${score}`;
  }
}

// --- Rejouer ---
replayBtn.onclick=()=>{
  clearInterval(countdown);
  score=0; 
  scoreSpan.textContent=0;
  timeLeft=60;
   timerSpan.textContent=60;
  gameActive=false;
  startBtn.disabled=false;
  replayBtn.disabled=true;
  message.textContent="";
  fullCards=shuffle([...cardsArray]);
  createBoard();
  toFind.textContent="...";
};
