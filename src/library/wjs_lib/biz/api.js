const string = require('../string');

module.exports = () => {
    //各接口的URL,端口号的配置
    var config = {
        //开发环境
        test : {
            path : "47.92.0.84",
            port : "7008"
        },
        //生产环境
        product : {
            path : "api.ebookchain.org",
            port : "80"
        }
    };
    //当前的接口模式
    var currentEnv; 
    if (window.location.hostname.toLowerCase() === "www.ddn.link" || window.location.hostname.toLowerCase() === "ddn.link") {
        currentEnv = 'product';
    }else{
        currentEnv = 'test';
    }
    
    //@param {*} url 路由路径
    config.resolveUrl = function( url ) {
        var baseUrl = `http://${config[currentEnv].path}:${config[currentEnv].port}`;
        if (!string.startsWith(url, "/")) {
            baseUrl += "/";
        }
        baseUrl += url;
        return baseUrl;
    };
    return config;
}