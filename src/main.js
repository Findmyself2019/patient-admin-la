import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "./permission";
import "./assets/icons";
import { getConfigKey } from "@/api/dispose";
import permission from "./directive/permission"; //认证插件
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  download,
  handleTree
} from "@/util/ruoyi";
import pagination from "@/components/pagination";
Vue.component("Pagination", pagination);
Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
};

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
};
// 全局方法挂载
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;
import {
  Pagination,
  Dialog,
  Autocomplete,
  Button,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Tooltip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  MenuItemGroup,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Input,
  Form,
  FormItem,
  DatePicker,
  Select,
  Checkbox,
  Tree,
  InputNumber,
  RadioGroup,
  Switch,
  Row,
  Col,
  Radio,
  Option,
  Tag,
  Link,
  Upload,
  Cascader,
  Loading,
  MessageBox,
  Message,
  Notification
} from "element-ui";
[
  Pagination,
  Dialog,
  Autocomplete,
  Button,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Tooltip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  MenuItemGroup,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Input,
  Form,
  FormItem,
  DatePicker,
  Select,
  Checkbox,
  Tree,
  InputNumber,
  RadioGroup,
  Switch,
  Row,
  Col,
  Radio,
  Option,
  Tag,
  Upload,
  Link,
  Cascader
].forEach(item => Vue.use(item));
Vue.use(Loading.directive);
Vue.config.productionTip = false;
Vue.use(permission);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
