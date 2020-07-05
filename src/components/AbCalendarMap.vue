<template>

<div class="ab-calendar-map">
    <div class="mr-4">
        <table class="mb-2">
            <tr>
                <th
                    v-for="(day, index) in daysLabels"
                    :key="index"
                    class="text-xs pb-2"
                >
                    {{ day }}
                </th>
            </tr>
            <tr v-for="(mapRow, row) in map" :key="row" class="row">
                <td v-for="(item, col) in mapRow" :key="col">
                    <el-tooltip
                        v-if="item.value !== null"
                        transition="el-opacity-transition"
                        :content="`${item.date}: ${item.value}`"
                        placement="top"
                    >
                        <span class="item" :style="item.style" />
                    </el-tooltip>
                    <span v-else class="item" :style="item.style" />
                </td>
            </tr>
        </table>
        <div class="flex-row jb ac">
            <el-button
                type="text"
                icon="el-icon-arrow-left"
                class="p-0"
                @click="prevMonth"
            />
            <div class="mx-2 text-sm">{{ `${monthLabel}, ${year}` }}</div>
            <el-button
                type="text"
                icon="el-icon-arrow-right"
                class="p-0"
                @click="nextMonth"
            />
        </div>
    </div>

    <div
        class="flex-row js text-xs"
    >
        <div class="bar mr-2" :style="barStyle" />
        <div class="flex-column as jb">
            <div>{{ maxValue }}</div>
            <div>0</div>
        </div>
    </div>

</div>

</template>

<script>

function gradient(fromColor, toColor, ratio) {
    if (ratio > 1) {
        ratio = 1.0;
    } else if (ratio < 0) {
        ratio = 0.0;
    }

    if (ratio === 0.0) {
        return toColor;
    } else if (ratio === 1.0) {
        return fromColor;
    }

    fromColor = fromColor.slice(1);
    toColor = toColor.slice(1);

    const hex = (x) => {
        x = x.toString(16);
        return (x.length === 1) ? '0' + x : x;
    };

    const val = (i, j) => {
        return Math.ceil(
            parseInt(fromColor.substring(i, j), 16) * ratio +
            parseInt(toColor.substring(i, j), 16) * (1 - ratio)
        );
    };

    return '#' + hex(val(0, 2)) + hex(val(2, 4)) + hex(val(4, 6));
}

const rowsCount = 6;
const colsCount = 7;
const colorsCount = 50;

export default {
    name: 'AbCalendarMap',

    props: {
        values: {
          type: Object,
          default: function() {
            return {};
          }
        },
        colors: {
            type: Array,
            default: function() {
                return [
                    '#def2ff',
                    '#304aff'
                ];
            }
        },
        padding: {
            type: Number,
            default: 4
        },
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        },
        daysLabels: {
            type: Array,
            default: function() {
                return ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
            }
        },
        monthsLabels: {
            type: Array,
            default: function() {
                return [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ];
            }
        }
    },

    data() {
        const date = new Date();
        return {
            month: date.getMonth(),
            year: date.getFullYear()
        };
    },

    computed: {
        map() {
            const nDays = this.daysInMonth.length;
            const first = this.daysInMonth[0].getDay();

            const map = new Array(rowsCount);
            for (let i = 0; i < rowsCount; i++) {
                map[i] = new Array(colsCount);
            }

            for (let i = 0; i < rowsCount; i++) {
                for (let j = 0; j < colsCount; j++) {
                    const n = i * colsCount + j - first;
                    const disable = n < 0 || n >= nDays;
                    let value = null;
                    let date = null;
                    let color = '#f5f7fa';

                    if (!disable) {
                        date = this.daysInMonth[n].toISOString().substring(0, 10);
                        value = this.values[date] | 0;
                        const ratio = this.maxValue > 0 ? (value / this.maxValue) : 0;
                        const colorInd = Math.floor(ratio * (colorsCount - 1));
                        color = this.colorMap[colorInd];
                    }

                    map[i][j] = {
                        value: value,
                        date: date,
                        style: {
                            width: this.width + 'px',
                            height: this.height + 'px',
                            backgroundColor: color,
                            borderRadius: '3px',
                            marginRight: this.padding + 'px',
                            marginBottom: this.padding + 'px'
                        }
                    };
                }
            }

            return map;
        },

        daysInMonth() {
            const date = new Date(this.year, this.month, 1);
            const days = [];
            while (date.getMonth() === this.month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        },

        maxValue() {
            const values = Object.values(this.values);
            return values.length ? Math.max(...values) : 0;
        },

        monthLabel() {
            return this.monthsLabels[this.month];
        },

        barStyle() {
            return {background: `linear-gradient(
                ${this.colors[1]} 0%, ${this.colors[0]} 100%)`
            };
        },

        colorMap() {
            const colorMap = new Array(colorsCount);
            for (let i = 0; i < colorsCount; i++) {
                colorMap[i] = gradient(
                    this.colors[0], this.colors[1], 1 - i / (colorsCount - 1)
                );
            }
            return colorMap;
        }
    },

    methods: {
        prevMonth() {
            const date = new Date(this.daysInMonth[0]);
            date.setDate(date.getDate() - 1);
            this.month = date.getMonth();
            this.year = date.getFullYear();
        },
        nextMonth() {
            const nDays = this.daysInMonth.length;
            const date = new Date(this.daysInMonth[nDays - 1]);
            date.setDate(date.getDate() + 1);
            this.month = date.getMonth();
            this.year = date.getFullYear();
        }
    }
};

</script>

<style lang="scss">

.ab-calendar-map {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

    table {
        border-spacing: 0;
        border-collapse: collapse;
        td {
            padding: 0;
        }
    }
    .item {
        display: block;
    }
    .bar {
        height: 100%;
        width: 12px;
        border-radius: 6px;
    }
}

</style>
