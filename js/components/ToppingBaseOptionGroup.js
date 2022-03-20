import { html } from "lit";
import View from "../view";

export default class extends View {
    constructor() {
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
                    <span class="badge required">필수</span>
                    <span class="text">베이스 선택</span>
                </p>
            </div>
            <ul class="option-list">
                <li class="option-item">
                    <input type="radio" id="rd1" class="input-radio" name="base" checked>
                    <label for="rd1" class="label">
                        <span class="label-txt">추천대로</span>
                        <span class="label-icon"></span>
                    </label>
                </li>
                <li class="option-item">
                    <input type="radio" id="rd2" class="input-radio" name="base">
                    <label for="rd2" class="label">
                        <span class="label-txt">채소볼</span>
                        <span class="label-icon"></span>
                    </label>
                </li>
                <li class="option-item">
                    <input type="radio" id="rd3" class="input-radio" name="base">
                    <label for="rd3" class="label">
                        <span class="label-txt">곡물볼</span>
                        <span class="label-icon"></span>
                    </label>
                </li>
            </ul>
        </div>
        `;
    }
}
