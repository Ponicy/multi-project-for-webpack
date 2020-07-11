<template>
	<button 
		:class="['rc_'+type, 'rc_'+type+'-'+shape, 'rc_'+type+'-'+primary, buttonClass]"
		:disabled="disabled"
		@click.stop.prevent="onClick"
	>
		<slot name="button-icon">
			<span class="rc-icon" v-if="$slots.button-icon || icon">
				
			</span>
		</slot>
		<span class="rc-text">
			<slot></slot>
		</span>
	</button>
</template>

<script>
export default {
	name: 'rc-button',

	props: {
		type: {
			type: String,
			default: 'button' // text	button 	cricle
		},
		shape: { // 按钮大小
			type: String,
			default: 'large'		// large  middle  small
		},
		primary: { // 主次按钮
			type: String,
			default: 'primary' //	primary 主按钮 	less: 次要按钮  white
		},

		disabled: { //按钮是否可点
			type: Boolean,
			default: false // 默认false 可点击
		},

		icon: { //图标
			type: String,
			default: ''
		},

		buttonClass: { //自定义添加的classname
			type: String,
			default: ''
		}

	},

	data() {
		return {

		}
	},

	methods: {
		onClick() {
			this.$emit('click');
		}
	},

	mounted() {
		// console.log(this)
	}
}
</script>

<style lang="scss" scoped="">
	@import "@/common/css/vars.scss";
	.rc{
		&_button{
			display: inline-flex;
			align-items: center;
			background: transparent;
			justify-content: center;
			padding: 0 16px;
			transition: all .3s ease-in-out;
			
			/*大按钮*/
			&-large{
				min-width: 94px;
				line-height: 40px;
				height: 40px;
			}

			/*中按钮*/
			&-middle{
				min-width: 74px;
				line-height: 32px;
				height: 32px;
			}

			/*小按钮*/
			&-small{
				min-width: 58px;
				height: 24px;
				line-height: 24px;
			}

			/*主按钮*/
			&-primary{
				background: $yellow;
				color: #fff;
				
				&:hover{
					background: $hoverYellow;
					box-shadow: 0px 10px 20px 0px rgba(249, 176, 95, 0.25);
					color: #fff;
				}
				&:active{
					background: $activeYellow;
				}
			}

			/*次按钮*/
			&-less{
				background: $less;
				color: $mainColor;
				&:hover{
					background: $lessHover;
					box-shadow: 0px 6px 12px 0px rgba(214, 219, 233, 0.5);
				}
				&:active{
					background: $lessActive;
				}
			}

			&-white{
				background: #fff;
				color: $mainColor;
				&:hover{
					background: $hoverYellow;
					box-shadow: 0px 10px 20px 0px rgba(249, 176, 95, 0.25);
					color: #fff;
				}
				&:active{
					background: $activeYellow;
				}
			}

		
			/*失效 禁点按钮*/
			&[disabled=disabled]{
				background: #E9EFF3;
				color: $failColor;
				&:hover{
					cursor: no-drop;
				}
			}

			.rc-icon{
				margin-right: 5px;
			}
			.rc-text{
				display: inline-block;
			}
		}

		/*文字按钮*/
		&_text{
			color: $blueColor;
			background: transparent;
		}

		&_cricle{
			width: 40px;
			height: 40px;
			line-height: 40px;
			border-radius: 100%;
			
			&-primary{
				background: $yellow;	
				color: #fff;

			}
			&-less{
				background: $less;
				color: $mainColor;
			}

			&:hover{
				box-shadow: 0px 10px 20px 0px rgba(249, 176, 95, 0.25);
			}
		}
	}
</style>