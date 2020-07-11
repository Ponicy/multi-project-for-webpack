<template>
	<div class="app">
		<div class="route">
			<router-link to="/">Go to /</router-link>
			 <router-link to="/main">Go to main</router-link>
		</div>

		<router-view></router-view>

		<!-- <p>{{message}}</p> -->
		<!-- <indexComponent></indexComponent> -->
	</div>
</template>

<script>
	// import indexCom from './views/index.vue';
	import {setName} from '@/utils/index.js';

	// console.log(setName('sb'))
	export default {
		name: 'app',

		components: {
			// indexComponent: ()=>import('./views/index.vue')
			// indexComponent: indexCom
		},

		data() {
			return {
				message: 'hello world!'
			}
		},

		methods: {
			setMessage() {
				this.message = `hello world methods sb`
			}
		},

		created() {
			console.log('asb')
		}
	}
</script>

<style lang="scss">
	body{
		width: 100%;
		height: 100%;
		background: url(./assets/arrow_03.png) no-repeat center center;
		background-size: cover;
		overflow: hidden; 
		box-sizing: border-box;
		box-shadow: 1px 1px 10px 0px rgba(255, 255, 255, .2);
	}
</style>

<style lang="scss" scoped>
	
	.app{
		color: #366;
		padding-left: 40px;
		background: url(./assets/calendar.png) no-repeat left center;
		line-height: 90px;
	}
</style>