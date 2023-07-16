const path = require('path');
// 用于生成html文件，生成的文件会把项目依赖的js文件打包后加载进去
// vue-template-compiler 解析vue中模板的工具, 必须于vue版本一致
const defaultSettings = require('./src/settings.js')
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const name = defaultSettings.title // page title

module.exports = {
    // 打包模式 默认开发模式
    mode: "development",
    // 定义入口文件路径 webpack依赖关系的起点文件
    entry: path.resolve(__dirname, 'src/main.js'),
    // 定义出口文件路径(webpack打包后文件存放路径指定)，为绝对路径 __dirname 为当前目录，通过引入 path 模块拼接路径
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:6].js',
        // 每次打包前自动清除旧的dist
        clean: true,
    },
    resolve: {
        // 路径别名
        // 将../../../../../App.vue 转成@/App.vue
        alias: {
            '@': path.resolve('./src'),
            assets: '~/assets',
            tools: '~/utils',
            'vue$': 'vue/dist/vue.esm.js'
        },
        // path 在webpack5中的引入使用not found处理
        fallback: {
            "path": require.resolve("path-browserify")
        },
        // 引入文件时省略后缀
        extensions: ['.js', '.scss', '.vue'],
    },
    // 配置 loader
    module: {
        rules: [
            {
                // 匹配js后缀文件
                test: /\.(js|jsx)$/,
                // 排除node_modules中的js
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ],
            },
            {
                test: /\.vue$/,
                // 解析 .vue 文件的loader
                // vue 和 vue-template-compiler 版本需要一致 例如都是2.7.14
                use: 'vue-loader'
            },
            {
                test: /\.(css|s[ca]ss)$/,
                // 执行顺序从左到右
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // 图片处理
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                exclude: [path.resolve(__dirname, 'src/icons/svg')],
                use: ['url-loader']
            },
            // 字体处理
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                exclude: /(node_modules)/,
                use: ['file-loader'],
            },
            // svg icon的自定义加载
            {
                test: /\.svg$/,
                include: [path.resolve(__dirname, 'src/icons/svg')],
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'icon-[name]',
                        },
                    },
                    // 移除svg的fill属性
                    {
                        loader: 'svgo-loader',
                        options: {
                            // 必须指定name！
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: { attrs: 'fill' },
                                },
                            ],
                        },
                    },
                ],
            },
        ]
    },
    devServer: {
        open: true, // 自动打开浏览器
        proxy: { // 用于本地开发
            '/api': {
                target: 'http://localhost:8888',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            }
        },
    },
    // 配置 plugin
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // 选择模板 public/index.html
            template: './public/index.html',
            // 打包后的名字
            filename: 'index.html',
            // js文件插入 body里
            inject: 'body',
        }),
        // 无论是启动项目时还是打包时，都需要进度条的展示，
        // 需要先安装进度条的插件 progress-bar-webpack-plugin
        new ProgressBarPlugin({
            format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        })
    ],
}