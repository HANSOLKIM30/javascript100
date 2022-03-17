import App from "./App.js";

// 컴포넌트 계층분리
// root - index.js 하위 계층의 컴포넌트들을 import
import './pages/index.js';
import './components/index.js';

customElements.define('naver-order-app', App);
