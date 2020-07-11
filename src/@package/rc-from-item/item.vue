<template>
	<div :class="['rc-from_item', inline ? '_horizontal' : '_vertical']">
		<label :class="['rc-from_label', required ? 'is-required' : '']" :style="{'width': labelWidth}">
			<slot name="label">{{label}}</slot>
		</label>
		<div :class="['rc-from_input']">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import emitter  from '@/utils/emitter'
	import schema from 'async-validator';
	export default {
		name: 'from-item',

		inject: ['rcForm'],

		componentName: 'rcFormItem',

		mixins: [emitter],

		props: {
			inline: {  // 模式， 横向或者纵向
				type: Boolean,
				default: false
			},

			label: { // 描述
				type: String,
				default: ''
			},

			required: {  // 是否必填
				type: Boolean,
				default: false
			},

			labelWidth: { // 定义label宽度
				type: String,
				default: 'auto'
			},

			rules:[Object],

			prop:{
				type: String,
				default: ''
			}
		},

		data() {
			return {
				validateState: '',
				validateMessage: '',
			}
		},

		methods: {
			validate(trigger, filedValue, callback= function(){}) {
				let rule = this.getRule(this.$props.prop);
				// delete rule.trigger;

				this.validateState = 'validating';

				const descriptor = {};
				descriptor[this.prop] = rule;

				const validator = new schema(descriptor);

				const model = {};
				model[this.prop] = filedValue;
				console.log(model)

				validator.validate(model, { firstFields: true }, (error, fields)=> {
					// console.log(111)
					this.validateState = !error ? 'success' : 'error';
          				this.validateMessage = error ? error[0].message : '';
          				// debugger
          				callback(this.validateMessage, fields);

          				this.rcForm && this.rcForm.$emit('validate', this.prop, !error, this.validateMessage || null)

					// debugger
					// if (error) {
					// 	console.log(handleErrors)
					// 	return handleErrors(errors, fields);
					// };

					// callback(true)

				})

			},

			onFiledBlur(val) {
				console.log(`onFiledBlur: ${val}`) 
				this.validate('bulr', val);
			},

			onFieldChange(val) {
				console.log(`onFieldChange: ${val}`)
				this.validate('change', val);
			},

			addValidateEvents() {  // 对规则增加事件监听
				const rule = this.getRule(this.$props.prop);

				if (rule) {
					this.$on('rc.form.blur', this.onFiledBlur)
					this.$on('rc.form.change', this.onFieldChange)
				}
			},

			getRule(name) {
				return this.rcForm.$props.rules[name];
			}
		},

		mounted() {
			// console.log(this)
			if(this.prop) {
				this.dispatch('rcForm', 'rc.form.addFiled', [this])

				this.addValidateEvents();
			}
		},

		beforeDestroy() {
			this.dispatch('rcForm', 'el.form.removeFiled', [this]);
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/vars.scss";
	.rc-from{
		&_item{
			position: relative;
			margin-bottom: 24px;
			&._vertical{
				.rc-from_input{
					display: block;
					margin-top: 8px;	
				}
				.rc-from_label{
					&.is-required{
						&:after{
							content: "*";
							color: red;
							margin-left: 5px;
							font-weight: bold;
						}
					}
				}
			}
			&._horizontal{
				.rc-from_input{
					display: inline-block;
					vertical-align: middle;
					margin-left: 20px;
				}
				.rc-from_label{
					&.is-required{
						&:before{
							content: "*";
							color: red;
							margin-right: 5px;
							font-weight: bold;
						}
					}
				}
			}
		}
		&_label{
			position: relative;
			display: inline-block;
			vertical-align: middle;
			font-size: 15px;
			color: $mainColor;
		}
		&_input{
			
			
		}
	}
</style>