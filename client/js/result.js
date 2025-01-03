const urlParams = new URLSearchParams(window.location.search);
const correct = urlParams.get('correct');
const total = urlParams.get('total');

document.getElementById('correct').innerText = `${correct} of ${total} CORRECT`;
document.getElementById('duration').innerText = `Duration: 2:35 Min`; // Example static duration

function newGame() {
    location.href = "start.html";
}
