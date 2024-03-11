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

// 시간 표시
let timer = 0;

setInterval(function() {
    timer++; // 타이머를 1씩 증가시킵니다.
}, 1000); // 1000밀리초(1초)마다 함수가 호출됩니다.



// ------------------------------------------------------------------------------------------
// 캐릭터 생성
// 마리오 좌표
let x = 100;
let y = 255;
let run1, run2;

// 점프 이미지
let jumpImage;

// 현재 이미지 인덱스를 저장할 변수
let currentImageIndex = 0;
function loadImage() {
    run1 = new Image();
    run1.src = "run1.png";

    run2 = new Image();
    run2.src = "run2.png"; // 두 번째 이미지의 경로로 변경

    jumpImage = new Image();
    jumpImage.src = "jump.png";

    obstacle = new Image();
    obstacle.src = "obstacle.png";
}


//------------------------------------------------------------------------------------------------
// 점프 모션
// 점프 관련 변수
let isJumping = false;
let jumpHeight = 100;

// 점프 함수
function jump() {
    if (!isJumping) {
        isJumping = true;

        let jumpCount = 0;
        const jumpInterval = setInterval(function () {
            y -= 5; // 캐릭터를 위로 이동시킵니다.
            jumpCount += 5;

            if (jumpCount >= jumpHeight) { // 점프 높이에 도달하면
                clearInterval(jumpInterval); // 점프 애니메이션을 멈춥니다.

                const fallInterval = setInterval(function () {
                    y += 5;
                    if (y >= 255) {
                        y = 255;
                        isJumping = false;
                        clearInterval(fallInterval);
                    }
                }, 20); // 20ms마다 아래로 이동합니다.
            }
        }, 20); // 20ms마다 위로 이동합니다.
    }
}

// 키보드 이벤트 리스너 등록
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        jump(); // 스페이스 바를 누르면 점프 함수를 호출합니다.
    }
});


//--------------------------------------------------------------------------------------------
// 코인의 y좌표값은 255 혹은 310 
// 코인의 y좌표값은 255 혹은 310 
function randomValue() {
    return Math.random() < 0.5 ? 255 : 190;
}

// 장애물 리스트
let obstacleList = [];

// 장애물 생성 함수 (생성자 함수로 수정)
function Obstacle() {
    this.x = 730; // 장애물의 초기 x 좌표를 화면 오른쪽 끝으로 설정합니다.
    this.y = randomValue(); // 장애물의 초기 y 좌표를 코인의 y 좌표값으로 설정합니다.

    // 장애물 업데이트 메서드
    this.update = function () {
        this.x -= 6; // 장애물을 왼쪽으로 이동시킵니다.
        if (this.x < -50) { // 장애물이 화면 왼쪽으로 벗어나면
            obstacleList.shift(); // 리스트에서 제거합니다.
        }

        // 장애물과 캐릭터의 충돌 감지
        if (this.x < x + 30 && this.x + 30 > x &&
            this.y < y + 30 && this.y + 30 > y) {
            // 충돌 발생: 게임 오버 처리
            console.log("gameover");
            isGameOver = true;
        }

    };

    let obstacleCollided = false; // 충돌 여부를 추적하는 변수

    this.checkJump = function () {
        if (!obstacleCollided) { // 충돌하지 않았을 때만 확인
            for (let i = 0; i < obstacleList.length; i++) {
                // 장애물의 x 좌표가 캐릭터의 x 좌표를 넘어가면
                if (obstacleList[i].x < x) {
                    // 충돌 여부를 true로 설정하고 점수를 증가시킵니다.
                    obstacleCollided = true;
                    break; // 한 번 충돌 처리 후 더 이상 확인하지 않습니다.
                }
            }
        }
    }


}

// 인터벌 함수
function createObstacle() {
    const interval = setInterval(function () {
        let e = new Obstacle(); // Obstacle 생성자 함수로 객체를 생성합니다.
        obstacleList.push(e); // 생성된 객체를 리스트에 추가합니다.
    }, 1000)
}

// 장애물 위치 업데이트 함수
function updateObstacles() {
    for (let i = 0; i < obstacleList.length; i++) {
        obstacleList[i].update(); // 모든 장애물을 업데이트합니다.
        obstacleList[i].checkJump();

    }
}



//----------------------------------------------------------------------------------
function update() {
    // 장애물 좌표 업데이트
    for (let i = 0; i < obstacleList.length; i++) {
        obstacleList[i].update();
        obstacleList[i].checkJump();
    }
}
function render() {
    // 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // 캐릭터 그리기
    if (isJumping) {
        ctx.drawImage(jumpImage, x, y); // 점프 중인 경우 jump.png 이미지를 그립니다.
    } else if (currentImageIndex === 0) {
        ctx.drawImage(run1, x, y); // 첫 번째 이미지를 그립니다.
    } else {
        ctx.drawImage(run2, x, y); // 두 번째 이미지를 그립니다.
    }

    // 장애물
    for (let i = 0; i < obstacleList.length; i++) {
        ctx.drawImage(obstacle, obstacleList[i].x, obstacleList[i].y);
    }

    ctx.fillText('Timer : ' + timer, 20, 20);
    ctx.font = "italic bold 15px Arial, sans-serif"; //Arial서체 없을 경우, sans-serif 적용

    // 땅을 그리는 코드
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(730, 300);
    ctx.stroke();
}




function main() {
    if (!isGameOver){
        updateObstacles();
        render();
        requestAnimationFrame(main);

    } else {
        ctx.textAlign = "center";
        ctx.font = "italic bold 50px Arial, sans-serif"; //Arial서체 없을 경우, sans-serif 적용
 
        ctx.fillText("GAME OVER", 365, 185);
        ctx.strokeText("GAME OVER", 365, 185);
    }
}

// 이미지를 변경하는 함수
function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % 2; // 0과 1을 번갈아가며 변경합니다.
}

// 페이지 로드 시 실행되는 함수
function initialLoad() {
    loadImage();
    createObstacle();
    setInterval(changeImage, 500); // 500ms마다 이미지를 변경합니다. (0.5초)
    main();
}


// 페이지 로드 시 초기 함수 호출
document.addEventListener("DOMContentLoaded", initialLoad);



// 버튼 --------------------------------------------------------------------------------
reloadButton = document.getElementById("button_wrapper").querySelector("button");

// 페이지를 다시 로드하는 함수
function reloadPage() {
    location.reload(true); // true를 전달하여 서버로부터 새로운 콘텐츠를 가져옵니다.
}

// 버튼 클릭 이벤트에 함수 연결
reloadButton.addEventListener("click", reloadPage);
