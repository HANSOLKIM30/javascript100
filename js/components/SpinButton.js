import { html } from "lit";

export function SpinButton({ isOption=false, count, onDecrease, onIncrease }) {
    return html`
        <div class="amount-select">
            ${ isOption ? 
                html`
                <button class="btn-minus ${count <= 0 ?'disabled' : 'enabled'}" aria-label="빼기" @click=${onDecrease}></button>
                <span class="amount">${count}</span>
                <button class="btn-plus enabled" aria-label="더하기" @click=${onIncrease}></button>
                `
                :
                html`
                <button class="btn-minus" aria-label="빼기" @click=${onDecrease}></button>
                <span class="amount">${count}</span>
                <button class="btn-plus" aria-label="더하기" @click=${onIncrease}></button>
                `            
            }     
        </div>
        `
}