

/* ================= GAME ================= */

const boardSize = 5;
let turn = "X";
let squares = Array(boardSize * boardSize).fill("");

let board = document.getElementById("board");
let statu = document.getElementById("statu");
let selectedCell = null;

/* 🔥 IMPORTANT FIX */
if (board && statu) {

    for (let i = 0; i < boardSize * boardSize; i++) {

        let cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.id = "item" + i;

        cell.addEventListener("click", () => play(cell));

        board.appendChild(cell);
    }

    board.style.gridTemplateColumns =
        `repeat(${boardSize}, 60px)`;
}

/* ================= PLAY ================= */

function play(cell) {
    let i = cell.dataset.index;

    if (squares[i] !== "") return;

    if (turn === "X") {
        squares[i] = "X";
        cell.textContent = "X";

        if (checkWinner()) return;

        turn = "O";
        if (statu) statu.textContent = "Turn O";
    } else {
        selectedCell = cell;
    }
}

/* ================= O KEY ================= */

document.addEventListener("keydown", function (e) {
    if (turn === "O" && e.key.toLowerCase() === "o" && selectedCell) {

        let i = selectedCell.dataset.index;

        if (squares[i] === "") {
            squares[i] = "O";
            selectedCell.textContent = "O";

            if (checkWinner()) return;

            turn = "X";
            if (statu) statu.textContent = "Turn X";
            selectedCell = null;
        }
    }
});

/* ================= END ================= */

function end(a, b, c, d, e, winner) {

    if (statu) statu.textContent = "Winner: " + winner;

    document.getElementById("item" + a).style.background = "green";
    document.getElementById("item" + b).style.background = "green";
    document.getElementById("item" + c).style.background = "green";
    document.getElementById("item" + d).style.background = "green";
    document.getElementById("item" + e).style.background = "green";

    sendResult(winner);

    setTimeout(() => location.reload(), 3000);
}

/* ================= SAVE ================= */

function sendResult(winner) {
    fetch("../backend/save_game.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: winner })
    });
}

/* ================= WIN CHECK ================= */

function checkWinner() {

    for (let r = 0; r < boardSize; r++) {
        let s = r * boardSize;

        if (
            squares[s] &&
            squares[s] === squares[s+1] &&
            squares[s] === squares[s+2] &&
            squares[s] === squares[s+3] &&
            squares[s] === squares[s+4]
        ) {
            end(s, s+1, s+2, s+3, s+4, squares[s]);
            return true;
        }
    }

    for (let c = 0; c < boardSize; c++) {
        if (
            squares[c] &&
            squares[c] === squares[c+5] &&
            squares[c] === squares[c+10] &&
            squares[c] === squares[c+15] &&
            squares[c] === squares[c+20]
        ) {
            end(c, c+5, c+10, c+15, c+20, squares[c]);
            return true;
        }
    }

    if (
        squares[0] &&
        squares[0] === squares[6] &&
        squares[0] === squares[12] &&
        squares[0] === squares[18] &&
        squares[0] === squares[24]
    ) {
        end(0, 6, 12, 18, 24, squares[0]);
        return true;
    }

    if (
        squares[4] &&
        squares[4] === squares[8] &&
        squares[4] === squares[12] &&
        squares[4] === squares[16] &&
        squares[4] === squares[20]
    ) {
        end(4, 8, 12, 16, 20, squares[4]);
        return true;
    }

    return false;
}