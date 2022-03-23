import { html } from "lit";
import View from "../view";

import { SpinButton } from "../components/SpinButton";
import { getMoneyString } from "../utils/currency";

export default class MenuDetail extends View {
    constructor(menu, orderTypeIndex, menuAmount, onIncreaseAmount, onDecreaseAmount, openOrderPopup) {
        super();

        this.menu = menu;
        this.orderTypeIndex = orderTypeIndex;
        this.menuAmount = menuAmount;
        this.onIncreaseAmount = onIncreaseAmount;
        this.onDecreasAmout = onDecreaseAmount;
        this.openOrderPopup = openOrderPopup;
    }

    static get properties() {
        return {
            menu: { type : Object },
            orderTypeIndex: { type : Number },
            menuAmount: { type : Number },
            onIncreaseAmount: { type : Function },
            meonDecreaseAmountnu: { type : Function },
            openOrderPopup: { type: Function },
        }
    }

    render() {
        return html `
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
                        <span class="menu-number-of-order">주문 수<em>${this.menu.orderCount}</em></span>
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
        `
    }
}