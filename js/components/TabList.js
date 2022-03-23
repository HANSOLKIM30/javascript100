import { html } from "lit";
import { TABS } from "../constants/constants";
import View from "../view";

export default class TabList extends View {
    constructor(orderTypeIndex = 0, onChangeTab) {
        super();

        this.orderTypeIndex = orderTypeIndex;
        this.onChangeTab = onChangeTab;
    }

    static get properties() {
        return {
            orderTypeIndex: { type: Number },
            onChangeTab: { type: Function },
        }
    }
    
    render() {
        return html `
            <div class="tab-switch-box" role="tablist">
                ${TABS.map(
                    (tab, index) => 
                    html `
                    <a href="#" class="tab-switch ${index === this.orderTypeIndex ? 'is-active' : ''}" role="tab" @click = ${() => this.onChangeTab(index)}>
                        ${tab.text}
                        <img src="${tab.imageUrl}" alt="${tab.text}" class="ico-check" aria-hidden="${index !== this.orderTypeIndex}">
                    </a>
                    `
                )}            
            </div>
        `;
    }
}