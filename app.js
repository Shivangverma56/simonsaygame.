let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreText = document.querySelector("#high-score");

document.addEventListener("keydown", function () {

    if (started === false) {
        console.log("Game started");

        started = true;
        levelUp();
    }
});


function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}


function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);
}


function levelUp() {

    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    gameFlash(randBtn);
}


function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {

            setTimeout(function () {
                levelUp();
            }, 700);
        }

    } else {

        if (level > highScore) {
            highScore = level;

            highScoreText.textContent =
                "High Score: " + highScore;
        }

        h2.innerHTML =
            `Game Over! Your score was <b>${level}</b>
            <br>Press any key to restart`;

        document.body.style.background = "red";

        setTimeout(function () {

            document.body.style.background =
                "linear-gradient(135deg, #0f172a, #312e81, #581c87)";

        }, 200);

        reset();
    }
}


function btnPress() {

    if (!started) {
        return;
    }

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    console.log("User Sequence:", userSeq);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {

    btn.addEventListener("click", btnPress);

}


function reset() {

    started = false;

    level = 0;

    gameSeq = [];

    userSeq = [];
}
