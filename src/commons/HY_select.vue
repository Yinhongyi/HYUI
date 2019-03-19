/*
* 下拉选择框:
* 用法: <HY-select @HY_change="func1($event)" @HY_select="func2($event)" :totalData="" :paramsConfig=""></HY-select>;
* totalData = [{}],                                     // 传入的数据,每个数据必须是对象;  必须
* paramsConfig =
* {
*   type: 'single' || 'multiple' ,                      // 单选或多选,默认'single'(单选)
*   bgColor: string,                                    // 背景色
*   dataValueName: string,                              // 需要显示出来的属性名;  必须
*   limitNumber: number,                                // 每页显示的个数,默认全部显示;
* },
* func1: 选中的值有变化时则触发该函数,返回参数是当前选中的所有值,
* func2: 关闭下拉后触发该函数,返回参数是当前选中的所有值,
* */

<template>
    <div>
        <div class="HY-select-container" :style="{'background-color': paramsConfig.bgColor || '#eeeeee'}">
            <div class="HY-select-header" :style="{'background-color': paramsConfig.bgColor || '#eeeeee'}" @click="isHideContent()">
                <div class="HY-selected-data">
                    <p v-for="data in totalData" v-if="data.isSelected">
                        {{data[paramsConfig.dataValueName]}}
                        <span v-if="paramsConfig && paramsConfig.type === 'multiple'" @click="delSelectedData(data, $event)">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-select-checkbox-svg">
                                <rect width="14" height="14" stroke="rgb(0, 47, 167)" stroke-width="1" fill="rgb(0, 47, 167)"></rect>
                                <line x1="4" y1="4" x2="10" y2="10" stroke="white" stroke-width="1.5"></line>
                                <line x1="4" y1="10" x2="10" y2="4" stroke="white" stroke-width="1.5"></line>
                            </svg>
                        </span>
                        <span v-if="paramsConfig && paramsConfig.type === 'multiple'">,</span>
                    </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-select-svg">
                    <path d="M0 0 L6 8 L12 0 L0 0 Z" stroke-width="1px" stroke="gainsboro" fill="rgb(0, 47, 167)"></path>
                </svg>
            </div>
            <div class="HY-select-content" v-if="isShowContent">
                <div class="HY-select-search">
                    <input type="text" class="HY-select-input" v-model="searchData" maxlength="20">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-select-search-svg" @click="search(searchData)">
                        <circle cx="5" cy="5" r="4" stroke="rgb(0, 47, 167)" stroke-width="1" fill="none"></circle>
                        <line x1="7.5" y1="7.5" x2="12" y2="12" stroke="rgb(0, 47, 167)" stroke-width="1"></line>
                    </svg>
                </div>
                <div class="HY-select-content-container">
                    <div class="HY-select-item" v-for="data in currentData" @click="selectData(data)">
                        <div v-if="paramsConfig && paramsConfig.type === 'multiple'" class="check-box">
                            <svg v-if="!data.isSelected" xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-select-checkbox-svg">
                                <rect width="14" height="14" stroke="gainsboro" stroke-width="1" fill="white"></rect>
                            </svg>
                            <svg v-if="data.isSelected" xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-select-checkbox-svg">
                                <rect width="14" height="14" stroke="rgb(0, 47, 167)" stroke-width="1" fill="rgb(0, 47, 167)"></rect>
                                <line x1="2.5" y1="7.5" x2="6.25" y2="10.5" stroke="white" stroke-width="1.5"></line>
                                <line x1="11" y1="4" x2="5.75" y2="10.5" stroke="white" stroke-width="1.5"></line>
                            </svg>

                        </div>
                        <span>{{data[paramsConfig.dataValueName]}}</span>
                    </div>
                    <!--<div>-->
                        <!--page-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HY-select',
        props: ['totalData', 'paramsConfig'],
        data () {
            return {
                isShowContent: false,
                currentData: [],
                limitNumber: 10,
                selectedData: [],
                searchData: ''
            }
        },
        methods: {
            initStyle: function () {
                let svg = document.getElementsByClassName('HY-select-svg')[0];
                svg.style.marginTop = (document.getElementsByClassName('HY-select-container')[0].clientHeight - 8)/2 + 'px';
            },
            initCurrentData: function (page) {
                this.limitNumber = this.paramsConfig.limitNumber ? this.paramsConfig.limitNumber : this.totalData.length;
                let curPage = page || 0;
                for(let i=0;i<this.totalData.length;i++){
                    if(i>=curPage*this.limitNumber && i<(curPage+1)*this.limitNumber){
                        this.currentData.push(this.totalData[i]);
                    }
                }
            },
            delSelectedData: function (data, e) {
                this.$set(data, 'isSelected', false);
                e.stopPropagation();

                this.selectedData = [];
                for(let i=0;i<this.totalData.length;i++){
                    if(this.totalData[i]['isSelected']){
                        this.selectedData.push(this.totalData[i]);
                    }
                }
                this.$emit('HY_change', this.selectedData);
            },
            search: function (data) {
                console.log(data);
            },
            selectData: function (data) {
                if(this.paramsConfig.type === 'multiple'){
                    this.$set(data, 'isSelected', !data.isSelected);
                }else if(this.paramsConfig.type === 'single'){
                    for(let i=0;i<this.totalData.length;i++){
                        this.$set(this.totalData[i], 'isSelected', false);
                    }
                    this.$set(data, 'isSelected', true);

                    this.isHideContent();
                }

                this.selectedData = [];
                for(let i=0;i<this.totalData.length;i++){
                    if(this.totalData[i]['isSelected']){
                        this.selectedData.push(this.totalData[i]);
                    }
                }
                this.$emit('HY_change', this.selectedData);
            },
            isHideContent: function (param) {
                this.isShowContent = !this.isShowContent;
                if(!this.isShowContent){
                    this.$emit('HY_select', this.selectedData);
                }
                if(param){
                    this.isShowContent = false;
                }
            }
        },
        mounted () {
            this.initStyle();
            this.initCurrentData();

            window.addEventListener('touchstart', (e) => {
                this.isHideContent('hide');
            });

            let select = document.getElementsByClassName('HY-select-container')[0];
            select.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            });
        }
    }
</script>
<style scoped>
    .HY-select-container{
        height: 100%;
        position: relative;
        z-index: 999;
    }
    .HY-select-header {
        width: 100%;
        position: relative;
        z-index: 997;
    }
    .HY-selected-data{
        display: inline-block;
        width: calc(100% - 40px);
        border: none;
        background: transparent;
        margin: 8px;
        padding-right: 4px;
    }
    .HY-selected-data p{
        padding: 0 4px;
        margin: 0;
        display: inline-block;
    }
    .HY-select-search{
        position: relative;
        border-bottom: 1px solid gainsboro;
    }
    .HY-select-search-svg{
        position: absolute;
        width: 14px;
        height: 14px;
        top: calc(50% - 7px);
        right: 12px;
    }
    .HY-select-input {
        width: calc(100% - 24px);
        border: none;
        background: white;
        margin: 8px;
        height: 24px;
        font-size: 18px;
        border-radius: 4px;
        padding: 0 4px;
        box-shadow: none;
    }
    .HY-select-input:focus {
        box-shadow: 0 0 2px 1px rgb(0, 47, 167);
        outline: none;
    }
    .HY-select-svg {
        float: right;
        border: none;
        background: transparent;
        width: 16px;
        height: 8px;
        margin-right: 2px
    }
    .HY-select-content{
        background: #efefef;
    }
    .HY-select-content-container{
        padding-bottom: 10px;
    }
    .HY-select-item{
        padding: 8px;
        margin: 8px 0;
    }
    .HY-select-item:hover{
        background: white;
    }
    .check-box{
        display: inline-block;
    }
    .HY-select-checkbox-svg{
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }
</style>
