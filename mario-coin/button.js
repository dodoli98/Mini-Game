class XController {
    constructor() {
        this.menuIcon = document.getElementsByClassName("menu-icon");
        this.all_line = document.getElementsByClassName("menu-icon__line");
        this.left_line = document.getElementsByClassName("menu-icon__line-left")
        this.right_line = document.getElementsByClassName("menu-icon__line-right")
        this.middle_line = document.getElementsByClassName("menu-icon__line-middle")
        this.setupEventListeners();

        // 알림창
        this.alter = document.getElementById("alter");

        // 회전 상태 초기화
        this.leftRotated = false;
        this.rightRotated = false;
        this.middleRotated = false;
        this.backgroundcolorChaged = false;
    }

    setupEventListeners() {
        document.addEventListener("click", (event) => this.handleDocumentClick(event));
    }

    handleDocumentClick(event) {
        // 여기서 원하는 동작을 수행
        console.log("Document Clicked!");

        // 이벤트 발생 요소가 메뉴 아이콘인지 확인
        const isMenuIcon = Array.from(this.menuIcon).some(icon => icon.contains(event.target));

        if (isMenuIcon) {
            // 라인 회전 및 배경색 변경
            // getElementsByClassName를 사용하여 HTMLCollection을 반환한다. 
            // HTMLCollection은 직접적으로 스타일을 변경할 수 있는 방법이 없다. 대신 반복문을 이용해 개별 라인에 대해 스타일을 변경해야 한다.
            for (let i = 0; i < this.all_line.length; i++) {
                this.all_line[i].style.backgroundColor = this.backgroundcolorChaged ? "white" : "white";
            }

            this.alter.style.left = this.backgroundcolorChaged ? "100%" : "0%";

            // 라인 회전
            this.left_line[0].style.transform = this.leftRotated ? "rotate(0deg)" : "translateX(1px) rotate(45deg)";
            this.right_line[0].style.transform = this.rightRotated ? "rotate(0deg)" : "translateX(-2px) rotate(45deg)";
            this.middle_line[0].style.transform = this.middleRotated ? "rotate(0deg)" : "rotate(-45deg)";



            // 회전 상태 토글
            // -Rotated 가 참이면 현재 돌아간 상태이므로 각도를 원래대로 되돌리고
            // 거짓이면 회전을 준다.
            this.backgroundcolorChaged = !this.backgroundcolorChaged;
            this.leftRotated = !this.leftRotated;
            this.rightRotated = !this.rightRotated;
            this.middleRotated = !this.middleRotated;
        } else {
            // 메뉴 아이콘이 아닌 다른 곳을 클릭한 경우
            console.log("Clicked outside Menu Icon");
        }
    }
    
}

// XController 인스턴스 생성
const xController = new XController();
