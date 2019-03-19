/*
* 复选框:
* 用法: <HY-checkbox :isChecked="boolean1" @update:isChecked="val=>boolean1=val" @HY_checkbox="func1($event)"></HY-checkbox>;
* isChecked = boolean1,                                 // 是否选中
* @update:isChecked = 'val=>boolean1=val',              // 必须按格式正确书写, boolean1就是上面的boolean1;
* func1:    点击单选按钮时触发，返回当前选中的状态boolean;
* */

<template>
    <div class="HY-checkbox-group display-inline-block" @click="clickCheckbox()">
        <div v-if="checked" class="HY-checkbox display-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-checkbox-svg">
                <rect width="21" height="21" stroke="rgb(0, 47, 167)" stroke-width="1" fill="rgb(0, 47, 167)"></rect>
                <line x1="3.5" y1="11" x2="10" y2="16" stroke="white" stroke-width="3"></line>
                <line x1="17" y1="6.5" x2="8.5" y2="16.5" stroke="white" stroke-width="3"></line>
            </svg>
        </div>
        <div v-if="!checked" class="HY-checkbox display-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="HY-checkbox-svg">
                <rect width="21" height="21" stroke="gainsboro" stroke-width="4" fill="white"></rect>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HY-checkbox',
        props: ['isChecked', 'group'],
        data () {
            return {
                checked: false
            }
        },
        methods: {
            clickCheckbox: function () {
//                if(this.group){
//                    for(let i=0;i<this.$parent.$children.length;i++){
//                        if(this.$parent.$children[i].group === this.group){
//                            this.$parent.$children[i].checked = this.$parent.$children[i]._uid === this._uid;
//                            this.$parent.$children[i].$emit('update:isChecked',this.$parent.$children[i].checked);
//                        }
//                    }
//                    this.$emit('HY_checkbox',this.checked);
//                }else{
                    this.checked = !this.checked;
                    this.$emit('update:isChecked',this.checked);
                    this.$emit('HY_checkbox',this.checked);
//                }
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
    .HY-checkbox{
        position: relative;
        width: 22px;
        height: 22px;
        background-color: transparent;
    }
    .HY-checkbox-svg{
        width: 22px;
        height: 22px;
    }
</style>
