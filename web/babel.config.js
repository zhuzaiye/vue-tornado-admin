// babel.config.js
// 配置 babel 转换的规则, babel 可以将项目中的高级语法转化成比较低级的语法
module.exports = {
    presets: [
        // 配置规则
        "@babel/preset-env"
    ],
    // 配置插件plugin-transform-runtime 转换async/await所需插件
    plugins: ["@babel/plugin-transform-runtime"]
}