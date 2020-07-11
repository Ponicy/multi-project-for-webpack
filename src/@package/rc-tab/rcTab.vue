<template>
	<div class="rc-tab-warp" ref="tabs">
		<span class="rc-list" 
			@click.stop="selectFn(index)" 
			v-for="(item, index) in tabs"
			:class="{'active': tabIndex == index, 'no-border': index == tabs.length-1}"
		>{{item}}</span>
		<span class="rc-selected" 
			:style="{'transform': `translate3d(${tabIndex*100}%, 0, 0)`}"></span>
	</div>
</template>
<script>
	export default {
		name: 'rankingTab',

		props: {
			tabs: {
				type: Array,
				default () {
					return []
				}
			},
			selectIndex: {
				type: Number,
				default: 0
			}
		},

		data () {
			return {
				tabIndex: 0
			}
		},

		methods: {
			selectFn(index) {
				this.tabIndex = index;
				this.$emit('change', index);
			},

			setIndex() {
				if (this.selectIndex > this.tabs.length -1) {
					console.error(`this index is invalid, more then tabs's length`)
					this.tabIndex=0;
					return;
				}
				this.tabIndex = this.selectIndex;
			}
		},

		mounted () {
			this.setIndex();
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/common/css/vars.scss";
	.rc-tab-warp{
		position: relative;
		background: $lessHover;
		display: inline-flex;
		border-radius: 4px;
		padding: 3px;

		.rc-list{
			position: relative;
			display: inline-block;
			width: 45px;
			line-height: 34px;
			text-align: center;
			border-radius: 4px;
			color: $mainColor;
			cursor: pointer;
			font-size: 14px;
			z-index: 12;
			transition: all .3s ease-in-out;
			cursor: pointer;
			&.active{
				font-weight: bold;
				color: #fff;
			}
			&:after{
				/*content: "";
				position: absolute;
				width: 1px;
				height: 20px;
				background: $failColor;
				top: 7px;
				right: -1px;
				z-index: 1;*/
			}
			&.no-border{
				&:after{
					display: none;
				}
			}
		}
		.rc-selected{
			display: inline-block;
			width: 45px;
			line-height: 34px;
			text-align: center;
			border-radius: 4px;
			position: absolute;
			left: 3px;
			top: 3px;
			height: 34px;
			background: $yellow;
			z-index: 10;
			transition: all .3s ease-in-out;
			z-index: 10;
		}
	}
</style>