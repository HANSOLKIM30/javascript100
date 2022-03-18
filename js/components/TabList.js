import { html } from "lit";
import View from "../view";

// 주문분류 > 포장, 매장, 배달을 구분하는 상수
const TABS = [{
    text: html `포장`,
    imageUrl: '/assets/images/ico-check.svg'
},
{
    text: html `매장`,
    imageUrl: '/assets/images/ico-check.svg'
},
{
    text: html `배달`,
    imageUrl: '/assets/images/ico-check.svg'
}
]

const ORDER_TYPE_MESSAGE = [
    '가지고 가실 수 있게 포장해 드립니다.',
    '매장에서 드실 수 있게 준비됩니다.',
    '계신 곳으로 배달됩니다.',
]

export default class TabList extends View {
    constructor(tabIndex = 0, onChangeTab) {
        super();

        this.tabIndex = tabIndex;
        this.onChangeTab = onChangeTab;
    }

    static get properties() {
        return {
            tabIndex: { type: Number },
            onChangeTab: { type: Function },
        }
    }
    

    render() {
        return html`

         <div class="tab-switch-box" role="tablist">
                        ${TABS.map(
                            (tab, index) => 
                            html `
                            <a href="#" class="tab-switch ${index === this.tabIndex ? 'is-active' : ''}" role="tab" @click = ${() => this.onChangeTab(index)}>
                                ${tab.text}
                                <img src="${tab.imageUrl}" alt="${tab.text}" class="ico-check" aria-hidden="${index !== this.tabIndex}">
                            </a>
                            `
                        )}
                        
                    </div>
                    <div class="info-main-notice">
                            ${ORDER_TYPE_MESSAGE[this.tabIndex]}
                    </div>

                    <div class="info-main-notice alert hidden">
                        <svg aria-hidden="true" class="ico-clock" viewBox="0 0 13 13" width="13" height="13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor"
                                d="M6.5 0a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm0 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm.492 1.137v4.157l2.792 2.674-.692.722-3.1-2.97V2.137h1z">
                            </path>
                        </svg>
                        지금은 주문을 받을 수 없습니다.
                    </div>
        `;
    }
}