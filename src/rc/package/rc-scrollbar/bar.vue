<template>
	<div ref="geminiScrollbar" class="gm-scrollbar-container">
		<div class="gm-scrollbar -vertical">
			<div class="thumb"></div>
		</div>
		<div class="gm-scrollbar -horizontal">
			<div class="thumb"></div>
		</div>
		<div class="gm-scroll-view" ref="scroll">
			<slot>
			</slot>
		</div>
	</div>
</template>
<script>
	const GeminiScrollbar = require('gemini-scrollbar')
	export default {
		name: 'bar',

		props: {
			autoshow: { // 是否hover才显示滚动条
				type: Boolean,
				default: false
			},
			autoCreate: { // 自动创建自定义滚动条
				type: Boolean,
				default: true
			},
			minThumbSize: { // 滚动条最小长度
				type: Number,
				default: 20
			}
		},

		data() {
			return {
				rcScroll: null,
			}
		},

		methods: {
			onResize() {
				// onResize
			},

			onCreate() {
				if (this.rcScroll) {
					this.rcScroll.create();
				}
			},

			// 设置滚动条滚动到指定位置
			onScrollTo({type, num}) {
				if (type == 'x') this.$refs.scroll.scrollLeft = num;
				if (type == 'y') this.$refs.scroll.scrollTop = num;
			}
		},

		mounted() {
			this.rcScroll = new GeminiScrollbar({
			    	element: this.$refs.geminiScrollbar,
			    	createElements:false,
			    	...this.$props,
		          	onResize: () => {
					this.$emit('resize')  //滚动窗口改变时回调
				}
			}).create();

			if (this.autoCreate) {
				this.rcScroll.create();
			}

			this.$emit('ready', this.rcScroll) // 实例初始化回调
		},

		  updated () {
			if (this.rcScroll) {
				this.rcScroll.update()
			}
		},

		destroyed() {
			this.rcScroll.destroy();
		}

	}
</script>

<style lang="scss" scoped="">
	@import "../../../common/css/scroll-bar.scss";
	.gm-scrollbar.-vertical {
  		background-color: #f0f0f0;
	}

	/* horizontal scrollbar track */
	.gm-scrollbar.-horizontal {
	  	/*background-color: transparent;*/
	  	background-color: #f0f0f0;
	}

	/* scrollbar thumb */
	.gm-scrollbar .thumb {
	  	background-color: rgba(99, 99, 101, 0.6);
	}
	.gm-scrollbar .thumb:hover {
	  	background-color: rgba(144,147,153,.5);
	}

</style>
