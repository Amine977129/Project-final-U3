const boardSize = 5;
let turn = "X";
let squares = Array(boardSize * boardSize).fill("");
let board = document.getElementById("board");
let statu = document.getElementById("statu"); // ✅ "status"
let selectedCell = null;

for (let i = 0; i < boardSize * boardSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.id = "item" + i;
    cell.addEventListener("click", () => play(cell));
    board.appendChild(cell);
}

board.style.gridTemplateColumns = `repeat(${boardSize}, 60px)`;

function play(cell) {
    let i = cell.dataset.index;
    if (squares[i] !== "") return;

    if (turn === "X") {
        squares[i] = "X";
        cell.textContent = "X";
        if (checkWinner()) return;
        turn = "O";
        statu.textContent = "Tour O (clique + O)";
    } else {
        selectedCell = cell;
    }
}

document.addEventListener("keydown", function(e) {
    if (turn === "O" && e.key.toLowerCase() === "o" && selectedCell) {
        let i = selectedCell.dataset.index;
        if (squares[i] === "") {
            squares[i] = "O";
            selectedCell.textContent = "O";
            if (checkWinner()) return;
            turn = "X";
            statu.textContent = "Tour X";
            selectedCell = null;
        }
    }
});

function end(num1, num2, num3, num4, num5, winner) {
    console.log("Gagnant =", winner);
    statu.textContent = `Gagnant: ${winner}`;

    // ✅ Colore les 5 cases gagnantes
    document.getElementById("item" + num1).style.background = "#00ff00";
    document.getElementById("item" + num2).style.background = "#00ff00";
    document.getElementById("item" + num3).style.background = "#00ff00";
    document.getElementById("item" + num4).style.background = "#00ff00";
    document.getElementById("item" + num5).style.background = "#00ff00";

    sendResult(winner);
    setTimeout(() => location.reload(), 3000); // ✅ 3 secondes
}

function checkWinner() {
    // Lignes
    for (let r = 0; r < boardSize; r++) {
        let start = r * boardSize;
        if (squares[start] !== "" && 
            squares[start] === squares[start+1] &&
            squares[start] === squares[start+2] &&
            squares[start] === squares[start+3] &&
            squares[start] === squares[start+4]) {
            let winner = squares[start];
            end(start, start+1, start+2, start+3, start+4, winner);
            return true;
        }
    }

    // Colonnes
    for (let c = 0; c < boardSize; c++) {
        if (squares[c] !== "" &&
            squares[c] === squares[c+5] &&
            squares[c] === squares[c+10] &&
            squares[c] === squares[c+15] &&
            squares[c] === squares[c+20]) {
            let winner = squares[c];
            end(c, c+5, c+10, c+15, c+20, winner);
            return true;
        }
    }

    // Diagonales ✅ CORRIGÉES
    if (squares[0] !== "" &&
        squares[0] === squares[6] &&
        squares[0] === squares[12] &&
        squares[0] === squares[18] &&
        squares[0] === squares[24]) {
        end(0, 6, 12, 18, 24, squares[0]);
        return true;
    }

    if (squares[4] !== "" &&
        squares[4] === squares[8] &&
        squares[4] === squares[12] &&
        squares[4] === squares[16] &&
        squares[4] === squares[20]) {
        end(4, 8, 12, 16, 20, squares[4]);
        return true;
    }

    return false;
}