import { html } from "lit";
import View from "../view";

export default class AccordionList extends View {
    constructor(items) {
        super();

        this.items = items;
    }

    static get properties() {
        return {
            items: { type: Array }
        }
    }

    toggleIsOpen(title) {
        const newItems = [ ...this.items ];
        const target = newItems.find((item) => item.title === title);

        target.isOption = !target.isOption;

        this.items = newItems;
    }
    render() {
        return html `
        <ul class="agreement-list">
            ${this.items.map((item) => html `
            <li class="agreement-item ${item.isOption ? 'is-open' : ''}">
                <div class="agreement-title">
                    <span class="txt">${item.title}</span>
                    <button class="btn-toggle" @click=${() => this.toggleIsOpen(item.title)}>
                        <img src="../assets/images/ico-arrow-gray.svg" alt="아래화살표">
                    </button>
                </div>
                <div class="agreement-content">${item.content}</div>
            </li>
            `)}
        </ul>
        `
    }
}