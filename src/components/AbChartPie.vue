<template>
    <div :style="{ height: height, width: width }">
    </div>
</template>

<script>

require('echarts/theme/macarons'); // echarts theme
import ChartMixin from './ChartMixin';

export default {
    name: 'AbChartPie',

    mixins: [ChartMixin],

    props: {
        width: {
            type: String,
            default: '250px'
        },
        chartData: {
            type: Array,
            required: true
        },
        legendOptions: {
            type: Object,
            default: () => {}
        },
        seriesOptions: {
            type: Object,
            default: () => {}
        },
        tooltipOptions: {
            type: Object,
            default: () => {}
        }
    },

    methods: {
        setOptions() {
            this.chart.setOption({
                tooltip: this.tooltipOptions,
                legend: {
                    orient: 'vertical',
                    itemWidth: 12,
                    itemHeight: 12,
                    ...this.legendOptions
                },
                series: [{
                    type: 'pie',
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600,
                    hoverAnimation: false,
                    label: {
                        show: false
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.chartData,
                    ...this.seriesOptions
                }]
            });
        },

        updateCharData() {
            if (this.chart) {
                this.chart.setOption({
                    series: [{
                        data: this.chartData
                    }]
                });
            }            
        }
    }
};
</script>
