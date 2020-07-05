<template>

<div class="ab-auto-avatar" :style="outerStyle">
    <img v-if="image" :src="image" alt="">
    <div v-else class="no-image" :style="innerStyle">
        {{ letter }}
    </div>
</div>

</template>

<script>

export default {
    name: 'AbAutoAvatar',

    props: {
        image: {
            type: [String, null],
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '64px'
        },
        fontSize: {
            type: String,
            default: '24px'
        },
        background: {
            type: String,
            default: '#eee'
        },
        color: {
            type: String,
            default: '#aaa'
        }
    },

    computed: {
        outerStyle() {
            return {
                'width': this.size,
                'height': this.size
            };
        },
        innerStyle() {
            return {
                'color': this.color,
                'background-color': this.background,
                'line-height': this.size,
                'font-size': this.fontSize
            };
        },
        letter() {
            return this.text ? this.text[0] : '';
        }
    }
};
</script>

<style lang="scss">

.ab-auto-avatar {
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
    .no-image {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        text-align: center;
        font-weight: 600;
    }
}

</style>
