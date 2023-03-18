const path = require('path');
// 用于生成html文件，生成的文件会把项目依赖的js文件打包后加载进去
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require("vue-loader");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    // 定义入口文件路径 webpack依赖关系的起点文件
    entry: path.resolve(__dirname, 'web/main.js'),
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
                test: /\.(eot|ttf|svg|woff2)$/,
                exclude: /(node_modules)/,
                use: ['url-loader'],
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
        historyApiFallback: true,
        // inline: true,
        compress: true,  // 启用 gzip compression
        port: 8008, // 指定监听请求的端口号
    },
    // 配置 plugin
    plugins: [
        // vue-loader compile 处理
        new VueLoaderPlugin(),
    ],
}