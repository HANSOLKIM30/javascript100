import { html } from "lit";
import View from "../view";

export default class extends View {
    constructor(menu) {
        super();
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
                    <span class="text">토핑 추가</span>
                    <p class="desc">최대 5개까지 선택할 수 있습니다.</p>
                </p>
            </div>
            <ul class="option-list">
                <li class="option-item">
                    <input type="checkbox" id="chk1" class="input-check" checked>
                    <label for="chk1" class="label">
                        <span class="label-txt">채소추가(기본 제공량의 30% 추가) <span class="price">+900원</span></span>
                        <span class="label-icon"></span>
                    </label>
                </li>
                <li class="option-item">
                    <input type="checkbox" id="chk2" class="input-check">
                    <label for="chk2" class="label">
                        <span class="label-txt">곡물추가(기본 제공량의 50% 추가) <span class="price">+900원</span></span>
                        <span class="label-icon"></span>
                    </label>
                </li>
                <li class="option-item">
                    <input type="checkbox" id="chk3" class="input-check">
                    <label for="chk3" class="label">
                        <span class="label-txt">시저 드레싱 추가 <span class="price">+900원</span></span>
                        <span class="label-icon"></span>
                    </label>
                </li>
            </ul>
        </div>
        `;
    }
}