/*
const path = require('path')
module.exports = {
  entry: ...,
  output: ...,
  module:[...],
  plugins:[...]
}
* */
const path = require('path');
// 用于生成html文件，生成的文件会把项目依赖的js文件打包后加载进去
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
    // 开发模式
    mode: 'development',
    // 定义入口文件路径 webpack依赖关系的起点文件
    entry: path.resolve(__dirname, './web/main.js'),
    // 定义出口文件路径(webpack打包后文件存放路径指定)，为绝对路径 __dirname 为当前目录，通过引入 path 模块拼接路径
    output: {
        path: path.resolve(__dirname, 'server/public/js'),
        filename: 'bundle.js',
        clean: true, // 清空输出目录，webpack5开始可以直接配置清空，不再需要安装CleanWebpackPlugin
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        // alias: {
        //     "@": path.resolve(__dirname, './vue')  // @替换vue
        // },
        extensions: ['*', '.js', '.vue']
    },
    // 配置 loader
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // @babel/preset-env是bable的预设，因为bable的每个语法转换都需要独立的插件
                        // 如果一个个的安装，那就需要大量的插件，preset预设就直接帮我们来加载对应的插件列表
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ca]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                    },
                },
                // 配置资源输出位置和名称
                generator: {
                    // 将图片文件输出到 imgs 目录中
                    // 将图片文件命名 [name][hash:6][ext][query]
                    // [name]: 之前的文件名称
                    // [hash:6]: hash值取6位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: 'img/[name][hash:6][ext]',
                },
            }
        ]
    },
    devServer: {
        port: 8008, // 指定监听请求的端口号
        // inline: true,
        compress: true,  // 启用 gzip compression
        hot: true,   // 启用 webpack 的 热模块替换 特性 webpack serve --hot/--no-hot
        open: true  //告诉 dev-server 在服务器已经启动后打开浏览器 webpack serve --open
    },
    // 配置 plugin
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, './server/views/index.html'), // 使用的 html 模板地址
        //     filename: 'index.html', // 打包后输出的文件名
        //     title: '手搭 Vue 开发环境' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
        // }),
        new VueLoaderPlugin()
    ]
}