import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default: Hello,
        footer: Footer
      }
    }
  ]
})
