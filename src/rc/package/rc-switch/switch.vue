<template>
	<div class="rc-switch" :class="[]" :style="{background: value ? openColor : closeColor}" ref="switch" @click.stop="switchFn">
		<span class="switch-text switch-text-open" v-if="type==='text' && this.value">{{openText}}</span>
		<span class="switch-text switch-text-close" v-if="type==='text' && !this.value">{{closeText}}</span>
		<span class="switch-cricle" :style="style" ref="cricle"></span>
	</div>
</template>

<script>
	export default {
		name: 'rc-switch',

		props: {
			type: {  // 开关类型		none: 纯开关		text：带文字 开/关		icon：带图标 默认☑️和叉
				type: String,
				default: 'none'
			},

			openText: { //  开显示的文案 默认是开
				type: String,
				default: '开'
			},

			closeText: { //  关显示的文案 默认是关
				type: String,
				default: '关'
			},

			openIcon: {	// 开显示的图标
				type: String,
				default: '',
			},

			closeIcon: {	// 关显示的图标
				type: String,
				default: '',
			},

			openColor: { // 开背景色
				type: String,
				default: '#71C922'
			},

			closeColor: { // 关背景色
				type: String,
				default: '#EFF4F8'
			},

			size: {		//	控制圈的大小
				type: Number,
				default: 18
			},

			value: {
				type: Boolean,
				default: false
			}
		},

		model: {
			prop: 'value',
			event: 'change'
		},

		data() {
			return {
				cricle: {},
				style: {},
			}
		},

		computed: {
			
		},

		watch: {
			value (val, old) {
				this.setStyle();
			}
		},

		methods: {
			switchFn() {
				this.$emit('change', !this.value)
			},

			initCricle() {
				
			},

			setStyle() {
				this.style = {
					width: `${this.size}px`,
					height: `${this.size}px`,
					transform: !this.value ? `translate(${3}px, -50%)` : `translate(${this.$refs.switch.offsetWidth-3-this.$refs.cricle.offsetWidth}px, -50%)`
				}
			}
		},

		mounted() {
			this.$nextTick(()=> {
				this.setStyle();
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/vars.scss";
	.rc-switch{
		display: inline-block;
		position: relative;
		width: 44px;
		height: 24px;
		border-radius: 50px;
		transition: all .3s ease-in-out;
		cursor: pointer;
		vertical-align: middle;
		.switch-cricle{
			position: absolute;
			width: 18px;
			height: 18px;
			border-radius: 100%;
			background: #fff;
			top: 50%;
			cursor: pointer;
			transition: all .3s ease-in-out;
			z-index: 12;
			transform-origin: left left;
			width: 18px;
			box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1); 
		}
		.switch-text{
			position: absolute;
			font-size: 14px;
			top: 50%;
			transform: translateY(-50%);
			&-open{
				left: 7px;
				color: #fff;
			}
			&-close{
				right: 7px;
				color: $failColor;
			}
		}
	}

</style>