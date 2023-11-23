/**
초기에 클래스는 첫번째 p요소에 있음

키다운시 
1. 포인터를 찾아서 다음 포인터의 부모요인 p 아래로 appendchild시킬것
2. 그와 동시에 첫번째 p요소의 클래스를 다시 설정해줄것
 */

// 함수 호출시 마다 값을 재할당하므로 let변수 설정
let pointer;
let currentParent;



// 포인터를 찾는 함수
function findPointer() {
    pointer = document.getElementById("pointer");
}

// 포인터의 부모요소 p를 찾는 함수
function findPointerParent() {
    currentParent = pointer.parentNode;
}

// movePointerDown
// 다음부모요에 pointer를 appenchild시키고 클래스이름을 pointer_parent로 지정
// 이전 부모요의 클래스 이름은 nonPoint_parent로 지정
function movePointerDown() {
    // 부모 다음요소를 찾기
    const nextParent = currentParent.nextElementSibling;

    if (nextParent) {
        nextParent.appendChild(pointer);

        currentParent.className = "nonPoint_parent";
        nextParent.className = "pointer_parent";
    }
}


// movePointerUp
function movePointerUp() {
    // 이전 요소 찾기
    const previousParent = currentParent.previousElementSibling;

    if (previousParent) {
        previousParent.appendChild(pointer);

        currentParent.className = "nonPoint_parent";
        previousParent.className = "pointer_parent";
    }

}

// 엔터 키
function enterGame() {
    findPointerParent();

    if (currentParent) {
        currentParent.querySelector('a').click();
    }

}


document.addEventListener('DOMContentLoaded', function () {
    // DOM 구축이 완료된 후에 실행할 코드

    // 버튼요소
    const upKey = document.getElementById("upKey");
    const downKey = document.getElementById("downKey");
    const aKey = document.getElementById("aKey");

    // 포인터와 포인터의 부모를 찾는 함수 호출
    findPointer();
    console.log(pointer);

    findPointerParent();
    console.log(currentParent);


    document.addEventListener('keydown', function (event) {
        findPointer();
        console.log(pointer);

        findPointerParent();
        console.log(currentParent);

        // 아래 방향키
        if (event.key === 'ArrowDown') {
            // 1. 포인터를 찾기
            findPointer();
            console.log(pointer);

            // 2. 포인터의 부모요소 찾기
            findPointerParent();
            console.log(currentParent);

            // 3. 기능실행
            movePointerDown();

       
        }

        // 위 방향키
        if (event.key === 'ArrowUp') {
            findPointer();
            console.log(pointer);

            findPointerParent();
            console.log(currentParent);

            movePointerUp();
        }

        // 엔터 키
        if (window.event.keyCode == 13) {
            enterGame();
        }

    });

});

