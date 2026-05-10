
/* ================= GAME ================= */

console.log("NEW SCRIPT LOADED ✔");

const boardSize = 5;
let turn = "X";

let squares = Array(boardSize * boardSize).fill("");

let board = document.getElementById("board");
let statu = document.getElementById("statu");
let selectedCell = null;

/* ================= CREATE BOARD ================= */

if (board) {

    for (let i = 0; i < boardSize * boardSize; i++) {

        let cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.id = "item" + i;

        cell.addEventListener("click", () => play(cell));

        board.appendChild(cell); // ✅ FIX IMPORTANT
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

        if (statu) statu.textContent = "Turn O (press O key)";

    } else {

        selectedCell = cell;
    }
}

/* ================= O KEY ================= */

document.addEventListener("keydown", function (e) {

    if (turn === "O" &&
        e.key.toLowerCase() === "o" &&
        selectedCell) {

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

/* ================= END GAME ================= */

function end(a, b, c, d, e, winner) {

    if (statu) {
        statu.textContent = "Winner: " + winner;
    }

    [a, b, c, d, e].forEach(i => {
        document.getElementById("item" + i).style.background = "green";
    });

    setTimeout(() => {
        location.reload();
    }, 3000);
}

/* ================= CHECK WINNER ================= */

function checkWinner() {

    /* ROWS */
    for (let r = 0; r < boardSize; r++) {

        let s = r * boardSize;

        if (
            squares[s] &&
            squares[s] === squares[s+1] &&
            squares[s] === squares[s+2] &&
            squares[s] === squares[s+3] &&
            squares[s] === squares[s+4]
        ) {
            end(s,s+1,s+2,s+3,s+4,squares[s]);
            return true;
        }
    }

    /* COLUMNS */
    for (let c = 0; c < boardSize; c++) {

        if (
            squares[c] &&
            squares[c] === squares[c+5] &&
            squares[c] === squares[c+10] &&
            squares[c] === squares[c+15] &&
            squares[c] === squares[c+20]
        ) {
            end(c,c+5,c+10,c+15,c+20,squares[c]);
            return true;
        }
    }

    /* DIAGONAL 1 */
    if (
        squares[0] &&
        squares[0] === squares[6] &&
        squares[0] === squares[12] &&
        squares[0] === squares[18] &&
        squares[0] === squares[24]
    ) {
        end(0,6,12,18,24,squares[0]);
        return true;
    }

    /* DIAGONAL 2 */
    if (
        squares[4] &&
        squares[4] === squares[8] &&
        squares[4] === squares[12] &&
        squares[4] === squares[16] &&
        squares[4] === squares[20]
    ) {
        end(4,8,12,16,20,squares[4]);
        return true;
    }

    return false;
}