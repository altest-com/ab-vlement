<template>
    <div :style="{ height: height, width: width }" />
</template>

<script>
require('echarts/theme/macarons'); // echarts theme
import ChartMixin from './ChartMixin';

export default {
    name: 'AbChartTwoAxis',

    mixins: [ChartMixin],

    props: {
        xlabel: {
            type: String,
            default: ''
        },
        ylabel: {
            type: Array,
            default: () => []
        },
        gradient: {
            type: Boolean,
            default: true
        },
        gridOptions: {
            type: Object,
            default: () => {}
        },
        legendOptions: {
            type: Object,
            default: () => {}
        },
        xAxisOptions: {
            type: Object,
            default: () => {}
        },
        yAxisOptions: {
            type: Object,
            default: () => {}
        },
        seriesOptions: {
            type: Object,
            default: () => {}
        }
    },

    methods: {
        setOptions() {
            const series = [];
            this.chartData.series.forEach((data, index) => {
                const color = data.color;

                series.push({
                    symbol: data.symbol || 'none',
                    itemStyle: {
                        color: color,
                        lineStyle: {
                            width: data.width || 3
                        }
                    },
                    areaStyle: {
                        color: data.area || 'rgba(255, 0, 0, 0.1)'
                    },
                    smooth: true,
                    type: 'line',
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    name: data.name || index,
                    data: data.value,
                    yAxisIndex: data.yAxisIndex,
                    ...this.seriesOptions
                });
            });

            const yAxis = {
                name: this.ylabel,
                nameLocation: 'center',
                nameTextStyle: {
                    color: '#777',
                    fontWeight: 600
                },
                nameGap: 36,
                splitLine: {
                    show: true
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                },
                min: 0,
                ...this.yAxisOptions
            };

            this.chart.setOption({
                xAxis: {
                    name: this.xlabel,
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#777',
                        fontWeight: 600
                    },
                    nameGap: 36,
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10,
                    data: this.chartData.label,
                    ...this.xAxisOptions
                },
                yAxis: [{
                    ...yAxis,
                    name: this.ylabel[0]
                }, {
                    ...yAxis,
                    name: this.ylabel[1]
                }],
                legend: {
                    show: true,
                    left: 'right',
                    itemWidth: 12,
                    itemHeight: 12,
                    ...this.legendOptions
                },
                grid: {
                    show: false,
                    left: 50,
                    right: 50,
                    containLabel: false,
                    ...this.gridOptions
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none',
                        snap: false
                    },
                    padding: [5, 10]
                },
                series: series
            });
        },

        updateCharData() {
            if (this.chart) {
                const series = [];
                this.chartData.series.forEach((data, index) => {
                    series.push({
                        name: data.name || index,
                        data: data.value
                    });
                });

                this.chart.setOption({
                    xAxis: {
                        data: this.chartData.label
                    },
                    series: series
                });
            }            
        }
    }
};
</script>
