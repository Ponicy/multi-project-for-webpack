
// 自定义环境配置
module.exports = {

  host: '0.0.0.0', // 默认值为 0.0.0.0

  proxy: {
    '/api': {
      target: 'http://localhost:8000/'
    }
  },

  // 打包的目录名
  outputDir: 'app', 

}