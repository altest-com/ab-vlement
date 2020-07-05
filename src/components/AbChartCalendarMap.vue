<template>
    <div :style="{ height: height, width: width }">
    </div>
</template>

<script>

require('echarts/theme/macarons'); // echarts theme
import ChartMixin from './ChartMixin';

export default {
    name: 'AbChartCalendarMap',

    mixins: [ChartMixin],

    props: {
        height: {
            type: String,
            default: '200px'
        },
        chartData: {
            type: Array,
            required: true
        },
        seriesOptions: {
            type: Object,
            default: () => {}
        },
        calendarOptions: {
            type: Object,
            default: () => {}
        },
        visualMapOptions: {
            type: Object,
            default: () => {}
        },
        tooltipOptions: {
            type: Object,
            default: () => {}
        }
    },

    computed: {
        thisYear() {
            return new Date().getFullYear();
        }
    },

    methods: {
        setOptions() {
            this.chart.setOption({
                tooltip: {
                    position: 'top',
                    ...this.tooltipOptions
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    ...this.visualMapOptions
                },
                calendar: {
                    top: 80,
                    left: 36,
                    right: 18,
                    cellSize: ['auto', 16],
                    range: this.thisYear,
                    itemStyle: {
                        borderWidth: 0.25,
                        borderColor: '#ddd'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#bbb'
                        }
                    },
                    yearLabel: { show: false },
                    dayLabel: {
                        nameMap: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
                    },
                    monthLabel: {
                        margin: 12,
                        nameMap: [
                            'Ene', 'Feb', 'Mar',
                            'Abr', 'May', 'Jun',
                            'Jul', 'Ago', 'Sep',
                            'Oct', 'Nov', 'Dic'
                        ]
                    },
                    ...this.calendarOptions
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: this.chartData,
                    ...this.seriesOptions
                }
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
