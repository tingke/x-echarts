/** @format */

import CONFIG from "../config/config";
import { getNoDataOption, getFontColor } from "../../src/util/nomalChart";
import util from "./util";
import * as echarts from "echarts";

export default {
    data() {
        return {
            finalOpt: null,
            // chart: null,
            defaultOpt: {
                textStyle: {
                    color: getFontColor(),
                    fontSize: CONFIG.FONT_S,
                    fontFamily: CONFIG.FONT_FAMILY,
                },
                toolbox: {
                    show: CONFIG.SHOW_TOOLBOX,
                    feature: {
                        saveAsImage: {
                            backgroundColor: CONFIG.BG_COLOR,
                        },
                        restore: {},
                    },
                    iconStyle: {
                        borderColor: getFontColor(),
                    },
                },
            },
            className: "",
        };
    },
    props: {
        // echarts图标的各种数据项目
        data: {
            // type: Object,
            default: function () {
                return {
                    xAxisData: [],
                    legendData: [],
                    seriesData: [],
                };
            },
        },
        // 替换echarts的配置项
        option: {
            type: Object,
            default: function () {
                return {};
            },
        },
        //配置项
        config: {
            type: Object,
            default: function () {
                return {};
            },
        },
        showOption: {
            type: Boolean,
            default: false,
        },
        autoresize: Boolean,
        onClick: {
            type: Function,
        },
    },
    watch: {
        data: {
            handler(val) {
                this.reloadChart();
            },
            deep: true,
        },
        option: {
            handler(val) {
                this.reloadChart();
            },
            deep: true,
        },
        config: {
            handler(val) {
                this.reloadChart();
            },
            deep: true,
        },
        autoresize() {
            this.listenResize();
        },
    },
    created() {
        // reloadChart 延迟调用，在同时 watch 属性：data, option, config 的时候，可能调用组件时会修改这三个属性，会导致重复调用三次
        // 使用 debounce 来防抖动，只让最后一次调用生效，减少频繁刷新。
        this.reloadChart = util.debounce(this.refreshChart, 100);
    },
    mounted() {
        this._renderChart();
        this.autoresize && this.listenResize();
    },
    methods: {
        listenResize() {
            if (this.autoresize) {
                if (!this._ro) {
                    this._ro = new ResizeObserver(() => {
                        setTimeout(() => {
                            const keys = Object.keys(this.finalOpt);
                            keys.length > 0 && this.chart && this.chart.resize();
                        }, 10);
                    });
                }
                this._ro.observe(this.$refs.chart);
            } else {
                this._ro && this._ro.disconnect();
                this._ro = null;
            }
        },
        setStyle(option) {
            this.className = option.series ? "" : "p-chart-no-data";
        },
        getOption() {
            return this.finalOpt;
        },
        refreshChart() {
            try {
                let opts = this.initChart();

                if (opts) {
                    let option = util.deepClone(this.option);
                    //避免无数据时 option中的series配置项（没有type）导致报错
                    if (!opts.series || !opts.series[0]) {
                        delete option.series;
                    }

                    opts = util.merge({}, this.defaultOpt, opts, option);
                    this.chart.setOption(opts, true);
                    this.setStyle(opts);

                    // 判断是否打印配置
                    if (this.showOption) {
                        console.log(JSON.stringify(opts));
                        console.log(opts);
                    }
                    this.finalOpt = opts;
                }
            } catch (e) {
                console.warn(e); //打印错误提示
                let opts = getNoDataOption(); //已异常时使用无数据内容代替
                this.chart.setOption(opts, true);
                this.setStyle(opts);

                // 判断是否打印配置
                if (this.showOption) {
                    console.log(JSON.stringify(opts));
                    console.log(opts);
                }
                this.finalOpt = opts;
            }
        },
        _renderChart() {
            this.chart = echarts.init(this.$refs.chart);

            // 渲染echarts
            this.refreshChart();

            CONFIG.EVENTS.forEach((event) => {
                this.chart.on(event, (params) => {
                    this.$emit(event, params);
                });
            });

            if (window.Vuep) {
                this.chart.on("dblclick", () => {
                    console.log(JSON.stringify(this.finalOpt));
                });
            }
        },
    },
};
