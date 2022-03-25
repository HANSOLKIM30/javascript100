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
        this.cartItems = [];
        this.firstVisit = true;

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
            orderTypeIndex: { type: Number },
            cartItems: { type: Array },
            firstVisit: { type: Boolean },
        }
    }

    onSetFirstVisit() {
        if(this.firstVisit === true) {
            this.firstVisit = false;
        }
    }

    // 주문타입에 대한 index(orderTypeIndex)를 모든 페이지가 공유
    onSetOrderTypeIndex(orderTypeIndex) {
        this.orderTypeIndex = orderTypeIndex;
        this.onSetFirstVisit();
    }

    // 장바구니 정보: 모든 페이지가 공유
    onAddcartItem(item) {
        const newCartItems = [ ...this.cartItems ]
        newCartItems.push(item);
        this.cartItems = newCartItems;

        // 메뉴페이지로 돌아가기
        history.pushState(null, null, '/');
        dispatchEvent(new PopStateEvent('popstate'));
    }

    // ***라우팅 구현***
    route() {
        switch (this.currentPage) {
            case 'detail' :
                return html`
                <detail-page 
                    .orderTypeIndex=${this.orderTypeIndex}
                    .onSetOrderTypeIndex=${this.onSetOrderTypeIndex.bind(this)}
                    .onAddCartItem=${this.onAddcartItem.bind(this)}
                >
                </detail-page>
                `;
            case 'order' :
                return html`
                <order-page 
                    .cartItem=${this.cartItem}
                    .onDeleteCartItem=${console.log}
                >
                </order-page>
                `;
            default:
                return html ` 
                <menu-page
                    .orderTypeIndex=${this.orderTypeIndex}
                    .onSetOrderTypeIndex=${this.onSetOrderTypeIndex.bind(this)}
                    .cartItems=${this.cartItems}
                    .firstVisit=${this.firstVisit}
                ></menu-page>
                `;
        }
    }

    // 패키지에서 가져온 html을 이용
    render() {
        return this.route();
    }
}