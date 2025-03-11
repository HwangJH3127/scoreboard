let timer;
let totalSeconds = 70 * 60; // 1시간 10분 초기값
let homeScore = 0;
let guestScore = 0;
let homeSetScore = 0;
let guestSetScore = 0;

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    totalSeconds = 70 * 60;
    updateDisplay();
}

function updateTimer() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
    } else {
        clearInterval(timer);
        timer = null;
    }
}

function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    document.getElementById("timer").textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 점수 증가 함수
function increaseScore(team) {
    if (team === "home") {
        homeScore++;
        document.getElementById("home-score").textContent = homeScore;
        if (homeScore === 10) {
            homeSetScore++;
            document.getElementById("set-home").textContent = homeSetScore;
            homeScore = 0;
            document.getElementById("home-score").textContent = homeScore;
        }
    } else {
        guestScore++;
        document.getElementById("guests-score").textContent = guestScore;
        if (guestScore === 10) {
            guestSetScore++;
            document.getElementById("set-guests").textContent = guestSetScore;
            guestScore = 0;
            document.getElementById("guests-score").textContent = guestScore;
        }
    }
}

// 초기 화면 설정
updateDisplay();



// 모달
let currentTeam = ""; // 현재 선택된 팀 저장

function openModal(team) {
    currentTeam = team;
    let modal = document.getElementById("teamNameModal");
    modal.style.display = "flex"; // 클릭 시 모달 보이게
    let inputField = document.getElementById("teamNameInput");
    inputField.value = document.getElementById(team + "-name").innerText;
    inputField.focus();

    // 기존 이벤트 리스너 제거 후 새로 추가 (중복 방지)
    inputField.removeEventListener("keydown", handleEnterKey);
    inputField.addEventListener("keydown", handleEnterKey);
}

function closeModal() {
    document.getElementById("teamNameModal").style.display = "none"; // 닫기
}

function saveTeamName() {
    let newName = document.getElementById("teamNameInput").value.trim();
    if (newName === "") {
        newName = currentTeam === "home" ? "Home" : "Guests"; // 기본값 유지
    }
    document.getElementById(currentTeam + "-name").innerText = newName;
    closeModal();
}

// 엔터 키 입력 시 저장 후 닫기
function handleEnterKey(event) {
    if (event.key === "Enter") {
        saveTeamName();
    }
}

// ESC 키로 닫기 기능 추가
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});