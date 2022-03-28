import { html } from "lit";
import View from "../view";

import { fetchGetMenuOptions } from "../api"
import { getMoneyString } from "../utils/currency";
import { SpinButton } from "./SpinButton";
import { DEFAULT_OPTION, ORDER_TYPE } from "../constants/constants";



export default class OptionPopup extends View {
    constructor(menu, menuAmount, option, orderTypeIndex, isPopupOpen = false, closeOrderPopup, onIncreaseAmount, onDecreaseAmount, onAddCartItem, onChangeOption) {
        super();

        this.menu = menu;
        this.menuAmount = menuAmount;
        this.orderTypeIndex = orderTypeIndex;
        this.isPopupOpen = isPopupOpen;
        this.closeOrderPopup = closeOrderPopup;
        this.onIncreaseAmount = onIncreaseAmount;
        this.onDecreaseAmount  = onDecreaseAmount;
        this.onAddCartItem = onAddCartItem;
        this.onChangeOption = onChangeOption;

        this.option = DEFAULT_OPTION;

        this.currentPage = location.pathname.split('/')[1];
        if(this.currentPage === 'detail') {
            const [menuId] = location.pathname.split('/').splice(-1);
            fetchGetMenuOptions(menuId).then((response) => {
                this.option = response
            });
        } else if(this.currentPage === 'order') {
            this.option = option;
        }
    }

    static get properties() {
        return {
            menu: { type: Object },
            menuAmount: { type: Number },
            orderTypeIndex: { type: Number },
            isPopupOpen: { type: Boolean },
            closeOrderPopup: { type: Function },
            onIncreaseAmount: { type: Function },
            onDecreaseAmount: { type: Function },
            onAddCartItem: { type: Function },
            onChangeOption: { type: Function },
            option: { type: Object },
            currentPage: { type: String },
        }
    }

    toggleBaseOption(optionName) {
        const newOption = { ...this.option };

        const targetOption = newOption.baseOptions.find((element) => element.name === optionName);

        targetOption.isSelected = !targetOption.isSelected;

        this.option = newOption;
    }

    toggleToppingSelectOption(optionName) {
        const newOption = { ...this.option };

        const targetOption = newOption.toppingSelectOptions.find((element) => element.name === optionName);

        // 현재 targetOption의 isSelected의 반대되는 값을 할당
        targetOption.isSelected = !targetOption.isSelected;

        this.option = newOption;
    }

    increaseOptionAmount(optionName) {
        // 전개연산자 ...를 통한 깊은 복사(원본 option과 그 하위 속성의 값을 바꾸지 않게 하기 위함.)
        const newOption = { ...this.option };

        // find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다.
        // option을 깊은 복사한 newOption 객체의 toppingAmountSelectOption 속성에서 ()안의 판별함수를 만족하는 요소가 있는지 검사하고, 있을 경우 해당 값을 targetOption에 할당한다.
        const targetOption = newOption.toppingAmountSelectOptions.find((element) => element.name === optionName);

        // newOption의 toppingAmountSelectOption의 요소 중 조건을 만족하는 targetOption의 amount를 1 증가
        targetOption.amount += 1;

        this.option = newOption;
    }

    decreaseOptionAmount(optionName) {
        const newOption = { ...this.option };
        const targetOption = newOption.toppingAmountSelectOptions.find((element) =>  element.name === optionName);
        
        if(targetOption.amount <= 0) {
            return;
        }

        targetOption.amount -= 1;

        this.option = newOption;
    }

    getFinalPrice() {
        let price = this.menu.price;

        this.option.toppingSelectOptions.forEach((option => {
            if(option.isSelected) {
                price += option.price;
            }
        }));

        this.option.toppingAmountSelectOptions.forEach((option => {
            if(option.amount !== 0) {
                price += option.price * option.amount;
            } 
        }));

        return price * this.menuAmount;
    }

    onChangeOption() {

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
                                    <span class="badge">${ORDER_TYPE[this.orderTypeIndex]}</span>
                                </p>
                                
                                ${this.currentPage==="detail" ? html `
                                    ${SpinButton({
                                        count: this.menuAmount,
                                        onDecrease: this.onDecreaseAmount, 
                                        onIncrease: this.onIncreaseAmount,
                                    })}
                                ` : ''}
                                ${this.currentPage==="order" ? html `
                                    ${SpinButton({
                                        count: this.menuAmount,
                                        onDecrease: () => this.onDecreaseAmount(this.menu.id), 
                                        onIncrease: () => this.onIncreaseAmount(this.menu.id),
                                    })}
                                ` : ''}

                            </div>
                            <button class="btn-close" @click=${this.closeOrderPopup}>
                                <img src="../assets/images/ico-close.svg" alt="order popup close button" class="ico-close">
                            </button>
                        </div>
                    </div>

                    <div class="content-body">
                        <topping-base-option-groups 
                            .items=${this.option.baseOptions}
                            .toggleBaseOption=${this.toggleBaseOption.bind(this)}
                        >
                        </topping-base-option-groups>
                        <topping-select-option-groups 
                            .items=${this.option.toppingSelectOptions}
                            .toggleToppingSelectOption=${this.toggleToppingSelectOption.bind(this)}
                        >
                        </topping-select-option-groups>
                        <!-- 부분적용함수 bind를 통해 this를 해당 class로 지정하여 해당 메서드 내부의 this가 해당 class를 바라볼 수 있도록 지정하고, 추후 인자를 넘기고 실행 -->
                        <topping-amount-option-groups 
                            .items=${this.option.toppingAmountSelectOptions}
                            .onIncreaseOptionAmount=${this.increaseOptionAmount.bind(this)}
                            .onDecreaseOptionAmount=${this.decreaseOptionAmount.bind(this)}
                        >
                        </topping-amount-option-groups>
                    <div class="content-bottom">
                        ${this.currentPage==="detail" ? html `
                            <button 
                                class="btn-order" 
                                @click=${() => this.onAddCartItem({
                                    menu: this.menu,
                                    amount: this.menuAmount,
                                    option: this.option,
                                    price: this.getFinalPrice()
                                }
                                )}
                            >
                                ${this.menuAmount}개 담기 ${getMoneyString(this.getFinalPrice())}
                            </button>
                        ` : ''}
                        ${this.currentPage==="order" ? html `
                            <button 
                                class="btn-order" 
                                @click=${() => this.onChangeOption(this.menu.id, this.option)}
                            >
                                옵션 변경하기
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `
    }
}