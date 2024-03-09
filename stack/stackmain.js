/**
 *  상자 만들기 상자의 크기는 게임 진행도에 따라 달라진다.
 *  stack 알고리즘 사용해보기
 *  상자가 내려오는 위치는 랜덤한 x 좌표를 갖는다.
 *  상자는 좌우로 움직일수 있다.
 *  상자는 3개정도 맨아래에 미리 스택에 추가해 화면 가운데 위치시킨다
 *  상자가 아래 쌓인 상자에 닿으면 점수가 오르고 면적이 맞닿은 부분만 남는다.
 *  상자가 맞닿은 부분이 없으면 게임종료
 *  상자가 스택에 샇인후에 다음상자 생성한다.
 *  
 */

// 캔버스 세팅 
let canvas;
let ctx;

// 컨텐츠 영역
var contentBody = document.getElementById("game");
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
contentBody.appendChild(canvas);

// 게임오버
let isGameOver = false; // true가 되면 게임 오버

// 점수 판
let score = 0;

// 상자의 크기
const boxHeight = 20; 
const boxWidth = 100;

// 상자의 x좌표값은 랜덤
function randomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min)) + min;
    return randomNum;
}

// 상자 리스트 (stack)
const stack = [];

function makeBox() {
    this.x = 0;
    this.y = 0;
    this.width = 100; // 상자의 가로 길이
    this.height = 20;

    this.init = function () {
        this.y = 0;
        this.x = randomValue(0, canvas.width - this.width);
        stack.push(this);
    }

    this.update = function () {
        // 떨어지는 속도
        this.y += 4;

        if (this.y >= canvas.height - 20) {
            this.y = canvas.height - 20; // 바닥에 닿았을 때 y 값을 바닥 높이로 고정
            stack.push(this); // 바닥에 닿으면 쌓이도록 stack에 추가

            // 점수 계산
            this.checkScore();
        }
    }

    this.checkScore = function () {
        // 상자의 바닥 면적 계산 (가로 길이를 기준으로)
        const boxBottomArea = this.width * 20; 

        // 점수 쌓기
        score += boxBottomArea;

        // 상자가 쌓인 높이에 따라 stack의 각 상자의 y 값을 조절
        for (let i = 0; i < stack.length; i++) {
            stack[i].y -= boxBottomArea;
        }
    }
}


// 인터벌 함수
function createBox() {
    const interval = setInterval(function () {
        let e = new makeBox();
        e.init();
    }, 1000)
}


// 방향키에 따라 상자의 x좌표값이 변함
let keysDown = {};
function keyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
    });
}

function update() {
    for (let i = 0; i < stack.length; i++) {
        stack[i].update();
    }
}

function render() {
    // 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 점수 표시
    ctx.font = "italic bold 15px Arial, sans-serif";
    ctx.fillText('SCORE: ' + score, 20, 20);

    // 상자 그리기
    for (let i = 0; i < stack.length; i++) {
        ctx.fillStyle = '#3498db';
        ctx.fillRect(stack[i].x, stack[i].y, stack[i].width, stack[i].height);
        ctx.strokeStyle = '#2980b9';
        ctx.strokeRect(stack[i].x, stack[i].y, stack[i].width, stack[i].height);
    }
}

function main() {
    if (!isGameOver) {
        update();
        render();
        requestAnimationFrame(main);
    } else {
        ctx.textAlign = "center";
        ctx.font = "italic bold 50px Arial, sans-serif";
        ctx.fillText("GAME OVER", 200, 180);
        ctx.strokeText("GAME OVER", 200, 180);
    }
}

// 페이지 로드 시 실행되는 함수
function initialLoad() {
    keyboardListener();
    createBox(); // createBox 함수 호출을 추가
    main();
}

initialLoad(); // 초기 로드 시 함수 호출을 추가

