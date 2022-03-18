import { html } from "lit";
import View from "../view";
import { fetchGetMenu } from "../api";

// REST Api 결과가 없을 것을 대비하여 기본 객체를 상수화.(적극적으로 활용해보기)
const DEFAULT_MENU = {
    "id": 1,
    "name": "음식이름",
    "reviewPoint": 0.0,
    "description": "불러오는 중",
    "price": 0,
    "orderCount": 0,
    "imageUrl": "https://ldb-phinf.pstatic.net/20200416_252/1587007251652svUkx_PNG/%C4%A5%B8%AE%BA%A3%C0%CC%C4%C1_%BF%FA%BA%BC.png?type=f220_220_60_sharpen",
    "pictures": [],
    "reviews": []
}

export default class DeatilPage extends View {
    constructor(orderTypeIndex) {
        super();

        this.menu = DEFAULT_MENU;
        this.orderTypeIndex = orderTypeIndex;
        this.orderType = orderTypeIndex === 0 ? '포장' : '매장';

        console.log(this.orderTypeIndex);

        // splice를 통해 마지막 요소 반환
        const [menuId] = location.pathname.split('/').splice(-1);
    
        fetchGetMenu(menuId).then((response) => (this.menu = response));
    }

    static get properties() {
        return {
           menu: { type: Object },
           orderTypeIndex: { type: Number },
           orderType: { type: String },
        }
    }

    render() {
        return html `
        <div class="container">
            <!-- 고정헤더영역 -->
            <order-header></order-header>
            <!-- // 고정헤더영역 -->

        <div class="menu-detail-area">
            <!-- 메뉴 이미지 영역 -->
            <div class="menu-img" style="background-image: url('${this.menu.imageUrl}');"></div>
            <!-- // 메뉴 이미지 영역 -->

            <!-- 메뉴 주문정보 영역 -->
            <div class="menu-info-area">
                <div class="common-inner">
                    <!-- 메뉴정보영역 -->
                    <p class="menu-name-group">
                        <span class="menu-name">${this.menu.name}</span>
                        ${this.menu.isPopular ? html `<span class="badge-popular"></span>` : ''}
                    </p>

                    <div class="menu-info-group">
                        <span class="menu-price">${this.menu.price}</span>
                        <span class="menu-grade"><img src="../assets/images/ico-star.svg" alt="별점"
                                class="ico-star">${this.menu.reviewPoint}</span>
                        <span class="menu-number-of-order">주문수<em>${this.menu.orderCount}</em></span>
                    </div>

                    <p class="menu-desc">${this.menu.description}</p>
                    <!-- //메뉴정보영역 -->

                    <!-- 메뉴주문영역 -->
                    <div class="order-type-area">
                        <div class="type-select">
                            <div class="title">
                                <svg viewBox="0 0 18 18" class="ico-n-logo">
                                    <path fill-rule="evenodd" fill="currentColor"
                                        d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                                    </path>
                                </svg>
                                주문
                            </div>
                            <div class="tab-switch-box" role="tablist">
                                <a 
                                @click=${() => (this.orderType = '포장')} 
                                class="tab-switch ${this.orderType === '포장' ? 'is-active' : ''}" role="tab">포장
                                    <img src="../assets/images/ico-check.svg" alt="" class="ico-check" aria-hidden="true">
                                </a>
                                <a
                                @click=${() => this.orderType = '매장'} 
                                class="tab-switch ${this.orderType === '포장' ? '' : 'is-active'}" role="tab">매장
                                    <img src="../assets/images/ico-check.svg" alt="" class="ico-check" aria-hidden="true">
                                </a>
                            </div>
                        </div>
                        <div class="type-amount">
                            <div class="title">수량</div>
                            <div class="amount-select">
                                <button class="btn-minus" aria-label="빼기" disabled></button>
                                <span class="amount disabled">1</span>
                                <button class="btn-plus" aria-label="더하기"></button>
                            </div>
                        </div>
                        <button class="btn-order">1개 담기 9,900원</button>
                        <!-- <button class="btn-order" disabled>지금 주문 가능한 시간이 아닙니다.</button> -->
                    </div>
                    <!-- //메뉴주문영역 -->
                </div>
            </div>
            <!-- // 메뉴 주문정보 영역 -->
        </div>

        <!-- 주문자 리뷰 영역 -->
        <div class="menu-review-area">
            <!-- 주문자 사진 -->
            <div class="orderer-img-area">
                <div class="common-inner">
                    <div class="title">주문자 사진<span class="num">99</span></div>
                    <div class="scroll-x">
                        <ul class="orderer-pic-list">
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                            <li class="orderer-pic-item">
                                <a href="" class="orderer-pic-link">
                                    <img src="https://via.placeholder.com/104/fff/000" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- // 주문자 사진 -->

            <!-- 주문자 리뷰 -->
            <div class="orderer-review-area">
                <div class="common-inner">
                    <div class="title">주문자 리뷰<span class="num">999</span></div>
                    <ul class="review-list">
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill"></span>
                                </span>
                                <span class="point">5.0</span>
                            </div>
                            <p class="review-text">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="review-info">
                                <span class="review-nickname">han****</span>
                                <span class="review-date">2021. 11. 14 주문</span>
                            </div>
                        </li>
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 90%;"></span>
                                </span>
                                <span class="point">4.5</span>
                            </div>
                            <p class="review-text">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="review-info">
                                <span class="review-nickname">han****</span>
                                <span class="review-date">2021. 11. 14 주문</span>
                            </div>
                        </li>
                        <li class="review-item">
                            <div class="review-star">
                                <span class="ico-star-group">
                                    <span class="ico-star-group-fill" style="width: 80%;"></span>
                                </span>
                                <span class="point">4.5</span>
                            </div>
                            <p class="review-text">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="review-info">
                                <span class="review-nickname">han****</span>
                                <span class="review-date">2021. 11. 14 주문</span>
                            </div>
                        </li>
                    </ul>
                    <button class="btn-more">더보기</button>
                </div>
            </div>
            <!-- // 주문자 리뷰 -->
        </div>
        <!-- // 주문자 리뷰 영역 -->

        <!-- 옵션 팝업 영역 -->
        <div class="option-popup-area hidden">
            <div class="dimmed-layer light"></div>
            <div class="menu-option-popup">
                <svg class="content-top-pattern" width="100%" height="100%">
                    <defs>
                        <pattern id="pattern-triangle" x="0" y="0" width="10" height="11" patternUnits="userSpaceOnUse">
                            <polygon points="5 5, 10 10, 10 11, 0 11, 0 10"></polygon>
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-triangle)"></rect>
                </svg>
                <div class="content-top">
                    <div class="common-inner">
                        <div class="menu-img-area">
                            <img src="https://via.placeholder.com/70/fff/000" alt="" class="menu-img">
                        </div>
                        <div class="menu-detail-area">
                            <p class="menu-name">
                                <span class="name">메뉴 이름</span>
                                <span class="badge">포장</span>
                            </p>
                            <div class="amount-select">
                                <button class="btn-minus" aria-label="빼기" disabled></button>
                                <span class="amount disabled">1</span>
                                <button class="btn-plus" aria-label="더하기"></button>
                            </div>
                        </div>
                        <button class="btn-close">
                            <img src="../assets/images/ico-close.svg" alt="" class="ico-close">
                        </button>
                    </div>
                </div>

                <div class="content-body">
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
                
                <div class="content-bottom">
                    <button class="btn-order">1개 담기 9,999</button>
                </div>
            </div>
        </div>
        <!-- // 옵션 팝업 영역 -->
    </div>
        `;
    }
}