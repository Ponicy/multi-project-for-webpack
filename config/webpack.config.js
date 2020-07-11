const fs = require("fs");
const path = require('path')
const resolve = dir => path.resolve(__dirname, '../', dir)
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLplugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const globalConfig = require("../vue.config")

// 当前环境是否为开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
	mode: 'development',

	// NODE_ITEM 项目名称
	entry: path.join(__dirname, `../src/${process.env.NODE_ITEM}/main.js`),

	output: {
		filename: 'app.js',
		path: path.join(__dirname, `../${globalConfig.outputDir || 'dist'}`),
	},

 	resolve: {
		alias: {
			'@': resolve(`src/${process.env.NODE_ITEM}`)	//	@ 指向当前项目目录
		},
		extensions: ['.js', '.vue', '.json']
  },

	module: {
		rules: [
			{
				test: /\.vue$/,
        			loader: 'vue-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 1000*3,
						fallback: {
							loader: 'file-loader',
							options: {
								name: 'fonts/[name].[hash:8].[ext]'
							}
						}
					}
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					symbolId: 'icon-[name]',
					extract: false,
					runtimeCompat: true,
					esModule: false
				}
			},
		]
	},

	plugins: [
		//	把环境变量写进代码中，方便在业务中区分环境
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new VueLoaderPlugin(),

		/*
		** NODE_ITEM		package.json 中执行命令配置的项目变量
		*/ 
		// new HTMLplugin({
		// 	template: `public/${process.env.NODE_ITEM}/index.html`,
		// 	chunks: ['app', 'vendor', '[id]'],
		// 	chunksSortMode: 'manual',
		// })
	]
}

if (isDev) {
	config.devtool = '#cheap-module-eval-source-map'	//启动源码调试

	config.module.rules.push(
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				{
					loader: 'style-loader',
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
				'postcss-loader',
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			],

		},
		{
			test: /\.(gif|jpg|jpeg|png)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 1024*5,
						name: 'img/[name][hash:8].[ext]'
					}
				}
			]
		},

	)

	config.devServer = {
		port: 9966,
		host: globalConfig.host || '0.0.0.0', // 允许使用IP访问
		open: true,
		overlay: {
		 	errors: true
		},
		hot: true,
		proxy: globalConfig.proxy || {}
	}

	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(), // 热更新插件
		new webpack.NoEmitOnErrorsPlugin(),	// 	错误提示插件

		// 自定义html模板
		new HTMLplugin({
			template: `public/${process.env.NODE_ITEM}/index.html`,
			title: '管理系统'
		}),

	)
} else {

	config.entry = {
		app: path.join(__dirname, `../src/${process.env.NODE_ITEM}/main.js`),
		vendor: ['vue', 'vue-router'] //把相关库内容打包成一个
	}

	config.output.filename = 'js/[name].[chunkhash:8].js';
	config.output.chunkFilename = 'js/[id].js';
	config.output.publicPath = './';

	config.module.rules.push(
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../',
					},
				},
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
		{
			test: /\.(gif|jpg|jpeg|png)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 1024*5,
						fallback: {
							loader: 'file-loader',
							options: {
								name: 'img/[name][hash].[ext]'
							}
						}
					}
				}
			]
		},
		{
			test: /\.js?$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: ['@babel/plugin-proposal-object-rest-spread']
				}
			}
		},
	)

	config.plugins.push(
		// 样式单独分离
		new MiniCssExtractPlugin({
			filename: 'css/style.[chunkhash:8].css'
		}),
		new HTMLplugin({
			template: `public/${process.env.NODE_ITEM}/index.html`,
			chunks: ['app', 'vendor', '[id]'],
			chunksSortMode: 'manual',
		}),

		// 复制当前项目中静态资源目录
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, `../public/${process.env.NODE_ITEM}/static`),
				to: 'static'
			}]
		})
	)

	config.optimization = {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	}
}


module.exports = config;
