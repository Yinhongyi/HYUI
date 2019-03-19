/*
* 单选按钮:
* 用法: <HY-radio group="string1" :isChecked="boolean1" @update:isChecked="val=>boolean1=val" @HY_radio="func1($event)"></HY-radio>;
* group = 'string',                                     // 用于在一组数据中单选一个,必须
* isChecked = boolean1,                                 // 是否选中
* @update:isChecked = 'val=>boolean1=val',              // 必须按格式正确书写, boolean1就是上面的boolean1;
* func1:    点击单选按钮时触发，返回当前选中的状态boolean;
* */

<template>
    <div class="HY-radio-group display-inline-block" @click="clickRadio()">
        <div v-if="checked" class="HY-radio HY-checked display-inline-block">
            <div class="display-inline-block"></div>
        </div>
        <div v-if="!checked" class="HY-radio HY-un-checked display-inline-block">
            <div class="display-inline-block"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HY-radio',
        props: ['isChecked', 'group'],
        data () {
            return {
                checked: false
            }
        },
        methods: {
            clickRadio: function () {
                if(this.group){
                    for(let i=0;i<this.$parent.$children.length;i++){
                        if(this.$parent.$children[i].group === this.group){
                            this.$parent.$children[i].checked = this.$parent.$children[i]._uid === this._uid;
                            this.$parent.$children[i].$emit('update:isChecked',this.$parent.$children[i].checked);
                        }
                    }
                    this.$emit('HY_radio',this.checked);
                }else{
                    this.checked = !this.checked;
                    this.$emit('update:isChecked',this.checked);
                    this.$emit('HY_radio',this.checked);
                }
            }
        },
        mounted () {
            this.checked = this.isChecked;
        }
    }
</script>
<style scoped>
    .display-inline-block{
        display: inline-block;
    }
    .HY-radio{
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: transparent;
    }
    .HY-radio div{
        position: absolute;
        width: 10px;
        height: 10px;
        top: 5px;
        left: 5px;
        border-radius: 10px;
    }
    .HY-checked{
        border: 1px solid rgb(0, 47, 167);
    }
    .HY-checked div{
        background-color: rgb(0, 47, 167);
    }
    .HY-un-checked{
        border: 1px solid gainsboro;
    }
    .HY-un-checked div{
        background-color: gainsboro;
    }
</style>
