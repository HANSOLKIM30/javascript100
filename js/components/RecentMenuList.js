import { html } from "lit";
import { getMoneyString } from "../utils/currency";
import View from "../view";

export default class RecentMenuList extends View {
    constructor(recentMenuItems = [], redirectDetailPage) {
        super();

        this.recentMenuItems = recentMenuItems;
        this.redirectDetailPage = redirectDetailPage;
    }

    static get properties() {
        return {
            recentMenuItems: { type: Array },
            redirectDetailPage: { type: Function },
        }
    }

    render() {
        return html `
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
                            <a>
                                <div class="menu-img-area">
                                    <!-- Conditional Rendering -->
                                    ${isPopular? html`<span class="badge-popular">인기</span>` : '' }
                                    <img class="menu-img" src="${imageUrl}" alt="메뉴사진">
                                </div>
                                <p class="menu-name">${name}</p>
                                <p class="menu-price">${getMoneyString(price)}</p>
                            </a>
                            <a href="#" class="badge-cart">
                                <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
                            </a>
                        </li>
                        `
                    )}
                </ul>
            </div>`
    }
}