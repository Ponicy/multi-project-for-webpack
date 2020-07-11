<template>
	<form class="rc-from">
		<slot></slot>
	</form>
</template>

<script>
	export default {
		name: 'rc-form',

		componentName: 'rcForm',

		provide() {
			return {
				rcForm: this,
			}
		},

		props: {
			rules: Object,
			model: Object
		},

		data() {
			return {
				fileds: [],
			}
		},

		methods: {
			validate(callback) {
				// debugger
				if(!this.model) {
					console.warn('[Rc Warn][Form]model is required for validate to work!');
          				return;
				}

				let promise;
				// 如果没有callback，则返回一个promise
				if (typeof callback !== 'function' && window.Promise) {
					promise = new window.Promise((resolve, reject) => {
						callback = function(valid) {
							valid ? resolve(valid) : reject(valid);
						};
					});
				}

				let valide = true, count=0;

				// 如果没有规则检验，则立刻执行回调
				if(this.fileds.length === 0 && callback) {
					callback(true)
				}

				let validFileds = {};
				this.fileds.forEach( filed => {
					filed.validate('', (message, file) => {
						debugger
						if (message) {
							valide = false;
						}
						validFileds = objectAssign({}, validFileds, file);
						if (typeof callback === 'function' && ++count === this.fields.length) {
				              	callback(valide, validFileds);
				            }
					})
				})

				if (promise) {
			          	return promise;
		        	}
			}
		},

		mounted() {
			
		},

		created() {
			// 监听子组件的事件
			this.$on('rc.form.addFiled', (filed) => {
				if(filed) {
					this.fileds.push(filed);
				}
			})

			// 移除子组件的监听事件
			this.$on('rc.form.removeFiled', (filed) => {
				if (filed.prop) {
					this.fileds.splice(this.fileds.indexOf(filed), 1);
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/vars.scss";

</style>