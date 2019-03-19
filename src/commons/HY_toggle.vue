/*
* 切换开关:
* 用法: <HY-toggle @HY_toggle="func1($event)"></HY-toggle>;
* func1:    点击时触发，返回当前选中的状态boolean;
* 必须设定初始宽高样式
* */

<template>
    <div @click="toggle()">
        <div v-if="isSelected" class="theme-bg theme-border HY-toggle">
            <div class="circle circle-l" :style="{'width':d,'height':d}"></div>
        </div>
        <div v-if="!isSelected" class="disabled-bg disabled-border HY-toggle">
            <div class="circle circle-r" :style="{'width':d,'height':d}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HY-toggle',
        data () {
            return {
                isSelected: true,
                d: ''
            }
        },
        methods: {
            initCircleStyle: function () {
                let toggleEl = document.getElementsByClassName('HY-toggle');
                this.d = toggleEl[0].clientHeight + 'px';
            },
            toggle: function () {
                this.isSelected = !this.isSelected;
                this.$emit('HY_toggle', this.isSelected);
            }
        },
        mounted () {
            this.initCircleStyle();
        }
    }
</script>
<style scoped>
    .HY-toggle {
        position: relative;
        display: inline-block;
    }
    .circle{
        background: white;
        border-radius: 100%;
        position: absolute;
    }
    .circle-l{
        left: 0;
    }
    .circle-r{
        right: 0;
    }
</style>
