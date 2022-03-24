import { html } from 'lit';
import { getMoneyString } from '../utils/currency.js';
import View from '../view.js';

export default class MenuList extends View {
    constructor(menuGroup, redirectDetailPage, cartItems=[]) {
        super();
        
        this.menuGroup = menuGroup;
        this.redirectDetailPage = redirectDetailPage;
        this.cartItems = cartItems;

        this.isClosed = false;
    }
    
    static get properties() {
        return {
            menuGroup: { type: Object },
            redirectDetailPage: { type: Function },
            isClosed: { type: Boolean },
        };
    }

    getPackedItemCount(item) {
        return this.cartItems.reduce(function(total, cartItem) {
            if(item.name === cartItem.menu.name) {
                return total + cartItem.amount;
            }
            return total;
        },0);
    }

    toggle() {
        this.isClosed = !this.isClosed;
    }

    render() {
        return html `
            <!-- 카테고리 클릭 시, 이동 ==> 임의의 사용자 데이터를 담을 수 있는 data-attribute 생성하기 -->
            <div 
            data-scroll-id=${this.menuGroup.category}
            class="menu-list-area ${this.isClosed ? 'is-closed' : ''}">
                <div class="common-inner">
                    <div class="menu-category">
                        <p class="title">${this.menuGroup.categoryName}</p>
                        <button class="btn-toggle" @click=${this.toggle}>
                            <img class="ico-arrow" src="./assets/images/ico-arrow.svg">
                        </button>
                   </div>
                    <ul class="menu-list">
                        ${this.menuGroup.items.map((item) => (html `
                            <li class="menu-item" @click=${ item.soldOut ? null : () => this.redirectDetailPage(item.id)}>
                                <a class="menu-detail">
                                    <div class="menu-img-area">
                                        <!-- 이미지 최적화를 위해 가로, 세로를 html 내부에 적어주는 것이 좋다. -->
                                        <img src="${item.imageUrl}" alt="${item.name}" class="menu-img" width="100" height="110">
                                    </div>
                                    <div class="menu-info-area">
                                        <p class="menu-name-group">
                                            <span class="menu-name">${item.name}</span>
                                            ${item.isPopular ? html `<span class="badge-popular">인기</span>` : ''}
                                            ${item.isNew ? html `<img src="../assets/images/ico-new.svg" alt="new" class="ico-new">` : ''}      
                                        </p>
                                        <div class="menu-info-group">
                                            <span class="menu-grade"><img src="../assets/images/ico-star.svg" alt="별점" class="ico-star">${item.reviewPoint}</span>
                                            <span class="menu-number-of-order">주문수<em>${item.orderCount}</em></span>
                                        </div>
                                        <p class="menu-desc">${item.description}</p>
                                        <p class="menu-price">${getMoneyString(item.price)}원</p>
                                    </div>
                                </a>
                                ${item.soldOut ? 
                                    html `<a class="btn-cart disabled"> 품절</a>` : 
                                    html ` 
                                        <a class="btn-cart">
                                            ${this.getPackedItemCount(item) > 0 ? 
                                                html `
                                                    <img src="../assets/images/ico-cart-fill-green.svg" alt="주문하기">
                                                    <span class="num">${this.getPackedItemCount(item)}</span>
                                                `: 
                                                html `
                                                    <img src="../assets/images/ico-cart.svg" alt="주문하기">
                                                ` 
                                            }
                                        </a>`
                                }                               
                            </li>`
                        ))}        
                    </ul>
                </div>
            </div>`
    }
}