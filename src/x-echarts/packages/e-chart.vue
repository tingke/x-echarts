<!-- @format -->

<template>
    <div ref="chart" :class="className"></div>
</template>

<script>
import mixin from '../src/util/mixin';
import CONFIG from '../src/config/config';

import {
    AXIS_STYLE,
    LEGEND,
    TOOLTIP,
    getColor,
    getFontColor,
    getNoDataOption
} from '../src/util/nomalChart';
import util from '../src/util/util';

export default {
    name: 'EChart',
    mixins: [mixin],
    methods: {
        refreshChart() {
            try {
                let opts = this.initChart();


                //避免无数据时 option中的series配置项（没有type）导致报错
                if (!opts.series || !opts.series[0]) {
                    delete opts.series;
                }

                opts = util.merge({}, this.defaultOpt, opts);
                this.chart.setOption(opts, true);
                this.setStyle(opts);

                // 判断是否打印配置
                if (this.showOption) {
                    console.log(JSON.stringify(opts));
                    console.log(opts);
                }
                this.finalOpt = opts;
            } catch (e) {
                console.warn(e); //打印错误提示
                let opts = getNoDataOption(); //已异常时使用无数据内容代替r
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
        initChart() {
            let option = util.deepClone(this.option);
            if (option.legend) {
                option.legend = util.merge(LEGEND(), option.legend);
            }

            option.color = option.color || getColor();
            option.textStyle = {
                color: getFontColor(),
                fontSize: CONFIG.FONT_S
            };

            //当配置项有坐标轴时， 取坐标轴的统一样式， 并使统一样式优先级低于设置样式
            let xAxis = option.xAxis;
            if (option.xAxis) {
                if (xAxis.constructor === Array) {
                    xAxis.forEach((v, i) => {
                        xAxis[i] = util.merge({}, AXIS_STYLE(), v);
                    });
                } else {
                    xAxis = util.merge(AXIS_STYLE(), xAxis);
                }
            }
            option.xAxis = xAxis;

            let yAxis = option.yAxis;
            if (option.yAxis) {
                if (yAxis.constructor === Array) {
                    yAxis.forEach((v, i) => {
                        yAxis[i] = util.merge({}, AXIS_STYLE(), v);
                    });
                } else {
                    yAxis = util.merge({}, AXIS_STYLE(), yAxis);
                }
            }
            option.yAxis = yAxis;

            if (option.series) {
                option.series.forEach((v) => {
                    if (v.type === 'bar' && !v.barWidth && !v.barMaxWidth) {
                        v.barMaxWidth = 20;
                    }
                });
            }

            if (option.tooltip) {
                option.tooltip = {
                    ...TOOLTIP(),
                    ...option.tooltip
                };
            }
            return option;
        }
    }
};
</script>

<style scoped></style>
