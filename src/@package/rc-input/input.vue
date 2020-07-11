<template>
	<div :class="['rc-input', {
		'rc-input--prefix': $slots.prefix || prefixIcon,
		'rc-input--sufffix': $slots.suffix || suffixIcon
	}]">

		<template v-if="type != 'textarea'">
			<!-- 前置图标 -->
			<span class="rc-input_prefix" v-if="$slots.prefix || prefixIcon">
				<slot name="prefix"></slot>
				<i v-if="prefixIcon" :class="['rc-input_icon', prefixIcon]"></i>
			</span>
			<input 
				:type="type" 
				name="rc-input" 
				:placeholder="placeholder"
				:class="['rc-input_inner', `input-${size}`, `${inputStatus}`]"
				:disabled="disabled"
				v-model.trim="value"
				ref="input"
				@input="inputHandler"
				@change="inputChange"
				@focus="inputFocus"
				@blur="inputBlur"
				@compositionstart="handleCompositionStart"
				@compositionupdate="handleCompositionUpdate"
				@compositionend="handleCompositionEnd"
			>
			<span class="rc-input_suffix" v-if="$slots.suffix">
				<slot name="suffix"></slot>
				<i v-if="prefixIcon" :class="['rc-input_icon', suffixIcon]"></i>
			</span>
		</template>	

	</div>
</template>

<script>
	import {isChinese} from '@/utils/decide'
	import emitter  from '@/utils/emitter'
	export default {
		name: 'rc-input',

		componentName: 'rcInput',

		mixins: [emitter],

		props: {
			type: {
				type: String,
				default: 'text'
			},
			placeholder: {
				type: String,
				default: '请输入...'
			},

			size: { // 输入框大小
				type: String,
				default: 'large', // large  middle  small
			},

			disabled: { // 禁止点击 输入
				type: Boolean,
				default: false
			},

			prefixIcon: { 		// 头部icon 或者 插入节点
				type: String,
				default: ''
			},

			suffixIcon: {		// 	尾部icon  或者 插入节点
				type: String,
				default: ''
			},

			inputValue: [String, Number],

			validateEvent: {  // 是否启动校验
				type: Boolean,
				default: true
			},

			inputStatus: String, //输入框状态，用以显示颜色 primary / success / error / warning / less 

		},

		model: {
			prop: 'inputValue',
			event: 'change'
		},

		data() {
			return {
				value: '',
				isComposing: false, // 输入法变化时标志
			}
		},

		watch: {
			value(val) {
				if(this.validateEvent) {
					this.dispatch('rcFormItem', 'rc.form.change', [val])
				}
			}
		},

		methods: {
			inputHandler(event) {
				if (this.isComposing) return;
				this.$emit('input', event.target.value);
			},

			inputChange(val) {
				this.$emit('change', event.target.value)
			},

			inputFocus(event) {
				this.$emit('focus', event)
			},

			inputBlur(event) {
				this.$emit('blur', event);
				if(this.validateEvent) {
					this.dispatch('rcFormItem', 'rc.form.blur', [this.value])
				}
			},

			handleCompositionStart(event) {
				this.isComposing = true;
			},

			handleCompositionEnd(event) {
				if (this.isComposing) {
					this.isComposing = false;
					this.inputHandler(event);
				}
			},

			handleCompositionUpdate(event) {
				console.log(`update：${event}`)
				const text = event.target.value;
				const lastText = text[text.length - 1] || ''
				this.isComposing = !isChinese(lastText);
			},

			getInput() {
				return this.$refs.input;
			},

			focus() {
				this.getInput().focus();
			},

			blur() {
				this.getInput().blur();
			}

		},

		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/vars.scss";
	.rc-input{
		display: inline-flex;
		justify-content: center;
		align-items: center;
		/*min-width: 200px;*/
		/*width: 100%;*/
		position: relative;
		&_inner{
			width: 100%;
			border:0;
			border-radius: 5px;
			transition: all .3s ease-in-out;
			border: 1px solid transparent;
			padding: 0 16px;
			background: #fff;
			color: $mainColor;
			&.less {
				background: $lessHover;	
			}
			&.primary{
				background: #fff;	
				box-shadow: 0px 0px 20px 2px  $grayShadow;
			}
			&.success{

			}
			&.error{

			}
			&::-webkit-input-placeholder { /* WebKit browsers */
				color: $tipColor;
				font-size: 14px;
				letter-spacing: 1px;
			}
			&::-moz-placeholder { /* Mozilla Firefox 19+ */
				color: $tipColor;
				font-size: 14px;
				letter-spacing: 1px;
			}

			&:-ms-input-placeholder { /* Internet Explorer 10+ */
				color: $tipColor;
				font-size: 14px;
				letter-spacing: 1px;
			}
			&:focus{
				border: 1px solid $yellow;
				box-shadow: 0px 0px 6px 0px rgba(255,176,0,0.35); 
			}

			&:disabled{
				color: $failColor;
			}

			&[type='password']{
				letter-spacing: 4px;
				font-size: 20px;
				font-weight: bold;
			}

			/*按钮大小*/
			&.input-large{
				height: 40px;
				line-height: 40px;
			}
			&.input-middle{
				height: 32px;
				line-height: 32px;
			}
			&.input-small{
				height: 24px;
				line-height: 24px;
			}

		}
		/*前头icon*/
		&_prefix{
			position: absolute;
			left: 13px;
		}

		/*前头icon*/
		&_suffix{
			position: absolute;
			right: 13px;
		}

		/*前头icon input 间距*/
		&--prefix{
			.rc-input_inner{
				padding-left: 40px;
			}
		}

		&--sufffix{
			.rc-input_inner{
				padding-right: 40px;
			}
		}
	}

</style>