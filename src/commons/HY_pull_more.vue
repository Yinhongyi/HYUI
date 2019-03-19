/*
* 加载更多:
* 用法: <HY-pull-more pull_type="string1" :paramsConfig="obj1" @loading="func1()" :endAnimation="boolean1" @update:endAnimation="val=>boolean1=val"></HY-pull-more>;
* string1 = 'pullup' || 'pulldown',                     // 类型;  pullup:上拉加载;pulldown:下拉加载; 必须
* obj1 = {
*       text: 'string',                                 // 'show'||'hide' 是否显示提示文字(向上拉加载更多/松开加载/正在加载.../加载完成); 默认显示
*       img: {
*           width: 'string',
*           src: 'string'
*       }
*   },
* boolean1 = boolean,                                   // 关闭加载更多;  在ajax获取数据渲染页面之后使用,boolean1 = true即可; 必须
* @update:endAnimation = 'val=>boolean1=val',           // 必须按格式正确书写, boolean1就是上面的boolean1;
* func1:    上拉或下拉到一定位置触发此函数,在此函数里渲染数据到页面;
* */

<template>
    <div style="overflow: hidden;">
        <div v-if="pull_type === 'pullup'" class="HY-pull-up" :class="{'HY-pull-back': isEnd}" :style="{'height': height}">
            <div v-if="paramsConfig && paramsConfig.img && paramsConfig.img.src">
                <img :src="paramsConfig.img.src" class="HY-img"
                     :style="{'width': paramsConfig && paramsConfig.img && paramsConfig.img.width}">
            </div>
            <div v-if="showText">
                <div class="HY-p20" v-if="state === 'preload'">向上拉加载更多</div>
                <div class="HY-p20" v-if="state === 'canload'">松开加载</div>
                <div class="HY-p20" v-if="state === 'loading'">正在加载...</div>
                <div class="HY-p20" v-if="state === 'finish'">加载完成</div>
            </div>
            <div v-if="!showText">
                <div class="HY-p20" v-if="state === 'preload'">向上拉加载更多</div>
                <div class="HY-p20" v-if="state === 'canload'">松开加载</div>
                <div class="HY-p20" v-if="state === 'loading'">正在加载...</div>
                <div class="HY-p20" v-if="state === 'finish'">加载完成</div>
            </div>
        </div>
        <slot></slot>
        <div v-if="pull_type === 'pulldown'" class="HY-pull-down" :class="{'HY-pull-back': isEnd}" :style="{'height': height}">
            <div v-if="paramsConfig && paramsConfig.img && paramsConfig.img.src">
                <img :src="paramsConfig.img.src" class="HY-img"
                     :style="{'width': paramsConfig && paramsConfig.img && paramsConfig.img.width}">
            </div>
            <div v-if="showText">
                <div class="HY-p20" v-if="state === 'preload'">向上拉加载更多</div>
                <div class="HY-p20" v-if="state === 'canload'">松开加载</div>
                <div class="HY-p20" v-if="state === 'loading'">正在加载...</div>
                <div class="HY-p20" v-if="state === 'finish'">加载完成</div>
            </div>
            <div v-if="!showText">
                <div class="HY-p20" v-if="state === 'preload'">向上拉加载更多</div>
                <div class="HY-p20" v-if="state === 'canload'">松开加载</div>
                <div class="HY-p20" v-if="state === 'loading'">正在加载...</div>
                <div class="HY-p20" v-if="state === 'finish'">加载完成</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HY-pull-more',
        props: ['pull_type', 'endAnimation', 'paramsConfig'],
        data () {
            return {
                startY: 0,
                moveY: 0,
                endY: 0,
                pullEl: null,
                containerEl: null,
                pullupMarginTop: 0,
                type: '',
                isEnd: false,
                height: 0,
                state: 'preload',
                showText: true,
                preloadHeight: 60,
                loadingHeight: 80
            }
        },
        methods: {
            initPullElStyle: function () {
                if(this.pull_type === 'pullup') {
                    this.pullEl = document.getElementsByClassName('HY-pull-up')[0];
                }else if(this.pull_type === 'pulldown'){
                    this.pullEl = document.getElementsByClassName('HY-pull-down')[0];
                }
            },
            touchstart: function (startY) {
                this.type = '';
                this.startY = 0;
                this.state = 'preload';
                if(this.pull_type === 'pullup') {
                    this.containerEl = this.pullEl.nextElementSibling;
                    if (this.containerEl.scrollTop <= 0) {
                        this.startY = startY;
                    }
                }else if(this.pull_type === 'pulldown'){
                    this.containerEl = this.pullEl.previousElementSibling;
                    let lastChild = this.containerEl.children[this.containerEl.children.length - 1];
                    if(lastChild.offsetTop+lastChild.clientHeight-this.containerEl.offsetTop-this.containerEl.clientHeight <= this.containerEl.scrollTop){
                        this.startY = startY;
                    }
                }
            },
            touchmove: function (moveY) {
                if(this.pull_type === 'pullup' && this.startY > 0){
                    this.moveY = moveY - this.startY;
                    if(this.moveY > 0){
                        this.height = -this.pullupMarginTop + this.moveY + 'px';
                    }

                    if(this.moveY > this.preloadHeight) {
                        this.type = 'pullup';
                    }

                    if(this.moveY > this.loadingHeight){
                        this.state = 'canload';
                    }else{
                        this.state = 'preload';
                    }
                }else if(this.pull_type === 'pulldown' && this.startY > 0){
                    this.moveY = moveY - this.startY;

                    if(this.moveY < 0){
                        this.containerEl.style.marginTop = this.pullupMarginTop + this.moveY + 'px';
                        this.containerEl.style.scrollTop = this.pullupMarginTop + this.moveY + 'px';
                        this.height = -this.pullupMarginTop - this.moveY + 'px';
                    }

                    if(this.moveY < -this.preloadHeight){
                        this.type = 'pulldown';
                    }

                    if(this.moveY < -this.loadingHeight){
                        this.state = 'canload';
                    }else{
                        this.state = 'preload';
                    }
                }else{
                    this.state = 'preload';
                }

            },
            touchend: function (endY) {
                if(this.pull_type === 'pullup' && this.type === 'pullup' && this.moveY > this.loadingHeight){
                    this.height = 'auto';
                    this.$emit('loading');
                    this.state = 'loading';
                }else if(this.pull_type === 'pulldown' && this.type === 'pulldown' && this.moveY < -this.loadingHeight){
                    this.height = 'auto';
                    setTimeout(()=>{
                        this.containerEl.style.marginTop = - this.pullEl.clientHeight + 'px';
                    },100);
                    this.$emit('loading');
                    this.state = 'loading';
                }else{
                    this.containerEl.style.marginTop = 0;
                    this.height = 0;
                    this.state = 'preload';
                }

            },
            end: function () {
                this.state = 'finish';
                setTimeout(()=>{
                    this.height = 0;
                    this.containerEl.style.marginTop = 0;
                    this.$emit('update:endAnimation',false);
                },800)
            }

        },
        mounted () {
            let container = this.pull_type === 'pullup' ? document.getElementsByClassName('HY-pull-up')[0]['parentNode'] :
                (this.pull_type === 'pulldown' ? document.getElementsByClassName('HY-pull-down')[0]['parentNode'] : null);
            container.addEventListener('touchstart', (e) => {
                this.touchstart(e['changedTouches'][0]['clientY']);
            });
            container.addEventListener('touchmove', (e) => {
                this.touchmove(e['changedTouches'][0]['clientY']);
            });
            container.addEventListener('touchend', (e) => {
                this.touchend(e['changedTouches'][0]['clientY']);
            });

            this.initPullElStyle();
            this.showText = this.paramsConfig && this.paramsConfig.text ? this.paramsConfig.text === 'show' : true;
        },
        watch: {
            endAnimation: function (newData, oldData) {
                if(newData){
                    this.end();
                }
            }
        }
    }
</script>
<style scoped>
    .HY-pull-up{
        text-align: center;
        overflow: hidden;
        background: #eeeeee;
        height: 0;
    }
    .HY-pull-down{
        text-align: center;
        overflow: hidden;
        background: #eeeeee;
        height: 0;
    }
    .HY-pull-back{
        animation:hidePull 1s forwards ;
        -webkit-animation:hidePull 1s forwards ;
    }
    @keyframes hidePull{
        0% {
            height: auto;
        }
        100% {
            height: 0;
        }
    }
    @-webkit-keyframes hidePull{
        0% {
            height: auto;
        }
        100% {
            height: 0;
        }
    }
    .HY-p20{
        padding: 20px 0;
    }
    .HY-img{
        width: 100%;
        -webkit-background-size: 40% 100%;
        background-size: 40% 100%;
    }
</style>
