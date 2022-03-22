import { html } from "lit";
import View from "../view";

export default class extends View {
    constructor(items, toggleBaseOption) {
        super();
        this.items = items;
        this.toggleBaseOption = toggleBaseOption;
    }

    static get properties() {
        return {
            items: { type: Array },
            toggleBaseOption: { type: Function },
        };
    }

    render() {
        return html `
        <div class="option-group">
            <div class="option-title">
                <p class="title">
                    <span class="badge required">필수</span>
                    <span class="text">베이스 선택</span>
                </p>
            </div>
            <ul class="option-list">
                ${this.items.map(item => html `
                    <li class="option-item">
                        <input type="radio" id="${item.name}" class="input-radio" name="base" .checked=${item.isSelected}>
                        <label for="${item.name}" class="label" @click=${() => this.toggleBaseOption(item.name)}>
                            <span class="label-txt">${item.name}</span>
                            <span class="label-icon"></span>
                        </label>
                    </li>
                `)}
            </ul>
        </div>
        `;
    }
}
