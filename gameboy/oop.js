// 포인터 컨트롤러
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
            console.log(this.currentParent)
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

            if (key === 'down' && nextParent) {
                nextParent.appendChild(this.pointer);
                console.log("핸재요소", this.currentParent);
                console.log("다음요소", nextParent);

                nextParent.className = "pointer_parent";
                this.currentParent.className = "nonPoint_parent";

            } else if (key === 'up' && previousParent) {
                previousParent.appendChild(this.pointer);
                console.log("이전요소", previousParent);

                previousParent.className = "pointer_parent";
                this.currentParent.className = "nonPoint_parent";

            } 
        }
    }
}


class ButtonStyle {
    constructor() {
        this.upKey = document.getElementById("upKey");
        this.downKey = document.getElementById("downKey");
        this.aKey = document.getElementById("apKey");

         // 버튼에 클릭 이벤트 추가
         this.upKey.addEventListener("click", () => this.changeButtonStyle('up'));
         this.downKey.addEventListener("click", () => this.changeButtonStyle('down'));
    }

    changeButtonStyle(key) {
        // 모든 버튼에서 'pressed' 클래스 제거
        this.upKey.classList.remove('pressed');
        this.downKey.classList.remove('pressed');

        // 눌린 버튼에 'pressed' 클래스 추가
        if (key === 'down') {
            this.downKey.classList.add('pressed');
        } else if (key === 'up') {
            this.upKey.classList.add('pressed');
        }

        // 0.5초 후에 스타일 초기화
        setTimeout(() => {
            this.upKey.classList.remove('pressed');
            this.downKey.classList.remove('pressed');
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const pointerController = new PointerController();
    const buttonStyle = new ButtonStyle();

    // 키보드 이벤트 등록
    document.addEventListener('keydown', function (event) {
        pointerController.findPointer();
        pointerController.findPointerParent();

        if (event.key === 'ArrowUp') {
            pointerController.movePointer('up');
            buttonStyle.changeButtonStyle('up')
        }

        if (event.key === 'ArrowDown') {
            pointerController.movePointer('down');
            buttonStyle.changeButtonStyle('down')
        }

        if (event.key === 'Enter' && pointerController.currentParent) {
            pointerController.enterGame();
        }
    });
});

