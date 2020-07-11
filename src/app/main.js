
import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: ()=> import('./views/app/hello.vue')
	},
	{
		path: '/main',
		component: ()=>import('./views/index.vue')
	}
]

const router = new VueRouter({routes});

new Vue({
	el: '#app',
	router,
	render: (h) => h(app)
})
