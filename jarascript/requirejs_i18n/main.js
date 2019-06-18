var debug = true; //true表示开发中，false表示打包发布

if (debug) {
    require(['./config/config', './src/js/app']);
} else {
    //由于有国际化配制信息在config文件内，所以这个依赖不能少
    require(['./config/config','./build/js/app']);
}