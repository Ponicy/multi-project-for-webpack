<template>
	<div class="index">这是首页啊</div>
</template>
<script>
export default {
	name: 'index',

	data() {
		return {
			index: 1
		}
	},

	methods: {
		sayIndex() {
			this.index=+1;
		}
	}
}
</script>
<style lang="scss" scoped>
	.index{
		color: #444;
		font-size: 56px;
		font-weight: lighter;
	}
</style>