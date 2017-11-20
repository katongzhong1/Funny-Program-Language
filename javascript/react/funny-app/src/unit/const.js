/*
 * @Author: wusz 
 * @Date: 2017-11-16 18:06:41 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-11-17 12:09:13
 */

/*
 * @问题:
 *   1. RegExp的使用
 *   2. 
 * @收获:
 *   1. 如何获取浏览器地址中的指定参数的值 lan方法
 *
 */

import i18n from './i18n.json';

const transform = (function () {
    const trans = ['transform', 'webkitTransform', 'msTransform', 'mozTransform', 'oTransform'];
    const body = document.body;
    return trans.filter((e) => body.style[e] !== undefined)[0];
}());

// 获取浏览器参数
const getParam = (param) => {
    const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`);
    const m = window.location.toString().match(r);
    return m ? decodeURI(m[1]) : '';
};

const lan = (() => {
    let l = getParam('lan').toLowerCase();
    l = i18n.lan.indexOf(l) === -1 ? i18n.default : l;
    return l;
})();

module.exports = {
    transform,
    lan,
    i18n: i18n.data,
};