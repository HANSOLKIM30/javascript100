import { html } from "lit";

import { fetchGetRecentOrders, fetchGetMenuGroup } from "../api/index.js";
import View from '../view.js';

export default class MenuPage extends View {
    constructor() {
        super();

        this.cartItems = [];
        
        this.tabIndex = 0;
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
            tabIndex: { type: Number },
            selectedCategory: { type: String },
            recentMenuItems: { type: Array },
            menuGroups: { type: Array },
            cartItems: { type: Array },
        };
    }

    onChangeTab(index) {
        this.tabIndex = index;
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

    render() {
        const categories = this.menuGroups.map(({ category, categoryName }) => ({
            category,
            categoryName,
        }));

        return html `
        <div class="container">
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
                        <tab-list .onChangeTab=${this.onChangeTab} .tabIndex=${this.tabIndex}></tab-list>
                        <!-- // 주문분류 -->
                        
                        <!-- 최근 주문 내역 -->
                        <recent-menu-list .recentMenuItems=${this.recentMenuItems} .redirectDetailPage=${this.redirectDetailPage}></recent-menu-list>
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
                html `<menu-list .menuGroup=${menuGroup} .redirectDetailPage=${this.redirectDetailPage}></menu-list>`
            )}
            <!-- // 메뉴 리스트 영역 -->

            <!-- 담은 메뉴 영역 -->
            ${this.cartItems.length > 0 
                ? html `
                <div class="order-box-area">
                    <div class="common-inner">
                        <div>
                            <p class="menu-name">메뉴 이름</p>
                            <p class="menu-price">9,999원</p>
                        </div>
                        <a href="./order.html" class="btn-order">
                            <span class="txt">주문하기</span>
                            <span class="icon-cart">
                                <img src="../assets/images/ico-cart-fill.svg" alt="" aria-hidden="true" class="ico-cart">
                                <span class="num">1</span>
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
                    
            <div class="dimmed-layer hidden"></div>
            <div class="order-type-popup hidden">
                <p class="title">어디서 드시나요?</p>
                <order-type-list></order-type-list>
            </div>
        </div>
        `;
    }
}