import { html } from "lit";
import View from "../view";
import { fetchGetMenu } from "../api";

// REST Api 결과가 없을 것을 대비하여 기본 객체를 상수화.(적극적으로 활용해보기)
const DEFAULT_MENU = {
    "id": 1,
    "name": "음식이름",
    "reviewPoint": 0.0,
    "description": "불러오는 중",
    "price": 0,
    "orderCount": 0,
    "imageUrl": "https://ldb-phinf.pstatic.net/20200416_252/1587007251652svUkx_PNG/%C4%A5%B8%AE%BA%A3%C0%CC%C4%C1_%BF%FA%BA%BC.png?type=f220_220_60_sharpen",
    "pictures": [],
    "reviews": []
};

export default class DeatilPage extends View {
    constructor(orderTypeIndex, onSetOrderTypeIndex, onAddCartItem) {
        super();

        this.orderTypeIndex = orderTypeIndex;
        this.onSetOrderTypeIndex = onSetOrderTypeIndex;
        this.onAddCartItem = onAddCartItem;

        this.menu = DEFAULT_MENU;
        this.menuAmount = 1;
        this.isPopupOpen = false;
        
        // splice를 통해 마지막 요소 반환
        const [menuId] = location.pathname.split('/').splice(-1);
    
        fetchGetMenu(menuId).then((response) => (this.menu = response));
    }

    static get properties() {
        return {
            menu: { type: Object },
            menuAmount: { type: Number },
            isPopupOpen: { type: Boolean },
            orderTypeIndex: { type: Number },
        }
    }
   
    openOrderPopup() {
        this.isPopupOpen = true;
    }

    closeOrderPopup() {
        this.isPopupOpen = false;
    }

    onIncreaseAmount() {
        this.menuAmount = this.menuAmount + 1;
    }

    onDecreaseAmount() {
        if(this.menuAmount <= 1) {
            return;
        }
        this.menuAmount = this.menuAmount - 1;
    }

    getFinalPrice() {

    }

    render() {
        return html `
        <div class="container">
            <!-- 고정헤더영역 -->
            <order-header></order-header>
            <!-- // 고정헤더영역 -->

        <!-- 제품 상세설명 영역 -->
        <!-- 부분적용함수 bind를 통해 this를 해당 class로 지정하여 해당 메서드 내부의 this(ex. this.isPopupOpen)가 해당 class를 바라볼 수 있도록 지정 -->
        <menu-detail
            .menu=${this.menu}
            .orderTypeIndex=${this.orderTypeIndex}
            .menuAmount=${this.menuAmount}
            .onIncreaseAmount=${this.onIncreaseAmount.bind(this)}
            .onDecreaseAmount=${this.onDecreaseAmount.bind(this)}
            .openOrderPopup=${this.openOrderPopup.bind(this)}
        ></menu-detail>
        <!-- 제품 상세설명 영역 -->
        
        <!-- 주문자 리뷰 영역 -->
        <div class="menu-review-area">
            <!-- 주문자 사진 -->
            <div class="orderer-img-area">
                <div class="common-inner">
                    <div class="title">주문자 사진<span class="num">${this.menu.pictures.length}</span></div>
                    <div class="scroll-x">
                        <menu-picture-list .pictures=${this.menu.pictures}></menu-picture-list>
                    </div>
                </div>
            </div>
            <!-- // 주문자 사진 -->

            <!-- 주문자 리뷰 -->
            <div class="orderer-review-area">
                <div class="common-inner">
                    <div class="title">주문자 리뷰<span class="num">${this.menu.reviews.length}</span></div>
                    <review-list .reviews=${this.menu.reviews}></review-list>
                    <button class="btn-more">더보기</button>
                </div>
            </div>
            <!-- // 주문자 리뷰 -->
        </div>
        <!-- // 주문자 리뷰 영역 -->

        <!-- 옵션 팝업 영역 -->
        <option-popup 
            .menu=${this.menu} 
            .menuAmount=${this.menuAmount}
            .isPopupOpen=${this.isPopupOpen} 
            .closeOrderPopup=${this.closeOrderPopup.bind(this)}
            .onIncreaseAmount=${this.onIncreaseAmount.bind(this)}
            .onDecreaseAmount=${this.onDecreaseAmount.bind(this)}
        >
        </option-popup>
        <!-- // 옵션 팝업 영역 -->
    </div>
        `;
    }
}