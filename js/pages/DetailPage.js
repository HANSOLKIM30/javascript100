import { html } from "lit";
import View from "../view";
import { fetchGetMenu } from "../api";

import { SpinButton } from "../components/SpinButton";
import { getMoneyString } from "../utils/currency";

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
    constructor(orderTypeIndex) {
        super();

        this.menu = DEFAULT_MENU;
        this.menuAmount = 1;
        this.orderTypeIndex = orderTypeIndex;
        this.isPopupOpen = false;
        
        // splice를 통해 마지막 요소 반환
        const [menuId] = location.pathname.split('/').splice(-1);
    
        fetchGetMenu(menuId).then((response) => (this.menu = response));
    }

    static get properties() {
        return {
           menu: { type: Object },
           menuAmount: { type: Number },
           orderTypeIndex: { type: Number },
           isPopupOpen: { type: Boolean },
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

    render() {
        return html `
        <div class="container">
            <!-- 고정헤더영역 -->
            <order-header></order-header>
            <!-- // 고정헤더영역 -->

        <div class="menu-detail-area">
            <!-- 메뉴 이미지 영역 -->
            <div class="menu-img" style="background-image: url('${this.menu.imageUrl}');"></div>
            <!-- // 메뉴 이미지 영역 -->

            <!-- 메뉴 주문정보 영역 -->
            <div class="menu-info-area">
                <div class="common-inner">
                    <!-- 메뉴정보영역 -->
                    <p class="menu-name-group">
                        <span class="menu-name">${this.menu.name}</span>
                        ${this.menu.isPopular ? html `<span class="badge-popular"></span>` : ''}
                    </p>

                    <div class="menu-info-group">
                        <span class="menu-price">${getMoneyString(this.menu.price)}</span>
                        <span class="menu-grade"><img src="../assets/images/ico-star.svg" alt="별점"
                                class="ico-star">${this.menu.reviewPoint}</span>
                        <span class="menu-number-of-order">주문수<em>${this.menu.orderCount}</em></span>
                    </div>

                    <p class="menu-desc">${this.menu.description}</p>
                    <!-- //메뉴정보영역 -->

                    <!-- 메뉴주문영역 -->
                    <div class="order-type-area">
                        <div class="type-select">
                            <div class="title">
                                <svg viewBox="0 0 18 18" class="ico-n-logo">
                                    <path fill-rule="evenodd" fill="currentColor"
                                        d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                                    </path>
                                </svg>
                                주문
                            </div>
                            <div class="tab-switch-box" role="tablist">
                                <a 
                                @click=${() => (this.orderTypeIndex = 0)} 
                                class="tab-switch ${this.orderTypeIndex === 0 ? 'is-active' : ''}" role="tab">포장
                                    <img src="../assets/images/ico-check.svg" alt="" class="ico-check" aria-hidden="true">
                                </a>
                                <a
                                @click=${() => this.orderTypeIndex = 1} 
                                class="tab-switch ${this.orderTypeIndex === 0 ? '' : 'is-active'}" role="tab">매장
                                    <img src="../assets/images/ico-check.svg" alt="" class="ico-check" aria-hidden="true">
                                </a>
                            </div>
                        </div>
                        <div div class="type-amount">
                            <div class="title">수량</div>
                            ${SpinButton({
                                count: this.menuAmount,
                                onIncrease: this.onIncreaseAmount,
                                onDecrease: this.onDecreaseAmount, 
                            })}
                        </div>
                        <button class="btn-order" @click=${this.openOrderPopup}>
                            ${this.menuAmount}개 담기 
                            ${getMoneyString(this.menuAmount * this.menu.price)}원
                        </button>
                        <!-- <button class="btn-order" disabled>지금 주문 가능한 시간이 아닙니다.</button> -->
                    </div>
                    <!-- //메뉴주문영역 -->
                </div>
            </div>
            <!-- // 메뉴 주문정보 영역 -->
        </div>

        <!-- 주문자 리뷰 영역 -->
        <div class="menu-review-area">
            <!-- 주문자 사진 -->
            <div class="orderer-img-area">
                <div class="common-inner">
                    <div class="title">주문자 사진<span class="num">99</span></div>
                    <div class="scroll-x">
                        <ul class="orderer-pic-list">
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- // 주문자 사진 -->

            <!-- 주문자 리뷰 -->
            <div class="orderer-review-area">
                <div class="common-inner">
                    <div class="title">주문자 리뷰<span class="num">999</span></div>
                    <ul class="review-list">
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill"></span>
                                </span>
                                <span class="point">5.0</span>
                            </div>
                            <p class="review-text">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="review-info">
                                <span class="review-nickname">han****</span>
                                <span class="review-date">2021. 11. 14 주문</span>
                            </div>
                        </li>
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 90%;"></span>
                                </span>
                                <span class="point">4.5</span>
                            </div>
                            <p class="review-text">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="review-info">
                                <span class="review-nickname">han****</span>
                                <span class="review-date">2021. 11. 14 주문</span>
                            </div>
                        </li>
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 80%;"></span>
                                </span>
                                <span class="point">4.5</span>
                            </div>
                            <p class="review-text">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="review-info">
                                <span class="review-nickname">han****</span>
                                <span class="review-date">2021. 11. 14 주문</span>
                            </div>
                        </li>
                    </ul>
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
            .closeOrderPopup=${this.closeOrderPopup}
            .onIncreaseAmount=${this.onIncreaseAmount}
            .onDecreaseAmount=${this.onDecreaseAmount}
        >
        </option-popup>
        <!-- // 옵션 팝업 영역 -->
    </div>
        `;
    }
}