import resize from './ChartResizeMixin';
import echarts from 'echarts';

export default {
    mixins: [resize],

    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        chartData: {
            type: Object,
            required: true
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        watch: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            chart: null
        };
    },

    created() {
        if (this.watch) {
            this.$watch('chartData', function() {
                this.updateCharData();
            }, {deep: true});
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },

    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }        
    },

    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons');
            this.setOptions();
        }
    }
};
