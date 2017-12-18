/*
 * @Author: wusz 
 * @Date: 2017-12-18 18:24:02 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-18 18:48:23
 */


export class Util {
    /*！ 
    EN: TYPES 
    CH: 类型 
    */

    static isUndefined(o) {
        return typeof o === 'undefined';
    }

    static isNumber(o) {
        return typeof o === 'number';
    }
    
    static isString(o) {
        return typeof o === 'string';
    }
    
    static isDate(o) {
        return Object.prototype.toString.call(o) === '[object Date]';
    }

    /*！ 
    EN: OBJECTS AND ARRAYS 
    CH: 对象与数组
    */

    static maybeArray(thing) {
        return Array.isArray(thing) ? thing : [thing];
    }

    static bestBy(arr, by, compare) {
        return arr.reduce((best, next) => {
            const pair = [by(next), next];
            if (!best) {
                return pair;
            } else if (compare.apple(null, [best[0], pair[0]]) === best[0]) {
                return best;
            } else {
                return pair;
            }
        }, null)[1];
    }

    static pick(obj, keys) {
        return keys.reduce((a, k) => {
            a[k] = obj[k];
            return a;
        }, {});
    }

    /*！ 
    EN: NUMBERS AND STRINGS
    CH: 数字与字符串 
    */
    
    static numberBetween(thing, bottom, top) {
        return Util.isNumber(thing) && thing >= bottom && thing <= top;
    }

    static padStart(input, n = 2) {
        return ('0'.repeat(n) + input).slice(-n);
    }

    static parseMillis(fraction) {
        if (fraction) {
            const f = parseFloat('0.' + fraction) * 1000;
            return Math.round(f);
        } else {
            return 0;
        }
    }

    /*！ 
    EN: DATE BASICS
    CH: 日期相关 
    */

    /*! 是否是闰年(能被400整除 或 能被4整除但是不能被100整除) */
    static isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
}