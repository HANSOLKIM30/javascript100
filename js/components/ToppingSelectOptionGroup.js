import { html } from "lit";
import { getMoneyString } from "../utils/currency";
import View from "../view";

export default class extends View {
    constructor(items, toggleToppingSelectOption) {
        super();

        this.items = items;
        this.toggleToppingSelectOption = toggleToppingSelectOption;
    }

    static get properties() {
        return {
            items: { type: Array },
            toggleToppingSelectOption: { type: Function },
        };
    }

    render() {
        return html `
        <div class="option-group">
            <div class="option-title">
                <p class="title">
                    <span class="badge">선택</span>
                    <span class="text">토핑 추가</span>
                    <p class="desc">최대 5개까지 선택할 수 있습니다.</p>
                </p>
            </div>
            <ul class="option-list">
                ${this.items.map((item) => html `
                    <li class="option-item">
                        <input type="checkbox" id="${item.name}" class="input-check" .checked=${item.isSelected}>
                        <label for="${item.name}" class="label" @click=${() => this.toggleToppingSelectOption(item.name)}>
                            <span class="label-txt">${item.name} <span class="price">+${getMoneyString(item.price)}원</span></span>
                            <span class="label-icon"></span>
                        </label>
                    </li>
                `)}
            </ul>
        </div>
        `;
    }
}