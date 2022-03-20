import { html } from "lit";
import View from "../view";

export default class extends View {
    constructor(items) {
        super();

        this.items = items;
    }

    static get properties() {
        return {

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
                    <li class="option-item">
                        <label class="label checked">
                            <span class="label-txt">치킨 <span class="price">+1,500원</span></span>
                        </label>
                        <div class="amount-select">
                            <button class="btn-minus enabled" aria-label="빼기" disabled></button>
                            <span class="amount">2</span>
                            <button class="btn-plus enabled" aria-label="더하기"></button>
                        </div>
                    </li>
                    <li class="option-item">
                        <label class="label">
                            <span class="label-txt">에그 <span class="price">+900원</span></span>    
                        <div class="amount-select">
                            <button class="btn-minus" aria-label="빼기" disabled></button>
                            <span class="amount">1</span>
                            <button class="btn-plus enabled" aria-label="더하기"></button>
                        </div>
                    </li>
                    <li class="option-item">
                        <label class="label">
                            <span class="label-txt">치킨소시지 <span class="price">+1,900원</span></span>
                        </label>
                        <div class="amount-select">
                            <button class="btn-minus" aria-label="빼기" disabled></button>
                            <span class="amount">1</span>
                            <button class="btn-plus enabled" aria-label="더하기"></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `;
    }
}