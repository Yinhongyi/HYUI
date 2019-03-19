<template>
    <!-- App -->
    <div id="app">



        <HY-toggle class="toggle-style" @HY_toggle="test($event)"></HY-toggle>

        <div class="theme-color" v-HYTipBox="tipsConfig">test</div>
        <div class="theme-color" v-HYTipBox="tipsConfig1">test</div>
        <div class="theme-color" v-HYTipBox="tipsConfig2">test</div>
        <div class="theme-color" v-HYTipBox="tipsConfig3">test</div>

        <HY-select class="select-style" @HY_change="changedData($event)" @HY_select="selectedData($event)" :totalData="selectData" :paramsConfig="selectParamsConfig"></HY-select>

        <HY-pagination :totalNumber="638" :limitNumber="6" @HY_page="currentPage($event)" :simpleType="true"></HY-pagination>

        <!--<HY-pull-more pull_type="pullup" @loading="pullLoading()" :endAnimation="endAnimation" @update:endAnimation="val=>endAnimation=val">-->
        <HY-pull-more pull_type="pulldown" @loading="pullLoading()" :paramsConfig="pullConfig" :endAnimation="endAnimation" @update:endAnimation="val=>endAnimation=val">
            <div class="pull-test">
                <div>pull-test</div>
                <div>jdoiwuhefdu</div>
                <div>128432y4</div>
                <div>#*&！￥&</div>
                <div>ttttt</div>
                <div>opopopopopopopopo</div>
                <div>vvvvwfeewf</div>
                <div>mmmm</div>
                <div>aaaaaaaaaaaaaa</div>
                <div>iiiiiiiiiiiiiiiiiii</div>
                <div>iiiiiiiiiiiiiiiiiii</div>
                <div>iiiiiiiiiiiiiiiiiii</div>
                <div>iiiiiiiiiiiiiiiiiii</div>
                <div>iiiiiiiiiiiiiiiiiii</div>
            </div>
        </HY-pull-more>

        <!--<div v-for="data in radioTestList">-->
            <!--<HY-radio group="'test'" class="radio" :isChecked="data.checked" @update:isChecked="val=>data.checked=val" @HY_radio="radio($event)"></HY-radio>-->
            <!--<span>{{data.name}}</span>-->
        <!--</div>-->
        <!--<div v-for="data in radioTestList">-->
            <!--<HY-radio group="'test1'" class="radio" :isChecked="data.checked" @update:isChecked="val=>data.checked=val" @HY_radio="radio($event)"></HY-radio>-->
            <!--<span>another{{data.name}}</span>-->
        <!--</div>-->

        <HY-radio class="radio" :isChecked="checked" @update:isChecked="val=>checked=val" @HY_radio="radio($event)"></HY-radio>

        <div v-for="data in checkboxList">
            <HY-checkbox class="radio" :isChecked="data.checked" @update:isChecked="val=>data.checked=val" @HY_checkbox="checkbox($event)"></HY-checkbox>
            <span>{{data.name}}</span>
        </div>

        <div>
            <table class="table-test" v-HYTableResize>
                <thead>
                <tr>
                    <th width="10%">
                        1
                        <!--<div class="resize-line"></div>-->
                    </th>
                    <th width="20%">
                        2
                    </th>
                    <th width="30%">
                        3
                    </th>
                    <th width="40%">
                        4
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        sdfewrg
                    </td>
                    <td>
                        sdfewrg
                    </td>
                    <td>
                        sdfewrg
                    </td>
                    <!--<td>-->
                        <!--sdfewrg-->
                    <!--</td>-->
                </tr>
                </tbody>
            </table>
        </div>

        <HY-alert v-if="isShowAlert"></HY-alert>

    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                /*HYTipBox*/
                /*HYTipBox配置参数*/
                tipsConfig: {
                    position:'',
                    text:'右  (默认)等待2s消失'
                },
                tipsConfig1: {
                    position:'top',
                    text:'上  等待1.5s消失',
                    time: 1500
                },
                tipsConfig2: {
                    position:'down',
                    text:'下  等待0.5s消失',
                    time: 500
                },
                tipsConfig3: {
                    position:'left',
                    text:'左  等待3s消失',
                    time: 3000
                },

                /*HY-select*/
                selectData: [
                    {
                        value: 'selectName1'
                    },
                    {
                        value: 'selectName2'
                    },
                    {
                        value: 'selectName3'
                    },
                    {
                        value: 'selectName4'
                    },
                    {
                        value: 'selectName5'
                    },
                    {
                        value: 'selectName6'
                    }
                ],
                selectParamsConfig: {
//                type: 'single',
                    type: 'multiple',
//                bgColor: 'gainsboro'
                    dataValueName: 'value',
                    limitNumber: 3
                },

                /*HY-pull-more*/
                pullConfig: {
//                text: 'show',
                    img: {
//                    src: '//www.baidu.com/img/bd_logo1.png',
//                    width: '100%'
                    }
                },
                endAnimation: false,

                /*HY-radio*/
                radioTestList: [
                    {
                        name: 'test1',
                        checked: false
                    },
                    {
                        name: 'test2',
                        checked: false
                    },
                    {
                        name: 'test3',
                        checked: false
                    },
                    {
                        name: 'test4',
                        checked: false
                    },
                    {
                        name: 'test5',
                        checked: false
                    }
                ],
                checked: true,

                /*HY-checkbox*/
                checkboxList: [
                    {
                        name: 'check1',
                        checked: false
                    },
                    {
                        name: 'check22',
                        checked: false
                    },
                    {
                        name: 'check333',
                        checked: false
                    },
                    {
                        name: 'check4444',
                        checked: false
                    },
                    {
                        name: 'check55555',
                        checked: false
                    }
                ],

                isShowAlert: false,
            }
        },
        methods: {
            test: function (e) {
                console.log('toggle',e)
            },
            changedData: function (e) {
                console.log('change',e)
            },
            selectedData: function (data) {
                console.log('select',data)
            },
            currentPage: function (page) {
                console.log('page:',page)
            },
            pullLoading: function (data) {
                setTimeout( () => {
                    document.getElementsByClassName('pull-test')[0].innerHTML += '<div>1</div>';
                    document.getElementsByClassName('pull-test')[0].innerHTML += '<div>2</div>';
                    document.getElementsByClassName('pull-test')[0].innerHTML += '<div>3</div>';
                    console.log(this.endAnimation);
                    this.endAnimation = true;
                }, 2000);
            },
            radio: function (data) {
                console.log('radio:', data);
                console.log(this.radioTestList)
            },
            checkbox: function (data) {
//                console.log(data);
                console.log(this.checkboxList)
                this.isShowAlert = true;
            }
        },
        mounted () {
        }

    }
</script>
<style>
    body{
        margin: 0;
    }
    .toggle-style{
        width: 40px;
        height: 20px;
    }
    .theme-color{
        display: inline-block;
        margin: 10px;
    }
    .select-style{
        /*height: 50px;*/
        height: 30px;
        background: gainsboro;
    }
    .pull-test{
        height: 200px;
        overflow: auto;
    }
    .radio{
        position: relative;
        top:5px;
    }
    .table-test th{
        background: gainsboro;
        margin: 0 1px;
        position: relative;
    }
    .table-test td{
        /*margin: 0 1px;*/
    }
    .table-test .resize-line{
        position: absolute;
        top: 0;
        right: -1px;
        width: 2px;
        height: 100%;
        background: red;
        cursor: ew-resize;
    }
</style>
