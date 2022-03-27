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

const ORDER_TYPE = [
    "포장",
    "매장",
    "배달"
]
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

const DEFAULT_MENU = {
    id: 1,
    name: "음식 이름",
    reviewPoint: 0.0,
    description: "불러오는 중",
    price: 0,
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200416_252/1587007251652svUkx_PNG/%C4%A5%B8%AE%BA%A3%C0%CC%C4%C1_%BF%FA%BA%BC.png?type=f220_220_60_sharpen",
    pictures: [],
    reviews: [],
};

const DEFAULT_OPTION = {
    id: 1,
    baseOptions: [],
    toppingSelectOptions: [],
    toppingAmountSelectOptions: [],
}

export { TABS, ORDER_TYPE, ORDER_TYPE_HEADING, ORDER_TYPE_MESSAGE, DEFAULT_MENU, DEFAULT_OPTION };