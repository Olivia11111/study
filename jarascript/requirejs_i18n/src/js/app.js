//注意：国际化文件的调用需要i18n插件来预处理，即“i18n! + path”
require(['jquery', '../../config/config', 'i18n!./nls/messages'], function ($, config, Text) {
    $('#lang').text(Text.name);
    $('#en').on('click', function(){
        localStorage.setItem('locale', 'en');
        location.reload();
    });
    $('#zh').on('click', function(){
        localStorage.setItem('locale', 'zh');
        location.reload();
    });
    
});