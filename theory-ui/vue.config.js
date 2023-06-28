/*
 * @Author: chizhigao户名 2279648073@qq.com邮箱
 * @Date: 2023-06-19 14:53:33
 * @LastEditors: chizhigao户名 2279648073@qq.com邮箱
 * @LastEditTime: 2023-06-28 09:38:32
 * @FilePath: \theory\theory-ui\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件
let productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  // 项目部署的基础路径
  publicPath: "./",

  // 将构建好的文件输出到哪里（或者说将编译的文件）
  outputDir: "dist",

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: "static",

  // 代理 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
  devServer: {
    proxy: {
      "/": {
        target: "https://partner.hzlitai.com.cn/theory-api",
        changeOrigin: true,
        pathRewrite: {
          "^/": "", // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
        },
      },
    },
  },

  configureWebpack: config => {
    // 开发环境不配置
    if (process.env.NODE_ENV !== 'production') return
    // 生产环境才去配置
    return {
        plugins: [
            new CompressionPlugin({ //此插件不能使用太高的版本，否则报错：TypeError: Cannot read property 'tapPromise' of undefined
                // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
                filename: '[path].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
                algorithm: 'gzip', // 官方默认压缩算法也是gzip
                test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
                threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
                minRatio: 0.8, // 最小压缩比率，官方默认0.8
                //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
                // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
                deleteOriginalAssets: false
            })
        ]
    }
},

  // 三方插件的选项
  // plugins: [],
};
