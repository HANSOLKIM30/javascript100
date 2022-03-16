// 웹 컴포넌트를 이용한 hello, world 출력

import { html, LitElement } from 'lit'

export default class App extends LitElement {
    // 생성자를 통해 부모를 호출
    constructor() {
        super();
    }
    // Root를 렌더함.
    createRenderRoot() {
        return this;
    }

    // 패키지에서 가져온 html을 이용
    render() {
        return html`<h1>Hello World</h1>`;
    }
}