// Import Vue
import Vue from 'vue'

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app.vue'

// Import commons components
import './components/components.vue'

// Import commons directive
import './components/directive.vue'

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Register App Component
  components: {
    app: App
  }
});
