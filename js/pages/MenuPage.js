import { html } from "lit";

import { fetchGetRecentOrders, fetchGetMenuGroup } from "../api/index.js";
import View from '../view.js';

// 주문분류 > 포장, 매장, 배달을 구분하는 상수
const TABS = [{
        text: html `포장`,
        imageUrl: '/assets/images/ico-check.svg'
    },
    {
        text: html `매장`,
        imageUrl: '/assets/images/ico-check.svg'
    },
    {
        text: html `배달`,
        imageUrl: '/assets/images/ico-check.svg'
    }
]

const ORDER_TYPE_MESSAGE = [
    '가지고 가실 수 있게 포장해 드립니다.',
    '매장에서 드실 수 있게 준비됩니다.',
    '계신 곳으로 배달됩니다.',
]

export default class MenuPage extends View {
    constructor() {
        super();

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
        this.dispatchEvent(new PopStateEvent('popstate'));
    }

    render() {
        const categories = this.menuGroups.map(({ category, categoryName }) => ({
            category,
            categoryName,
        }));

        return html `
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
                    <div class="tab-switch-box" role="tablist">
                        ${TABS.map(
                            (tab, index) => 
                            html `
                            <a href="#" class="tab-switch ${index === this.tabIndex ? 'is-active' : ''}" role="tab" @click = ${() => this.onChangeTab(index)}>
                                ${tab.text}
                                <img src="${tab.imageUrl}" alt="${tab.text}" class="ico-check" aria-hidden="${index !== this.tabIndex}">
                            </a>
                            `
                        )}
                        
                    </div>
                    <div class="info-main-notice">
                            ${ORDER_TYPE_MESSAGE[this.tabIndex]}
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
                    <div class="recent-order-area">
                        <div class="recent-title">
                            <img src="../assets/images/ico-clock.svg" alt="" class="ico-clock">
                            최근<br>주문
                        </div>
                        <div class="recent-menu-area scroll-x">
                            <ul class="recent-menu-list">
                                <!-- 객체구조 분해 할당(함수 매개변수로 전달된 개체에서 필드 해체하기) -->
                                ${this.recentMenuItems.map(({id, name, price, isPopular, imageUrl}) => 
                                    html `
                                    <li class="recent-menu-item is-ordered" @click = ${() => this.redirectDetailPage(id)}>
                                        <a href="./detail.html">
                                            <div class="menu-img-area">
                                                <!-- Conditional Rendering -->
                                                ${isPopular? html`<span class="badge-popular">인기</span>` : '' }
                                                <img class="menu-img" src="${imageUrl}" alt="메뉴사진">
                                            </div>
                                            <p class="menu-name">${name}</p>
                                            <p class="menu-price">${price}</p>
                                        </a>
                                        <a href="#" class="badge-cart">
                                            <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
                                        </a>
                                    </li>
                                    `
                                )}
                            </ul>
                        </div>
                    </div>
                    <!-- // 최근 주문 내역 -->

                    <!-- 메뉴 카테고리 영역 -->
                    <div class="menu-category-area">
                        <div class="common-inner">
                            <ul class="category-list scroll-x">
                                ${categories.map(({ category, categoryName }) => 
                                    html `
                                    <li class="category-item">
                                        <a class="category-tab ${category === this.selectedCategory ? 'is-active' : ''}" @click=${() => this.onChangeCategory(category)}>${categoryName}</a>
                                    </li>
                                    `
                                )}
                            </ul>
                        </div>
                    </div>
                    <!-- // 메뉴 카테고리 영역 -->

                    <!-- 메뉴 리스트 영역 -->
                    ${this.menuGroups.map((menuGroup) => 
                        html `<menu-list .menuGroup=${menuGroup}></menu-list>`
                    )}
                    <!-- // 메뉴 리스트 영역 -->
                </div>
            </div>
        </div>`;
    }
}