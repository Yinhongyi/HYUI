/*
* 弹出框:
* 用法: <HY-alert @HY_toggle="func1($event)"></HY-alert>;
* func1:    点击时触发，返回当前选中的状态boolean;
* 必须设定初始宽高样式
* */


<template>
    <div v-if="isShowAlert">
        <div class="HY-alert">
            <div class="HY-alert-container" :style="{'top': containerTop + 'px'}">
                <div class="HY-alert-head">warning</div>
                <div class="HY-alert-content">sahwiufiuwediuw</div>
                <div class="HY-alert-btn">
                    <div class="HY-cancel-btn" @click="isShowAlert = false">cancel</div>
                    <div class="HY-ok-btn" @click="isShowAlert = false">ok</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HY-alert',
        data () {
            return {
                containerTop: 0,
                isShowAlert: true
            }
        },
        methods: {
        },
        mounted () {
            let alertEl = document.getElementsByClassName('HY-alert');
            let alertContainerEl = document.getElementsByClassName('HY-alert-container');
            this.containerTop = (alertEl[0].clientHeight - alertContainerEl[0].clientHeight) / 2;
        }
    }
</script>
<style scoped>
    .HY-alert {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(220, 220, 220, 0.4);
        z-index: 999;
    }
    .HY-alert-container{
        width: 80%;
        position: relative;
        left: 10%;
        height: auto;
        text-align: center;
        background: white;
        border-radius: 8px;
    }
    .HY-alert-head{
        border-bottom: 1px solid gainsboro;
        text-align: left;
        padding: 12px;
    }
    .HY-alert-content{
        padding: 12px;
    }
    .HY-alert-btn{
        padding: 0 12px 12px;
    }
    .HY-cancel-btn{
        display: inline-block;
    }
    .HY-ok-btn{
        display: inline-block;
    }
</style>
