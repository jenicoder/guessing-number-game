//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, "Correct!"
//랜덤번호가 < 유저번호 "Down!"
//랜덤번호가 > 유저번호 "UP!""
//Reset번호를 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable) (go버튼을 한번 클릭할때마다 기회가 줄어든다)
//유저가 1~100범위 밖의 숫자를 입력하면 알려준다. 기회를 깎진않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회를 깎지않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button"); //html에서 지정한 id 값 가져오는 법
let userInput = document.getElementById("user-input");
let resultBox = document.getElementById("result-box");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceBox = document.getElementById("chance-box");
let history = []; //유저가 지금까지 어떤 번호를 적었는지 배열에 담기
//addEventLister: 이벤트 더해주는 법
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; //Math.random()함수는 숫자를 무작위로 골라주는 함수다.
  //0부터 1미만 사이에있는 랜덤한숫자(소숫점 많음)이라 곱하기 100을 해주고 +1을 해서 100도 포함하게 만들기
  //Math.floor()함수는 소숫점을 버려주는 함수
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value; //userInput값을 userValue 변수에 넣어주기

  if (userValue < 1 || userValue > 100) {
    resultBox.textContent = "please enter number between 1 to 100";
    return; //return으로 종료시키고 chances-- 안하게. 기회안깎을거니까
  }

  if (history.includes(userValue)) {
    resultBox.textContent =
      "You already entered this number. Please enter another number";
    return;
  }
  chances--; //play라는 버튼을 누를때마다 chances가 한번씩 줄어든다
  chanceBox.textContent = `Your remain chance:  ${chances}`;
  console.log("chances", chances);

  if (userValue < computerNum) {
    resultBox.textContent = "UP!!"; //textContent는 문자열로 반환하는것
  } else if (userValue > computerNum) {
    resultBox.textContent = "DOWN!";
  } else {
    resultBox.textContent = "Correct!";
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  //user input창이 개끗하게 정리됨
  userValue = "";
  //새로운 번호 생성
  pickRandomNum();
  //"new game"이라고 알려주기
  resultBox.textContent = "New game began!";
}

pickRandomNum();
