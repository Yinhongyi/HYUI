<script>
    import Vue from 'vue'
/*
* 提示框指令:
* 用法: v-HYTipBox = obj || string;                     // string就是显示的文字
* obj =
* {
*   position: 'top' || 'down' || 'left' || 'right',     // 默认'right'
*   text: string,                                       // 显示文字,支持html标签
*   time: number                                        // 提示框显示的时间,默认2000ms
* }
* */
    Vue.directive('HYTipBox', function (el, data) {
        /*创建文本框*/
        let tipEl = document.createElement('div');
        tipEl.setAttribute('id', 'HY_tipBox');
        let tipsStyle = 'display: inline-block;position: absolute;background: gainsboro;word-wrap: break-word;line-height: 1rem;z-index: 998;padding: 6px 10px;border-radius: 4px;min-width: 2rem;text-align: center;';
        tipEl.setAttribute('style', tipsStyle);
        /*创建三角箭头*/
        let triangleEl = document.createElement('div');
        triangleEl.setAttribute('id', 'HY_triangle');
        let triangleStyle = 'position: absolute;background: transparent;display: inline-block;';
        triangleEl.setAttribute('style', triangleStyle);

        /*获取文字、位置、显示时间*/
        let text = typeof (data.value) === 'object' && data.value.text ? data.value.text : data.value;
        let position = typeof (data.value) === 'object' && data.value.position ? data.value.position : 'right';
        let showTime = typeof (data.value) === 'object' && data.value.time ? data.value.time : 2000;
        tipEl.innerHTML = text;

        el.addEventListener('touchstart', function (e) {
            let parentNode = e['target'];
            parentNode.style.position = 'relative';

            let parentWidth = parentNode.clientWidth;
            let parentHeight = parentNode.clientHeight;

            /*先去掉上一个tipBox*/
            let tipElOld = document.getElementById('HY_tipBox');
            let triangleElOld = document.getElementById('HY_triangle');
            if (tipElOld && tipElOld.parentNode) {
                tipElOld.parentNode.removeChild(tipElOld)
            }
            if(triangleElOld && triangleElOld.parentNode){
                triangleElOld.parentNode.removeChild(triangleElOld);
            }

            /*向点击的位置添加tipBox*/
            e['target'].appendChild(tipEl);
            e['target'].appendChild(triangleEl);

            /*给tipBox添加样式*/
            initTipsBoxPosition(position, parentWidth, parentHeight);

            /*显示一段时间后隐藏*/
            setTimeout(function () {
                if(tipEl && tipEl.parentNode){
                    tipEl.parentNode.removeChild(tipEl);
                }
                if(triangleEl && triangleEl.parentNode){
                    triangleEl.parentNode.removeChild(triangleEl);
                }
            }, showTime);

        });

        /*点击文本框无效*/
        tipEl.addEventListener('touchstart', function (e) {
            e.stopPropagation();
        })
    });


/*
* table缩放列宽指令:
* 用法: v-HYTableResize
* obj =
* {
*   position: 'top' || 'down' || 'left' || 'right',     // 默认'right'
*   text: string,                                       // 显示文字,支持html标签
*   time: number                                        // 提示框显示的时间,默认2000ms
* }
* */

    Vue.directive('HYTableResize', function (el, data) {
        let tableTh = el.getElementsByTagName("th");
        let device = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "phone" : "pc";

        for(let i=0;i<tableTh.length;i++){
            /*创建拖动条*/
            let resizeLineEl = document.createElement('div');
            let resizeLineStyle = 'display: inline-block;position: absolute;top: 0;right: -3px;width: 6px;height: 100%;background: white;cursor: ew-resize;';
            resizeLineEl.setAttribute('style', resizeLineStyle);
            resizeLineEl.setAttribute('class', 'HY-table-resize-line');

            if(device === 'pc'){
                let status = false;
                let startX, currentNode, currentNodeWidth, currentNextNode, currentNextNodeWidth;
                resizeLineEl.addEventListener('mousedown', function (e) {
                    status = true;
                    startX = e['clientX'];

                    currentNode = e['target']['parentNode'];
                    currentNodeWidth = e['target']['parentNode']['clientWidth'];

                    currentNextNode = e['target']['parentNode']['nextElementSibling'];
                    currentNextNodeWidth = e['target']['parentNode']['nextElementSibling']['clientWidth'];
                });
                el.addEventListener('mousemove', function (e) {
                    if(status){
                        let moveX = e['clientX'] - startX;

                        if(moveX < 0 && moveX > - currentNodeWidth){
                            currentNode.style.width = currentNodeWidth + moveX + 'px';
                            currentNextNode.style.width = - currentNodeWidth - moveX + 'px';

                        }else if(moveX > 0 && moveX < currentNodeWidth){
                            currentNode.style.width = currentNodeWidth + moveX + 'px';
                            currentNextNode.style.width = currentNextNodeWidth - moveX + 'px';

                        }else{

                        }
                    }
                });
                el.addEventListener('mouseup', function (e) {
                    status = false;
                });

            }else if(device === 'phone'){
                resizeLineEl.addEventListener('touchstart', function (e) {
                    console.log('touchstart', e)
                });
                resizeLineEl.addEventListener('touchmove', function (e) {
                    console.log('touchmove', e)
                });
                resizeLineEl.addEventListener('touchend', function (e) {
                    console.log('touchend', e)
                });
            }

            let resizeLineNode = document.getElementsByClassName('HY-table-resize-line');
            if(i !== tableTh.length - 1 && resizeLineNode.length < tableTh.length - 1){
                tableTh[i].appendChild(resizeLineEl);
            }
        }

    });

    export default {
    }

    function initTipsBoxPosition(position, parentWidth, parentHeight) {
        let tipEl = document.getElementById('HY_tipBox');
        let triangleEl = document.getElementById('HY_triangle');

        let d;

        switch (position) {
            case 'top':
                tipEl.style.margin = '8px 0';
                tipEl.style.left = 0;
                tipEl.style.bottom = parentHeight + 'px';

                triangleEl.style.width = '12px';
                triangleEl.style.height = '8px';
                triangleEl.style.bottom = parentHeight + 9 + 'px';
                triangleEl.style.left = '8px';

                d = 'M0 0 L6 6 L12 0 L0 0 Z';

                tipEl.style.width = window.innerWidth - tipEl.getBoundingClientRect().left - 40 + 'px';
                break;
            case 'down':
                tipEl.style.margin = '8px 0';
                tipEl.style.left = 0;
                tipEl.style.top = parentHeight + 'px';

                triangleEl.style.width = '12px';
                triangleEl.style.height = '8px';
                triangleEl.style.top = parentHeight - 9 + 'px';
                triangleEl.style.left = '8px';

                d = 'M0 8 L6 2 L12 8 L0 8 Z';

                tipEl.style.width = window.innerWidth - tipEl.getBoundingClientRect().left - 40 + 'px';
                break;
            case 'left':
                tipEl.style.margin = '0 8px';
                tipEl.style.top = 0;
                tipEl.style.right = parentWidth + 'px';

                triangleEl.style.width = '8px';
                triangleEl.style.height = '12px';
                triangleEl.style.right = parentWidth + 'px';
                triangleEl.style.top = '2px';

                d = 'M0 0 L6 6 L0 12 L0 0 Z';

                tipEl.style.width = window.innerWidth - tipEl.getBoundingClientRect().right - 40 + 'px';
                break;
            case 'right':
                tipEl.style.margin = '0 8px';
                tipEl.style.top = 0;
                tipEl.style.left = parentWidth + 'px';

                triangleEl.style.width = '8px';
                triangleEl.style.height = '12px';
                triangleEl.style.top = '2px';

                d = 'M2 6 L8 0 L8 12 L2 6 Z';

                tipEl.style.width = window.innerWidth - tipEl.getBoundingClientRect().left - 40 + 'px';
                break;
            default:
                break;
        }

        let svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 100%;height: 100%;background: transparent;">' +
            '<path d="' + d + '" stroke-width="1px" stroke="gainsboro" fill="gainsboro">' +
            '</path></svg>';
        triangleEl.innerHTML = svg;
    }

</script>
