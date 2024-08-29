<script setup>
import { reactive } from "vue";

const lineData = reactive({
    xAxis: ["2014年", "2015年", "2016年", "2017年", "2018年", "2019年"],
    series: [
        {
            name: "2018年",
            data: [22, 33, 28, 36, 28, 35],
        },
        {
            name: "2019年",
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
</script>

<template>
    <div>
        <e-line
            :data="lineData"
            :config="{
                showFillArea: true,
            }"
            :option="{
                tooltip: {
                    fontSize: '20px',
                    formatter: formatter
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    minInterval: 25,
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
            }"
            style="width: 600px; height: 400px"
        >
        </e-line>
        <e-pie :data="pieData" style="width: 400px; height: 400px"></e-pie>
    </div>
</template>
