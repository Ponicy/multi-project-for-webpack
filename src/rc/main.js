import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import '../@common/css/pc-reset.scss'
import '@/assets/font/iconfont.css'


new Vue({
	el: '#app',
	render: (h) => h(app)
})