import { html } from "lit";

import { fetchGetRecentOrders, fetchGetMenuGroup } from "../api/index.js";
import { ORDER_TYPE_MESSAGE } from "../constants/constants.js";
import { getMoneyString } from "../utils/currency.js";
import View from '../view.js';

export default class MenuPage extends View {
    constructor(orderTypeIndex, onSetOrderTypeIndex, cartItems=[], firstVisit) {
        super();

        this.orderTypeIndex = orderTypeIndex;
        this.onSetOrderTypeIndex = onSetOrderTypeIndex;
        this.cartItems = cartItems;
        this.fisrtVisit = firstVisit;
        
        this.recentMenuItems = [];
        this.menuGroups = [];
        this.selectedCategory = 'recommends';
        
        fetchGetRecentOrders().then(
            (response) => (this.recentMenuItems = response),
        );

        fetchGetMenuGroup().then(
            (response) => (this.menuGroups = response),
        );
    }

    static get properties() {
        return {
            orderTypeIndex: { type: Number },
            onSetOrderTypeIndex: { type: Function },
            cartItems: { type: Array },

            recentMenuItems: { type: Array },
            menuGroups: { type: Array },
            selectedCategory: { type: String },
        };
    }

    // 해당 페이지에서만 적용되어야하는 orderTypeIndex가 있기 때문에 별도로 메서드 선언   
    setOrderTypeIndex(orderTypeIndex) {
        this.orderTypeIndex = orderTypeIndex;
    }

    onChangeCategory(category) {
        this.selectedCategory = category;

        // y 값 계산하기
        const y = document
            .querySelector(`[data-scroll-id=${category}]`)
            .getBoundingClientRect().top;

        // scroll 가능한 API
        window.scrollBy({
            top: y - 140,
            left: 0,
            // scrollBy API의 핵심
            behavior: 'smooth',
        })
    }

    redirectDetailPage(id) {
        // 브라우저의 세션 기록 스택에 상태를 추가
        history.pushState(null, null, `/detail/${id}`);
        dispatchEvent(new PopStateEvent('popstate'));
    }

    redirectOrderPage() {
        history.pushState(null, null, 'order');
        dispatchEvent(new PopStateEvent('popstate'));
    }

    getTotalAmount() {
        return this.cartItems.reduce((totalAmount, cartItem) => {
            return totalAmount + cartItem.amount;
        }, 0);
    }

    render() {
        const categories = this.menuGroups.map(({ category, categoryName }) => ({
            category,
            categoryName,
        }));

        

        // 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환한다.
        const cartItemsTotalPrice = this.cartItems.reduce(
            (acc, item) => acc + item.price, 0
        );

        return html `
        <div class="container ${this.firstVisit ? 'fixed' : ''}">
            <!-- Header -->
            <order-header></order-header>
            <!-- // Header -->
            
            <!-- 주문정보영역 -->
            <div class="order-info-area">
                <div class="common-inner">
                    <div class="info-main">
                        <div class="info-main-title">
                            <div class="title">
                                <svg viewBox="0 0 18 18" class="ico-n-logo">
                                    <path fill-rule="evenodd" fill="currentColor"
                                        d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                                    </path>
                                </svg>
                                주문
                            </div>
                        </div>
                        
                        <!-- 주문분류 -->
                        <tab-list 
                            .orderTypeIndex=${this.orderTypeIndex} 
                            .onChangeTab=${this.onSetOrderTypeIndex.bind(this)}
                        >
                        </tab-list>
                        
                        <div class="info-main-notice">
                            ${ORDER_TYPE_MESSAGE[this.orderTypeIndex]}
                        </div>

                        <div class="info-main-notice alert hidden">
                            <svg aria-hidden="true" class="ico-clock" viewBox="0 0 13 13" width="13" height="13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                    d="M6.5 0a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm0 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm.492 1.137v4.157l2.792 2.674-.692.722-3.1-2.97V2.137h1z">
                                </path>
                            </svg>
                            지금은 주문을 받을 수 없습니다.
                        </div>
                        <!-- // 주문분류 -->
                        <!-- 최근 주문 내역 -->
                        <recent-menu-list .recentMenuItems=${this.recentMenuItems} .redirectDetailPage=${this.redirectDetailPage} .cartItems=${this.cartItems}></recent-menu-list>
                        <!-- // 최근 주문 내역 -->
                    </div>
                </div>
            </div>
            <!-- // 주문 정보 영역 -->
            
            <!-- 메뉴 카테고리 영역 -->
            <div class="menu-category-area">
                <div class="common-inner">
                    <ul class="category-list scroll-x">
                        ${categories.map(({ category, categoryName }) => 
                            html `
                            <li class="category-item">
                                <a class="category-tab ${category === this.selectedCategory ? 'is-active' : ''}" @click=${() => this.onChangeCategory(category)}>${categoryName}</a>
                            </li>`
                        )}
                    </ul>
                </div>
            </div>
            <!-- // 메뉴 카테고리 영역 -->

            <!-- 메뉴 리스트 영역 -->
            ${this.menuGroups.map((menuGroup) => 
                html `<menu-list .menuGroup=${menuGroup} .redirectDetailPage=${this.redirectDetailPage} .cartItems=${this.cartItems}></menu-list>`
            )}
            <!-- // 메뉴 리스트 영역 -->

            <!-- 담은 메뉴 영역 -->
            ${this.cartItems.length > 0 
                ? html `
                <div class="order-box-area">
                    <div class="common-inner">
                        <div>
                            <p class="menu-name">${this.cartItems.length > 1 ? this.cartItems[0].menu.name + " 외 " + (this.getTotalAmount()-1) + "개" : this.cartItems[0].menu.name}</p>
                            <p class="menu-price">${getMoneyString(cartItemsTotalPrice)}원</p>
                        </div>
                        <a class="btn-order" @click=${this.redirectOrderPage}>
                            <span class="txt">주문하기</span>
                            <span class="icon-cart">
                                <img src="../assets/images/ico-cart-fill.svg" alt="" aria-hidden="true" class="ico-cart">
                                <span class="num">${this.getTotalAmount()}</span>
                            </span>
                        </a>
                    </div>
                </div>` : '' 
            }
            <!-- // 담은 메뉴 영역 -->

            <!-- 맨 위로 -->
            <div class="go-to-top">
                <a href="#" class="link">Top <i class="ico-up"></i></a>
            </div>
            <!-- // 맨 위로 -->
                    
            <div class="dimmed-layer ${this.firstVisit ? '' : 'hidden'}"></div>
            <div class="order-type-popup ${this.firstVisit ? '' : 'hidden'}">
                <p class="title">어디서 드시나요?</p>
                <order-type-list .onSetOrderTypeIndex=${this.onSetOrderTypeIndex}></order-type-list>
            </div>
        </div>
        `;
    }
}