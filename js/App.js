// 웹 컴포넌트를 이용한 hello, world 출력
// 한 때 클래스 컴포넌트로 개발하던 react 환경과 비슷하게 느껴질 수도 있다. 

// import 시, 외부패키지 --> 내장파일 순서
import { html } from 'lit';
import View from './view.js';

export default class App extends View {
    // 생성자를 통해 부모를 호출
    constructor() {
        super();
    }

    // 일종의 상태 만들기(전역변수, reduces를 흉내내는 observer, proxy와 같은 것.)
    // static get properties 이용하기
    static get properties() {
        return {
        }
    }

    // Root를 렌더함.
    createRenderRoot() {
        return this;
    }

    // 패키지에서 가져온 html을 이용
    render() {
        // @ + event type ==> 이벤트 등록 가능
        return html`
        <div className="container">
            <!-- Header.js에서 정의한 Web Component를 재활용 -->
            <!-- <order-header></order-header> -->
            <menu-page></menu-page>
        </div>`;
    }
}