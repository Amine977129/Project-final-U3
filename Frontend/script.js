const boardSize = 5;
let turn = "X";
let squares = Array(boardSize * boardSize).fill(""); 
let board = document.getElementById("board");
let statu = document.getElementById("statu");
let selectedCell = null; // pour joueur O

// Création du plateau
for (let i = 0; i < boardSize * boardSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.id = "item" + i; // pour la fonction end()
    cell.addEventListener("click", () => play(cell));
    board.appendChild(cell);
}
board.style.gridTemplateColumns = `repeat(${boardSize}, 60px)`;

// Joueur clique
function play(cell) {
    let i = cell.dataset.index;

    if (squares[i] !== "") return;

    if (turn === "X") {
        squares[i] = "X";
        cell.textContent = "X";

        if (checkWinner()) return;
        
        turn = "O";
        statu.textContent = "Turno del jugador O (clic y luego tecla O)";
    } else if (turn === "O") {
        selectedCell = cell;
    }
}

// Joueur O appuie sur touche "O"
document.addEventListener("keydown", function(e) {
    if (turn === "O" && e.key.toLowerCase() === "o" && selectedCell !== null) {
        let i = selectedCell.dataset.index;

        if (squares[i] === "") {
            squares[i] = "O";
            selectedCell.textContent = "O";

            if (checkWinner()) return;

            turn = "X";
            statu.textContent = "Turno del jugador X";
            selectedCell = null;
        }
    }
});

// Fonction pour surligner les cases gagnantes
function end(num1, num2, num3, num4, num5, winner) {
    statu.textContent = `the winner is : ${winner}!`;

    document.getElementById("item" + num1).style.background = "#00ff00";
    document.getElementById("item" + num2).style.background = "#00ff00";
    document.getElementById("item" + num3).style.background = "#00ff00";
    document.getElementById("item" + num4).style.background = "#00ff00";
    document.getElementById("item" + num5).style.background = "#00ff00";

    setTimeout(() => location.reload(), 3000);
    fetch("backend/save_game.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        result: winner
    })
});
}

// Vérification du gagnant
function checkWinner() {
    // Lignes
    for (let r = 0; r < boardSize; r++) {
        let start = r * boardSize;

        if (squares[start] !== "" &&
            squares[start] === squares[start+1] &&
            squares[start] === squares[start+2] &&
            squares[start] === squares[start+3] &&
            squares[start] === squares[start+4]) {
            end(start, start+1, start+2, start+3, start+4, squares[start]); 
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
             end(c, c+5, c+10, c+15, c+20, squares[c]);
            return true;
        }
    }

    // Diagonale principale
    if (squares[0] !== "" &&
        squares[0] === squares[6] &&
        squares[0] === squares[12] &&
        squares[0] === squares[18] &&
        squares[0] === squares[24]) {
                    end(0, 6, 12, 18, 24, squares[0]);

        return true;
    }

    // Diagonale inverse
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