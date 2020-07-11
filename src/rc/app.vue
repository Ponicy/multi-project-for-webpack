<template>
	<div class="app">
		<div class="route">
			<a to="/">Go to /</a>
			 <a to="/main">Go to main</a>
		</div>
		<div class="button">
			<h2>按钮</h2>
			<rc-button 
				@click="onClick" 
				:primary="btn.primary" 
				:shape="btn.shape" 
				:disabled="btn.disabled" 
				v-for="(btn, index) in buttonList"
				:type="btn.type"
				:key="index"
				style="margin-right: 16px;"
			>{{btn.text}}<template slot="button-icon" v-if="index == 2">s</template></rc-button>
		</div>
		<div class="tab">
			<h2>滑动tab</h2>
			<rc-tab :tabs="['年', '月', '日']" :selectIndex="2"></rc-tab>
		</div>

		<div class="row">
			<h2>switch</h2>
			<rc-switch v-model="iswitch" :size="16" style="margin-right: 16px;"></rc-switch>
			<rc-switch v-model="iswitch1" type="text" :size="16" style="margin-right: 16px;"></rc-switch>
			<rc-switch v-model="iswitch2" type="text" open-text="嘻哈" close-text="哈嘻" :size="22" style="width: 60px; height: 32px;"></rc-switch>
		</div>

		<div class="row">
			<h2>scroll bar</h2>
			<rc-scroll 
				style="height: 200px;width: 480px;border: 1px solid #333;padding: 15px;" 
				@ready="scrollReady" ref="scroll"
			>
				<div class="rc-box" v-for="i in 50" :key="i">{{i}}</div>
			</rc-scroll>
		</div>

		<div class="row">
			<h2>输入框...</h2>
			<rc-input type="text" v-model.trim="inputText" @change="changeInput" @input="updateInput">
				<template slot="prefix">
					<span>https://</span>
				</template>
			</rc-input>
		</div>

		<div class="row">
			<h2>表单组合</h2>
			<rc-from :rules="rules" :model="model" ref="form">
				<rc-from-item :inline="true" :required="true" label-width="80px" prop="name">
					<label slot="label">哈哈</label>
					<rc-input type="text" v-model="model.name"></rc-input>
				</rc-from-item>
				<rc-from-item :required="true" label="姓名">
					<rc-input type="text"></rc-input>
				</rc-from-item>
				<rc-from-item label="年龄">
					<rc-input type="text"></rc-input>
				</rc-from-item>
			</rc-from>
		</div>

	</div>
</template>

<script>
	import rcButton from '@/package/rc-button/index.vue';
	import rcTab from '@/package/rc-tab/rcTab.vue';
	import rcSwitch from '@/package/rc-switch/switch.vue';
	import rcScroll from '@/package/rc-scrollbar/bar.vue';
	import rcInput from '@/package/rc-input/input.vue';
	import rcFrom from '@/package/rc-from/from.vue';
	import rcFromItem from '@/package/rc-from-item/item.vue';

	const GeminiScrollbar = require('gemini-scrollbar')
	
	export default {
		name: 'app',

		components: {
			rcButton,
			rcTab,
			rcSwitch,
			rcScroll,
			rcInput,
			rcFrom,
			rcFromItem
		},

		data() {
			return {
				message: 'hello world!',
				buttonList: [
					{
						primary: 'primary',
						shape: 'big',
						type: 'button',
						disabled: false,
						text: '大按钮'
					},
					{
						primary: 'less',
						shape: 'middle',
						type: 'button',
						disabled: false,
						text: '中按钮'
					},
					{
						primary: 'primary',
						shape: 'small',
						type: 'button',
						disabled: false,
						text: '小按钮'
					},
					{
						primary: 'primary',
						shape: 'small',
						type: 'button',
						disabled: true,
						text: '失效'
					},
					{
						primary: 'primary',
						shape: 'small',
						type: 'text',
						disabled: true,
						text: '文字类型'
					},
					{
						primary: 'primary',
						shape: 'small',
						type: 'cricle',
						disabled: true,
						text: '十'
					},
					{
						primary: 'less',
						shape: 'small',
						type: 'cricle',
						disabled: true,
						text: '十'
					}
				],

				iswitch: false,
				iswitch1: false,
				iswitch2: false,

				inputText: '',

				rules: {
					name: {required: true, type: 'Number', validator: this.validateFn, trigger: ['blur', 'change'], message: '该字段必填字断'}
				},
				model: {
					name: '',
				}
			}
		},

		watch:{
			inputText(val) {
				console.log(val);
			}
		},

		methods: {
			setMessage() {
				this.message = `hello world methods sb`
			},

			onClick() {
				console.log(this.message)
				this.$refs['form'].validate().then(m => {
					console.log(m)
				})
			},

			scrollReady(scroll) {
				this.$refs.scroll.onScrollTo({type: 'y', num: 120})
			},

			changeInput() {
				console.log(`change：${this.inputText}`)
			},

			updateInput(val) {
				// console.log(`input：${this.inputText}`)
				// console.log(val)
			},

			validateFn(rule, val, cb) {
				console.log(rule)
				console.log(val)
				// console.log(val) 
				// cb()
				// return val != ''
				cb()
			}

		},

		computed: {

		},

		created() {
			console.log('asb')
			this.$nextTick(()=>{

			})
		},

		mounted() {
			
		}
	}
</script>

<style lang="scss">
	body{
		width: 100%;
		/*height: 100%;*/
		background-size: cover;
		overflow-x: hidden; 
		box-sizing: border-box;
		box-shadow: 1px 1px 10px 0px rgba(255, 255, 255, .2);
	}
</style>

<style lang="scss" scoped>
	/*@import "../common/css/scroll-bar.scss";*/

	/deep/ .rc-input--prefix .rc-input_inner{
		padding-left: 80px;
	}
	.rc-box{
		line-height: 24px;
	}

	.route{
		margin-top: 32px;
		margin-bottom: 32px;
	}
	.app{
		color: #366;
		padding-left: 40px;
		padding-bottom: 80px;
	}
	.tab, .button, .row{
		margin-top: 32px;
	}
	h2{
		margin-bottom: 8px;
	}
</style>