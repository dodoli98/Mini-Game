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

// 마리오 좌표
let x = canvas.width / 2 - 25;
let y = canvas.height - 50;


// 게임오버
let isGameOver = false; // true가 되면 게임 오버


// 점수 판
let score = 0;

// 코인의 x좌표값은 랜덤
function randomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min)) + min;
    return randomNum;
}

// 코인 리스트
let coinList = [];
// 코인 만들기
function makeCoin() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.y = 0;
        this.x = randomValue(0, canvas.width - 48);
        coinList.push(this);
    }
    this.update = function () {
        this.y += 6;

        if (this.y >= canvas.height - 48) {
            isGameOver = true;
            console.log("gameover");
        }
    }

    this.checkCollect = function () {
        // // 코인이 마리오의 y좌표보다 큰지, 마리오의 x좌표 사이에 들어오는지 검사
        // if (this.y <= y && this.x >= x && this.x <= x + 50) {
        //     score++;
        //     // 점수가 오르고 코인리스트에 있는 i번째에 있는 코인 한개를 잘라낸다.
        //     coinList.splice(i, 1);
        // }

        let coinsToRemove = []; // 삭제할 코인을 기록하는 배열

        for (let i = 0; i < coinList.length; i++) {
            // 코인의 하단이 마리오의 상단보다 높거나 같고, 코인의 상단이 마리오의 하단보다 낮거나 같을 때
            if (
                coinList[i].y + coin.height >= y &&
                coinList[i].y <= y + mario.height &&
                coinList[i].x + coin.width >= x &&
                coinList[i].x <= x + 50
            ) {
                score++;
                console.log(score);
                coinList.splice(i, 1);
            }
        }
    }
}

// 인터벌 함수
function createCoin() {
    const interval = setInterval(function () {
        let e = new makeCoin();
        e.init();
    }, 1000)
}

// 이미지 세팅
let mario, coin;
function loadImage() {
    mario = new Image();
    mario.src = "mario.png";

    coin = new Image();
    coin.src = "coin.png";
}


// 방향키를 누르면 마리오의 좌표가 변함
// 그후 렌더를 계속해줌
let keysDown = {};
function keyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
        console.log("키다운객체에들어간값은?", keysDown);
    })
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
        console.log("없음");
    })
}

function update() {
    if (39 in keysDown) {
        x += 5;
    }
    if (37 in keysDown) {
        x -= 5;
    }
    // 최대 넓이를 벗어나면 최대 넓이로 조정
    if (x <= 0) {
        x = 0;
    }

    // 이미지 사이즈가 50px 이기때문에 캔버스 사이즈에서 50px만큼 빼주어야 한다.
    if (x >= canvas.width - 50) {
        x = canvas.width - 50;
    }

    // 코인 좌표 업데이트
    for (let i = 0; i < coinList.length; i++) {
        coinList[i].update();
        coinList[i].checkCollect();
    }
}

function render() {
    // 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 이미지 그리기
    ctx.drawImage(mario, x, y);
    ctx.fillText('SCORE: '+ score, 20, 20);
    ctx.font = "italic bold 15px Arial, sans-serif"; //Arial서체 없을 경우, sans-serif 적용
    for (let i = 0; i < coinList.length; i++) {
        ctx.drawImage(coin, coinList[i].x, coinList[i].y);
    }
}


// 메인함수에서 계속해서 main함수와 render함수를 호출해야함
// 웹 게임은 계속해서 이미지를 렌더해야 하기 때문
function main() {
    if (!isGameOver) {
        update();
        render();
        requestAnimationFrame(main);
    } else {
        ctx.textAlign = "center";
        ctx.font = "italic bold 50px Arial, sans-serif"; //Arial서체 없을 경우, sans-serif 적용

        ctx.fillText("GAME OVER", 200, 180);
        ctx.strokeText("GAME OVER", 200, 180);
    }
}


// loadImage();
// keyboardListener();
// createCoin();
// main();

// 페이지 로드 시 실행되는 함수
function initialLoad() {
    loadImage();
    keyboardListener();
    createCoin();
    main();
}


// 페이지 로드 시 초기 함수 호출
document.addEventListener("DOMContentLoaded", initialLoad);




reloadButton = document.getElementById("button_wrapper").querySelector("button");

// 페이지를 다시 로드하는 함수
function reloadPage() {
    location.reload(true); // true를 전달하여 서버로부터 새로운 콘텐츠를 가져옵니다.
}

// 버튼 클릭 이벤트에 함수 연결
reloadButton.addEventListener("click", reloadPage);
