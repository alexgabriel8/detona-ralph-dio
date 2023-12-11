const state = {
    // Variables related to something that is shown on screen to the user
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        restartBtn: document.querySelector(".restart-btn")
    },

    // Variables that are related to something the player cannot see; that are manipulated in the background
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    
    // variables that do something; do/call an action
    actions: {
        timerId: null,
        countDownTimerId: null,
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) finishGame()
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit")
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
    state.view.restartBtn.classList.add("hidden")
    state.actions.timerId = setInterval(randomSquare, 1000)
    state.actions.countDownTimerId = setInterval(countDown, 1000)
}

function finishGame() {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    state.view.restartBtn.classList.remove("hidden")
    alert(`Game Over! O seu resultado foi ${state.values.result}`)
}

function restartGame() {
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.result = 0;
    state.view.score.textContent = state.values.result
    initialize()
}

initialize()