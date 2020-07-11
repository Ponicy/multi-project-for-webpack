# multi-project-for-webpack
基于webpack多项目管理架构；统一使用依赖，

#### 说的什么呢？

  由于之前公司项目比较多，后来为了方便管理，便重新开始搭建开发环境的工程架构，除了统一管理依赖之外；也可封装一些公用业务组件，在其他项目中使用，减少复制粘贴。

#### 目录介绍

	public ------ 项目静态文件管理，首页index.html模板
		|
		app ------ 项目目录名，必须和src源码中的项目目录名一致
				|
				static -------	静态资源目录
				|
				index.html
		rc ------- 项目目录名
				|
				index.html
	src -------	源码
		|
		app -------	项目目录名，必须和public下的项目目录名一致
				|
				assets	-------	资源管理目录
				|
				utils	-------	工具方法存放目录
				|
				views	-------	页面管理
				|
				app.vue	-------	首页入口vue
				|
				main.js	-------	项目入口文件
	
####	构建使用

	1、在package.json中对每个项目配置脚本
	2、利用 cross-env 设置脚本变量区分环境打包
	3、设置项目名（ build:项目名 ）方式打包构建
		例如：build:app	执行脚本时：npm run build:app
	4、必须 cross-env 必须设置相应的 NODE_ITEM=项目名
	5、具体事例查阅package.json

####	此为单页面开发框架，如需多页面开发，可自行扩展