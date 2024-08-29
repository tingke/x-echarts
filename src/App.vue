<script setup>
import { reactive, ref } from "vue";

const lineData = reactive({
    xAxis: ["2014年", "2015年", "2016年", "2017年", "2018年", "2019年"],
    yAxis: [
        {
            min: 0,
            max: 100,
            minInterval: 25,
            axisLabel: {
                formatter: "{value}%",
            },
        },
        {
            type: 'value',
        },
    ],
    series: [
        {
            name: "2018年",
            data: [22, 33, 28, 36, 28, 35],
        },
        {
            name: "2019年",
            data: [28, 36, 28, 35, 22, 33],
        },
        {
            name: "2020年",
            yAxisIndex: 1,
            data: [28, 36, 28, 35, 22, 33],
        },
    ],
});

const pieData = reactive([
    { name: "A类", value: 5 },
    { name: "B类", value: 5 },
    { name: "C类", value: 30 },
    { name: "D类", value: 20 },
    { name: "E类", value: 10 },
    { name: "F类", value: 2 },
]);

const echart = reactive({
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            crossStyle: {
                color: "#999",
            },
        },
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    },
    legend: {},
    xAxis: [
        {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
                type: "shadow",
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "Precipitation",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: "{value} ml",
            },
        },
        {
            type: "value",
            name: "Temperature",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: "{value} °C",
            },
        },
    ],
    series: [
        {
            name: "Evaporation",
            type: "bar",
            tooltip: {
                valueFormatter: function (value) {
                    return value + " ml";
                },
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        },
        {
            name: "Precipitation",
            type: "bar",
            tooltip: {
                valueFormatter: function (value) {
                    return value + " ml";
                },
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value) {
                    return value + " °C";
                },
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        },
    ],
});

const formatter = (params) => {
    // console.log("zzzz", params);
    let div = "";
    params.forEach((item) => {
        const { color } = item;
        div += `<div> <span style="display: inline-block;width: 10px; height:10px; background-color: ${color};"></span> ${item.axisValue} ${item.data} </div>`;
    });
    // var color = params[0].color; // 获取图例颜色
    // var res = '<div style="background-color: ' + color || '#f00' + '; width: 20px; height: 20px; border: 1px solid #ddd; border-radius: 4px; display: inline-block; margin-right: 10px;"></div>';
    // res += params[0].seriesName + " : " + params[0].value;
    return div;
};

const autoresize = ref(true);

</script>

<template>
    <div>
        <!-- <e-line
            :data="lineData"
            :autoresize="autoresize"
            :config="{
                showFillArea: true,
                valueAxis: 'x'
            }"
            :option="{
                tooltip: {
                    fontSize: '20px',
                    formatter: formatter,
                },
            }"
            style="width: 100%; height: 400px"
        >
        </e-line> -->
        <e-stack-bar
            :data="lineData"
            :config="{
                pictorial: 'circle',
                showFillArea: true,
                // valueAxis: 'x'
            }"
            :option="{
                tooltip: {
                    fontSize: '20px',
                    formatter: formatter,
                },
            }"
            style="width: 100%; height: 400px"
        >
        </e-stack-bar>
        <e-pie :data="pieData" style="width: 400px; height: 400px"></e-pie>
        <e-chart :option="echart" style="width: 400px; height: 400px"></e-chart>
    </div>
</template>
