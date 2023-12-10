const state = {
    // Variables related to something that is shown on screen to the user
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },

    // Variables that are related to something the player cannot see; that are manipulated in the background
    values: {
        timerId: null,
        gameVelocity: 1000
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
    
    })
}

function initialize() {
    randomSquare();
    // moveEnemy();
}

initialize()