const selectBox = document.querySelector(".main-div"),
selectXBtn = selectBox.querySelector(".player-X"),
selectOBtn = selectBox.querySelector(".player-O"),
gameDiv = document.querySelector(".game-div"),
allBox = document.querySelectorAll("section div"),
players = document.querySelector(".turns"),
resultBox = document.querySelector(".result-div"),
winner = resultBox.querySelector(".win-txt"),
replay = resultBox.querySelector("button");



window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        gameDiv.classList.add("show");
    }

    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        gameDiv.classList.add("show");
        players.setAttribute("class", "turns active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "fas fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWin();
    gameDiv.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomDelayTime);
}

function bot(runBot) {
    if(runBot){
        let array = [];
    playerSign = "O";
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0){
            array.push(i);
        }
    }
    let randomBox = array [Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
            players.classList.remove("active");
            playerSign = "X";
            allBox[randomBox].setAttribute ("id", playerSign);
        } else {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute ("id", playerSign);
        }
        selectWin();
    }
    allBox[randomBox].style.pointerEvents = "none";
    gameDiv.style.pointerEvents = "auto";
    playerSign = "X";
    }
}

function getClass(idname) {
    return document.querySelector(".box-" + idname).id;
}

function checkIdS(val1, val2, val3, sign) {
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWin(){
    if (checkIdS(1,2,3, playerSign) || checkIdS(4,5,6, playerSign) || checkIdS(7,8,9, playerSign) || checkIdS(1,4,7, playerSign) || checkIdS(2,5,8, playerSign) || checkIdS(3,6,9, playerSign) || checkIdS(1,5,9, playerSign) || checkIdS(3,5,7, playerSign)) {
        console.log(playerSign + " " + "Is The Winner!");
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            gameDiv.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        winner.innerHTML = `Player <p>${playerSign}</p> Won The Game!`;
    } else {
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                gameDiv.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
        winner.textContent = "Match Has Been Drawn!";
        }
    }
}

replay.onclick = ()=>{
    window.location.reload();
}