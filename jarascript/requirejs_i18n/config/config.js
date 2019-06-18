requirejs.config({
    baseUrl: './src/js', //require根路径
    paths: {
        i18n: '../../lib/i18n/i18n', //引入i18n插件路径
        jquery: '../../lib/jquery/dist/jquery.min', //引入jquery路径
    },
    config: {
        i18n: {
            locale: localStorage.getItem('locale') || navigator.languages[0] || navigator.language || navigator.userLanguage //配制中英文信息，zh：中文,en：英文
        }
    }
});