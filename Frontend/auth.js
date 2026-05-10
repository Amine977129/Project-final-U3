function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("../backend/register.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        if (data === "REGISTER OK") {
            window.location.href = "login.html";
        }
    });
}
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("../backend/login.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);

        if (data === "LOGIN OK") {
            window.location.href = "index.html";
        }
    });
}