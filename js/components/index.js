import Header from "./Header.js";
import MenuList from "./MenuList.js"
import OrderTypeList from "./OrderTypeList.js"
import RecentMenuList from "./RecentMenuList.js";
import TabList from "./TabList.js"

// component 단위의 컴포넌트 관리
customElements.define('order-header', Header);
customElements.define('menu-list', MenuList);
customElements.define('order-type-list', OrderTypeList);
customElements.define('tab-list', TabList);
customElements.define('recent-menu-list', RecentMenuList);