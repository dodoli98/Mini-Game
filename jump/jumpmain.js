// 캔버스 세팅 
let canvas;
let ctx;

// 컨텐츠 영역
var contentBody = document.getElementById("game");
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d")
canvas.width = 730;
canvas.height = 370;
contentBody.appendChild(canvas);

// 게임오버
let isGameOver = false; // true가 되면 게임 오버
// 점수 판
let score = 0;

// 캐릭터가 점프를 하면 y좌표가 늘어난다.
// 랜덤으로 생성되는 장애물을 생성
// 시간이 흐름에 따라 난이도가 증가하게 만들기
// 캐릭터가 나무와 맞닿으면 게임오버
// 나무가 캐릭터의 좌표를 넘어가고 게임오버가 되지 않으면 점수가 1점씩 증가



// 캐릭터 생성
// 마리오 좌표
let x = 100;
let y = 255;
let run1, run2;
// 현재 이미지 인덱스를 저장할 변수
let currentImageIndex = 0; 
function loadImage() {
    run1 = new Image();
    run1.src = "run1.png";

    run2 = new Image();
    run2.src = "run2.png"; // 두 번째 이미지의 경로로 변경
}

// 리스너를 생성해 점프모션을 넣어준다.


// 장애물 리스트
let obstacleList = [];

// 장애물 생성 
function makeObstacle() {
    this.x = 740;
    this.y = 300;
    this.init = function () {
        this.y = 300;
        coinList.push(this);
    }
    this.update = function () {
        this.y += 6;

        if (this.y >= canvas.height - 48) {
            isGameOver = true;
            console.log("gameover");
        }
    }

}


// 인터벌 함수
function createObstacle() {
    const interval = setInterval(function () {
        let e = new makeObstacle();
        e.init();
    }, 1000)
}

function render() {
    // 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if (currentImageIndex === 0) {
        ctx.drawImage(run1, x, y); // 첫 번째 이미지를 그립니다.
    } else {
        ctx.drawImage(run2, x, y); // 두 번째 이미지를 그립니다.
    }
    
     // 땅을 그리는 코드
     ctx.strokeStyle = '#000'; 
     ctx.beginPath(); 
     ctx.moveTo(0, 300); 
     ctx.lineTo(730, 300); 
     ctx.stroke(); 
}


function main() {
    render();
    requestAnimationFrame(main);
}

// 이미지를 변경하는 함수
function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % 2; // 0과 1을 번갈아가며 변경합니다.
}

// 페이지 로드 시 실행되는 함수
function initialLoad() {
    loadImage();
    main();
    setInterval(changeImage, 500); // 500ms마다 이미지를 변경합니다. (0.5초)
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
