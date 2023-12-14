// 포인터 컨트롤러
// index.html 에서 press enter 문구가 포인터 역할을 한다.
class PointerController {
    constructor() {
        this.pointer = null;
        this.currentParent = null;
    }

    // 포인터를 찾는 메서드
    findPointer() {
        this.pointer = document.getElementById("pointer")
        console.log(pointer);
    }

    // 현재 포인터가 가리키는 요소
    findPointerParent() {
        if (this.pointer) {
            this.currentParent = this.pointer.parentNode;
            console.log(this.currentParent);
        }
    }

    // 현재 포인터가 가리키는 li요소 스타일 변경 
    updateParentStyle() {
        this.findPointerParent();
        if (this.currentParent) {
            // 새로운 스타일 적용
            this.currentParent.style.boxShadow = "0 0 20px #fff, 0 0 10px rgb(227, 90, 155)";
        }
    }

    // 현재 포인터가 가리키는 요소아래에 있는 a태그에 접속
    enterGame() {
        if (this.currentParent) {
            this.currentParent.querySelector('a').click();
        }
    }

    // 포인터를 움직이는 메서드
    movePointer(key) {
        // 먼저 현재 포인터가 존재하는지 검사후
        // 포인터를 기준으로 다음요소와 이전요소를 찾는다.
        if (this.pointer) {
            const nextParent = this.currentParent.nextElementSibling;
            const previousParent = this.currentParent.previousElementSibling;

            // 키다운 시 포인터가 가리키고 있는 현재요소는 새로적용된 스타일이 무조건 삭제 되어야한다.
            if (key == 39 && nextParent) {
                this.currentParent.style.boxShadow = "";
                nextParent.appendChild(this.pointer);

            } else if (key == 37 && previousParent) {
                this.currentParent.style.boxShadow = "";
                previousParent.appendChild(this.pointer);

            } 
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
    const pointerController = new PointerController();
    pointerController.findPointer();
    pointerController.findPointerParent();
    pointerController.updateParentStyle(); // 좌우 키를 누를 때마다 스타일을 업데이트
    
    // 키보드 이벤트 등록
    document.addEventListener('keydown', function (event) {
        pointerController.findPointer();
        pointerController.findPointerParent();


        if (event.key === 'ArrowRight') {
            pointerController.movePointer(39);
            pointerController.updateParentStyle(); // 좌우 키를 누를 때마다 스타일을 업데이트

        }

        if (event.key === "ArrowLeft") {
            pointerController.movePointer(37);
            pointerController.updateParentStyle(); // 좌우 키를 누를 때마다 스타일을 업데이트

        }

        if (event.key === 'Enter' && pointerController.currentParent) {
            pointerController.enterGame();
        }
    });
});

