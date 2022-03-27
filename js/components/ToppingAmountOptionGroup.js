import { html } from "lit";
import { getMoneyString } from "../utils/currency";
import View from "../view";
import { SpinButton } from "./SpinButton";


export default class extends View {
    constructor(items, onIncreaseOptionAmount, onDecreaseOptionAmount) {
        super();

        //this.isOption = true;
        this.items = items;
        this.onIncreaseOptionAmount = onIncreaseOptionAmount;
        this.onIncreaseOptionAmount = onDecreaseOptionAmount;
    }

    static get properties() {
        return {
            //isOption: { type: Boolean },
            items: { type: Array },
            onIncreaseOptionAmount: { type: Function },
            onIncreaseOptionAmount: { type: Function },
        };
    }

    render() {
        return html `
        <div class="option-group">
                <div class="option-title">
                    <p class="title">
                        <span class="badge">선택</span>
                        <span class="text">토핑추가</span>
                    </p>
                    <p class="desc">최대 5개까지 선택할 수 있습니다.</p>
                </div>
                <ul class="option-list">
                    ${this.items.map((item) => html `
                    <li class="option-item">
                        <label class="label checked">
                            <span class="label-txt">
                            ${item.name} <span class="price">+${getMoneyString(item.price)}</span>
                        </span>
                        </label>
                        <!-- onDecreaseOptionAmount, onIncreaseOptionAmount의 실행을 막기 위해, 화살표 함수를 통해 expression을 return -->
                        ${SpinButton({
                            isOption: true,
                            count: item.amount,
                            onIncrease: () => this.onIncreaseOptionAmount(item.name),
                            onDecrease: () => this.onDecreaseOptionAmount(item.name),
                        })}
                    </li>
                    `)}
                </ul>
            </div>
        </div>
        `;
    }
}