({
    appDir: '../src', //打包目录
    baseUrl: './js', //require依赖根路径
    dir: '../build', //打包输出路径
    optimize: 'none', //默认是uglify压缩打包，none表示只打包不压缩
    mainConfigFile: './config.js', //require配制项文件
    name: 'app' //需要打包的主模块
})