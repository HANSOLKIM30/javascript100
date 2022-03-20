import { html } from "lit";
import View from "../view";
import { SpinButton } from "./SpinButton";


const DEFAULT_OPTION = {
    id: 1,
    baseOptions: [],
    toppingSelectOptions: [],
    toppingAmountSelectOptions: [],
}

export default class OptionPopup extends View {
    constructor(
        menu,
        menuAmount, 
        isPopupOpen, 
        closeOrderPopup, 
        onIncreaseAmount, 
        onDecreaseAmount
        ) {
        super();

        this.menu = menu;
        this.menuAmount = menuAmount;
        this.isPopupOpen = isPopupOpen;
        this.option = DEFAULT_OPTION;
        this.closeOrderPopup = closeOrderPopup;
        this.onIncreaseAmount = onIncreaseAmount;
        this.onDecreaseAmount = onDecreaseAmount;
    }

    static get properties() {
        return {
            menu: { type: Object },
            menuAmount: { type: Number },
            isPopupOpen: { type: Boolean },
            option: { type: Object },
            closeOrderPopup: { type: Function },
            onIncreaseAmount: { type: Function },
            onDecreaseAmount: { type: Function },
        }
    }

    render() {
        return html`
            <div class="option-popup-area ${this.isPopupOpen ? '' : 'hidden'}">
                <div class="dimmed-layer light"></div>
                <div class="menu-option-popup">
                    <svg class="content-top-pattern" width="100%" height="100%">
                        <defs>
                            <pattern id="pattern-triangle" x="0" y="0" width="10" height="11" patternUnits="userSpaceOnUse">
                                <polygon points="5 5, 10 10, 10 11, 0 11, 0 10"></polygon>
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-triangle)"></rect>
                    </svg>
                    <div class="content-top">
                        <div class="common-inner">
                            <div class="menu-img-area">
                                <img src="${this.menu.imageUrl}" alt="${this.menu.name}" class="menu-img">
                            </div>
                            <div class="menu-detail-area">
                                <p class="menu-name">
                                    <span class="name">${this.menu.name}</span>
                                    <span class="badge">${this.menu.orderType}</span>
                                </p>
                                ${SpinButton({
                                    count: this.menuAmount,
                                    onIncrease: this.onIncreaseAmount,
                                    onDecrease: this.onDecreaseAmount, 
                                })}
                            </div>
                            <button class="btn-close" @click=${this.closeOrderPopup}>
                                <img src="../assets/images/ico-close.svg" alt="order popup close button" class="ico-close">
                            </button>
                        </div>
                    </div>

                    <div class="content-body">
                        <topping-base-option-groups ></topping-base-option-groups>
                        <topping-select-option-groups></topping-select-option-groups>
                        <topping-amount-option-groups></topping-amount-option-groups>
                    <div class="content-bottom">
                        <button class="btn-order">1개 담기 9,999</button>
                    </div>
                </div>
            </div>
        `
    }
}