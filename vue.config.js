const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 发布状态。local为本地开发状态
const isDeloyState = ['production', 'development', 'test'].includes(process.env.NODE_ENV)

module.exports = {
  runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
  publicPath: isDeloyState ? './' : '/',
  productionSourceMap: false, //不在production环境使用SourceMap
  devServer: {
    //跨域
    port: 6001, // 端口号
    open: false, //配置自动启动浏览器
    proxy: {
      // 配置跨域处理 可以设置多个
      '/nurse': {
        target: 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e',
        // target: 'http://192.168.200.219:38084',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // '/nurse': ''
          '/nurse': '/api/'  //默认所有请求都加了/pro前缀，需要去掉
        }
      },
      '/nurse/hcc': { // 中台接口
        target: 'https://aliiot.on-bright.com/mock/42', //mock API接口系统
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/nurse/hcc': '/hcc'  //默认所有请求都加了/pro前缀，需要去掉
        }
      },
    }
  },
  configureWebpack: config => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/components/Layouts'))
      .set('@static', resolve('src/static'))
    // config.plugins.delete('preload') // TODO: need test
    // config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  lintOnSave: true
}
