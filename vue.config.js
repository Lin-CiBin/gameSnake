const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',  // 使用相对路径
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: config => {
    config.devtool = 'source-map'
  },
})