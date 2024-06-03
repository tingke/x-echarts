import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";

import xecharts from './x-echarts';
// import xecharts from "x-echarts";

let app = createApp(App);

// pChart(app);

app.use(xecharts, {
    TOOLTIP_BG_COLOR: '#4E506B',
    TOOLTIP_FONT_COLOR: '#D9F2FF'
}).mount("#app");
