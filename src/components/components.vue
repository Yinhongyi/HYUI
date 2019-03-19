<script>
    import Vue from 'vue'

    import HY_toggle from '../commons/HY_toggle.vue'
    import HY_select from '../commons/HY_select.vue'
    import HY_pagination from '../commons/HY_pagination.vue'
    import HY_pull_more from '../commons/HY_pull_more.vue'
    import HY_radio from '../commons/HY_radio.vue'
    import HY_checkbox from '../commons/HY_checkbox.vue'
    import HY_alert from '../commons/HY_alert.vue'

    /* 将可复用组件注册到Vue */
    Vue.component('HY-toggle', HY_toggle);
    Vue.component('HY-select', HY_select);
    Vue.component('HY-pagination', HY_pagination);
    Vue.component('HY-pull-more', HY_pull_more);
    Vue.component('HY-radio', HY_radio);
    Vue.component('HY-checkbox', HY_checkbox);
    Vue.component('HY-alert', HY_alert);

    export default {}
</script>
