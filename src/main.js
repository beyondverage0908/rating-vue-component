import Vue from 'vue'
import App from './App.vue'
import Rating from './components/Rating.vue'

new Vue({
  el: '#app',
  template: '<Rating :grade="3" :maxStars="10" :hasCounter="true" />',
  components: { Rating }
  // render: h => h(App)
})
