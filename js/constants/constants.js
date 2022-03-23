import { html } from "lit";

// 주문분류 > 포장, 매장, 배달을 구분하는 상수
const TABS = [
    {
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
];

const ORDER_TYPE_HEADING = [
    "포장할게요",
    "매장에서 식사를 준비해둘게요",
    "배달해드릴께요",
];

const ORDER_TYPE_MESSAGE = [
    '가지고 가실 수 있게 포장해 드립니다.',
    '매장에서 드실 수 있게 준비됩니다.',
    '계신 곳으로 배달됩니다.',
];

export { TABS, ORDER_TYPE_HEADING, ORDER_TYPE_MESSAGE };