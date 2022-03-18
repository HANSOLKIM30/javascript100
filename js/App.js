// 웹 컴포넌트를 이용한 hello, world 출력
// 한 때 클래스 컴포넌트로 개발하던 react 환경과 비슷하게 느껴질 수도 있다. 

// import 시, 외부패키지 --> 내장파일 순서
import { html } from 'lit';
import View from './view.js';

export default class App extends View {
    // 생성자를 통해 부모를 호출
    constructor() {
        super();

        this.currentPage = 'menu';
        this.orderTypeIndex = 0;    // 전 페이지에 걸쳐 쓰일 수 있으므로 App class에 선언

        // onPopState: 같은 document에 관한 두개의 히스토리 엔트리에 변화가 일어날 때마다, popstate event가 window 객체에 붙게 된다.
        window.onpopstate = () => {
            const [, page] = location.pathname.split('/');  // url의 두번째 인자를 뽑아오기
            this.currentPage = page;
        } 
    }

    // 일종의 상태 만들기(전역변수, reduces를 흉내내는 observer, proxy와 같은 것.)
    // static get properties 이용하기
    static get properties() {
        return {
            currentPage: { type: String },
            orderTypeIndex : { type: Number },
        }
    }

    // ***라우팅 구현***
    route() {
        switch (this.currentPage) {
            case 'detail' :
                console.log(this.orderTypeIndex);
                return html`
                <detail-page .orderTypeIndex ${this.orderTypeIndex}></detail-page>
                `;
            default:
                return html ` 
                <menu-page></menu-page>
                `;
        }
    }

    // 패키지에서 가져온 html을 이용
    render() {
        return this.route();
    }
}