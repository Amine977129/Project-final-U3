const boardSize = 5;
let turn = "X";
let squares = Array(boardSize * boardSize).fill("");
let board = document.getElementById("board");
let statu = document.getElementById("statu");
let selectedCell = null;


for (let i = 0; i < boardSize * boardSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.id = "item" + i;
    cell.addEventListener("click", () => play(cell));
    board.appendChild(cell);
}
alert("JS IS WORKING");
board.style.gridTemplateColumns = `repeat(${boardSize}, 60px)`;
fetch("backend/login.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: "test",
        password: "1234"
    })
})
.then(res => res.text())
.then(data => console.log(data));


function login() {
    fetch("../backend/login.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);

        if (data === "LOGIN OK") {
            window.location.href = "index.html";
        }
    });
}
function register() {
    alert("STEP 1 OK");

    fetch("../backend/register.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: "test",
            password: "123"
        })
    })
    .then(res => res.text())
    .then(data => {
        alert("SERVER: " + data);
    })
    .catch(err => {
        alert("ERROR: " + err);
    });
}
function play(cell) {
    let i = cell.dataset.index;

    if (squares[i] !== "") return;

    if (turn === "X") {
        squares[i] = "X";
        cell.textContent = "X";

        if (checkWinner()) return;

        turn = "O";
        statu.textContent = "Turn O (select + press O)";
    } else {
        selectedCell = cell;
    }
}

// O key
document.addEventListener("keydown", function(e) {
    if (turn === "O" && e.key.toLowerCase() === "o" && selectedCell) {
        let i = selectedCell.dataset.index;

        if (squares[i] === "") {
            squares[i] = "O";
            selectedCell.textContent = "O";

            if (checkWinner()) return;

            turn = "X";
            statu.textContent = "Turn X";
            selectedCell = null;
        }
    }
});


function end(num1, num2, num3, num4, num5, winner) {
    console.log("winner =", winner);

    statu.textContent = `Winner: ${winner}`;

    document.getElementById("item" + num1).style.background = "#00ff00";
    document.getElementById("item" + num2).style.background = "#00ff00";
    document.getElementById("item" + num3).style.background = "#00ff00";
    document.getElementById("item" + num4).style.background = "#00ff00";
    document.getElementById("item" + num5).style.background = "#00ff00";

    sendResult(winner); // ✔ إرسال للـ PHP

    setTimeout(() => location.reload(), 3000000000000);
}


function sendResult(winner) {
    fetch("../backend/save_game.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            result: winner
        })
    });
}


function checkWinner() {

    for (let r = 0; r < boardSize; r++) {
        let start = r * boardSize;

        if (
            squares[start] !== "" &&
            squares[start] === squares[start+1] &&
            squares[start] === squares[start+2] &&
            squares[start] === squares[start+3] &&
            squares[start] === squares[start+4]
        ) {
            let winner = squares[start];
            end(start, start+1, start+2, start+3, start+4, winner);
            return true;
        }
    }

    for (let c = 0; c < boardSize; c++) {
        if (
            squares[c] !== "" &&
            squares[c] === squares[c+5] &&
            squares[c] === squares[c+10] &&
            squares[c] === squares[c+15] &&
            squares[c] === squares[c+20]
        ) {
            let winner = squares[c];
            end(c, c+5, c+10, c+15, c+20, winner);
            return true;
        }
    }

    if (
        squares[0] !== "" &&
        squares[0] === squares[6] &&
        squares[0] === squares[12] &&
        squares[0] === squares[18] &&
        squares[0] === squares[24]
    ) {
        let winner = squares[0];
        end(0, 6, 12, 18, 24, winner);
        return true;
    }

    if (
        squares[4] !== "" &&
        squares[4] === squares[8] &&
        squares[4] === squares[12] &&
        squares[4] === squares[16] &&
        squares[4] === squares[20]
    ) {
        let winner = squares[4];
        end(4, 8, 12, 16, 20, winner);
        return true;
    }

    return false;
}

