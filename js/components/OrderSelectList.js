import { html } from "lit";
import { getMoneyString } from "../utils/currency";
import View from "../view";
import { SpinButton } from "./SpinButton";


export default class OrderSelectList extends View {
    constructor(cartItems=[], onDecreaseOrderAmount, onIncreaseOrderAmount, onDeleteCartItem, getSelectedItem) {
        super();
        this.cartItems = cartItems;
        this.onDecreaseOrderAmount = onDecreaseOrderAmount;
        this.onIncreaseOrderAmount = onIncreaseOrderAmount;
        this.onDeleteCartItem = onDeleteCartItem;
        this.getSelectedItem = getSelectedItem;
    }

    static get properties() {
        return {
            cartItems: { type: Array },
            onDecreaseOrderAmount: { type: Function },
            onIncreaseOrderAmount: { type: Function },
            onDeleteCartItem: { type: Function },
            getSelectedItem: {type: Function }
        }
    }

    render() {
        return html `
            <ul class="menu-list">
                ${this.cartItems.map(
                    (item) => html `
                    <li class="menu-item">
                        <div class="menu-img-area">
                            <!-- 이미지 최적화를 위해 가로, 세로를 html 내부에 적어주는 것이 좋다. -->
                            <img 
                                src="${item.menu.imageUrl}" 
                                alt="${item.menu.name}"
                                class="menu-img" 
                                width="74" 
                                height="74"
                            >
                        </div>
                        <div class="menu-info-area">
                            <p class="menu-name-group">
                                <span class="menu-name">${item.menu.name}</span>
                            </p>
                            <p class="menu-desc">${item.menu.description}</p>
                            <button class="btn-option" @click=${() => this.getSelectedItem(item)}>옵션변경</button>
                            <div class="amount-and-price">
                                ${SpinButton({
                                    isOption: false, 
                                    count: item.amount,
                                    onDecrease: () => this.onDecreaseOrderAmount(item.menu.id),
                                    onIncrease: () => this.onIncreaseOrderAmount(item.menu.id)
                                })}
                                <p class="menu-price">${getMoneyString(item.menu.price)}원</p>
                            </div>
                        </div>
                        <button class="btn-delete" @click=${() => this.onDeleteCartItem(item.menu.id)}>
                            <img src="../assets/images/ico-close.svg" alt="삭제" class="ico-delete">
                        </button>
                    </li>
                    `
                )}
            </ul>
        `;
    }
}