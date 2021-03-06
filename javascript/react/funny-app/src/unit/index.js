/*
 * @Author: wusz 
 * @Date: 2017-11-16 18:21:44 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-11-17 09:42:55
 */

 const unit = {
    isMobile() { // 判断是否为移动端
        const ua = navigator.userAgent;
        const android = /Android (\d+\.\d)/.test(ua);
        const iphone = ua.indexOf('iPhone') > -1;
        const ipod = ua.indexOf('iPod') > -1;
        const ipad = ua.indexOf('iPad') > -1;
        const nokiaN = ua.indexOf('NokiaN') > -1;
        return android || iphone || ipod || ipad || nokiaN;
    }
 };

 module.exports = unit;