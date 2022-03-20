import { html } from "lit";
import View from "../view";

// 함수로 만들기
export function SpinButton({ count, onDecrease, onIncrease }) {
    return html`
    <div div class="type-amount">
        <div class="title">수량</div>
        <div class="amount-select">
            <button class="btn-minus ${count <= 1 ?'disabled' : 'enabled'}" aria-label="빼기" @click=${onDecrease}></button>
            <span class="amount">${count}</span>
            <button class="btn-plus enabled" aria-label="더하기" @click=${onIncrease}></button>
        </div>
    </div>`
}