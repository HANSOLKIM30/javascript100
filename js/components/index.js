import AccordionList from "./AccordionList.js";
import Header from "./Header.js";
import MenuDetail from "./menuDetail.js";
import MenuList from "./MenuList.js"
import MenuPictureList from "./MenuPictureList.js";
import OptionPopup from "./OptionPopup.js";
import OrderSelectList from "./OrderSelectList.js";
import OrderTypeList from "./OrderTypeList.js"
import RecentMenuList from "./RecentMenuList.js";
import ReviewList from "./ReviewList.js";
import TabList from "./TabList.js"
import ToppingAmountOptionGroup from "./ToppingAmountOptionGroup.js";
import ToppingBaseOptionGroup from "./ToppingBaseOptionGroup.js";
import ToppingSelectOptionGroup from "./ToppingSelectOptionGroup.js";

// component 단위의 컴포넌트 관리
customElements.define('order-header', Header);
customElements.define('menu-list', MenuList);
customElements.define('order-type-list', OrderTypeList);
customElements.define('tab-list', TabList);
customElements.define('recent-menu-list', RecentMenuList);
customElements.define('option-popup', OptionPopup);
customElements.define('topping-base-option-groups', ToppingBaseOptionGroup);
customElements.define('topping-select-option-groups', ToppingSelectOptionGroup);
customElements.define('topping-amount-option-groups', ToppingAmountOptionGroup);
customElements.define('menu-picture-list', MenuPictureList);
customElements.define('review-list', ReviewList);
customElements.define('menu-detail', MenuDetail);
customElements.define('order-select-list', OrderSelectList);
customElements.define('accordion-list', AccordionList);