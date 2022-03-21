import { html } from "lit";

export function SpinButton({ count, onDecrease, onIncrease }) {
    return html`
        <div class="amount-select">
            <button class="btn-minus ${count <= 1 ?'disabled' : 'enabled'}" aria-label="빼기" @click=${onDecrease}></button>
            <span class="amount">${count}</span>
            <button class="btn-plus enabled" aria-label="더하기" @click=${onIncrease}></button>
        </div>
        `
}