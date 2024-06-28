let buttons=document.querySelectorAll(".box");
console.log(buttons);
let reset=document.querySelector("#reset");
console.log(reset);
let message=document.querySelector("#msg");
console.log(message);
let newGame=document.querySelector("#newGame");
console.log(newGame);
let message_container=document.querySelector(".msg-container");
console.log(message_container);

// alternate turns kilye variable turn
let turn_O = true; // player_O , player_X
let count = 0;

// jn condition mn player jeet jye ga
// iskilye hm two-dimensional array use krn gy
const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

/* To make Reset Button active */
const resetGame = () => {
    turn_O = true; 
    enableButtons();
    message_container.classList.add("hide");
    count = 0; 
};

/*  chun ky hr box(buttons) k click hony pr koi na koi action hona chaiye isliye hr ak 
kilye event listener add krn gy */
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (turn_O) {
            button.innerText = "O"; // player_O
            button.style.color = "green";
        } else {
            button.innerText = "X";
            button.style.color = "yellow";
        }
        turn_O = !turn_O; // Toggle turns
        button.disabled = true; // Disable button after click
        count++;

        // Check for winner after each move
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            drawCond(); // Check for draw if all buttons are used and no winner
        }
    });
});

// Draw condition function
const drawCond = () => {
    message.innerText = "Match ended in a draw!";
    message_container.classList.remove("hide");
    disableButtons(); // Disable all buttons when it's a draw
};


/* function bna dia for enabling buttons */
const enableButtons = () => {
    buttons.forEach((button) => {
        button.disabled = false;
        button.innerText = ""; // Clear button text
    });
};

/* function bna dia for disabling buttons */
const disableButtons = () => {
    buttons.forEach((button) => {
        button.disabled = true;
    });
};

// Show winner function
const showWinner = (winner) => {
    message.innerText = `Congratulations! Winner is ${winner}`;
    message_container.classList.remove("hide"); // hide mry ps tb remove krdena h jb winner show krna h
    disableButtons(); // Disable all buttons when there's a winner
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos1Val = buttons[pattern[0]].innerText;
        let pos2Val = buttons[pattern[1]].innerText;
        let pos3Val = buttons[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val); 
            return true; 
        }
    }
    return false; 
};

/* jsy he newGame ke button ko click krn gy, resetGame ka function trigger hojye ga */
newGame.addEventListener("click", resetGame);

/* same thing for reset button */
reset.addEventListener("click", resetGame);

