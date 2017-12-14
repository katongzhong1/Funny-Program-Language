/*
 * @Author: wusz 
 * @Date: 2017-12-13 17:35:26 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-14 14:16:39
 */

 /*! 回文字符串 */
 // anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
 const anagrams = str => {
    if(str.length <= 2)  return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str.split('').reduce( (acc, letter, i) => {
      anagrams(str.slice(0, i) + str.slice(i + 1)).map( val => acc.push(letter + val) );
      return acc;
    }, []);
 }
 // test==> console.log(anagrams('abcd'));

 /*! 求平均数 */
 // average([1, 2, 3]) -> 2
 const average = arr => {
    return arr.reduce( (acc, val) => acc + val, 0) / arr.length;
 }
 
 /*! 大写每个单词首字母 */
 // capitalizeEveryWord("one two three") -> 'One Two Three'
 const capitalizeEveryWord = str => {
     return str.replace(/\b[a-z]/g, char => char.toUpperCase());
 }

 /*! 大写首字母, lowerRest 参数表示其他字母是否保持小写 */
 // capitalize('myName', false) -> MyName
 const capitalize = (str, lowerRest = false) => {
   return str.slice(0, 1).toUpperCase() + (lowerRest? str.slice(1).toLowerCase() : str.slice(1)); 
 }

 /*! 检查回文 注意:去掉非字母的其他所有符号做比较  */
 // palindrome('taco at') -> true
 const palindrome = str => {
   return str.toLowerCase().replace(/[\W_]/g, '').split(' ').reverse().join('') === str.toLowerCase().replace(/[\W_]/g,'');
 }

 /*! 计算数组中某个值出现的次数 */
 // countOccurrences([1, 1, 2, 3, 1, 2], 1) -> 1
 const countOccurrences = (arr, value) => {
   return arr.reduce((a, v) => v === value ? a+1 : a+0, 0);
 }
 
 /*! 柯里化函数 参数可以分阶段提供 */
 // curry(Math.pow)(2)(10) -> 1024
 const curry = f => (...args) => {
   return args.length >= f.length ? f(...args) : (...otherArgs) => curry(f)(...args, ...otherArgs);
 }

 /*! 深度扁平化数组 */
 // deepFlatten([1, [2], [[3], 4], 5]) -> [ 1, 2, 3, 4, 5 ]
 const deepFlatten = arr => {
   return arr.reduce( (a, v) => a.concat( Array.isArray(v) ? deepFlatten(v) : v), []);
 }

 /*! 查找不同数组的不同元素 */
 // difference([1, 2, 3, 4, 2, 1], [1, 2]) -> [3, 4]
 const difference = (arr, values) => {
   return arr.filter(v => !values.includes(v));
 }

 /*! 计算两点间的距离 */
 // distance(0, 0, 3, 4) -> 5
 const distance = (x0, y0, x1, y1) => {
   return Math.hypot(x1 - x0, y1 - y0);
 }

 /*! 数字是否可被除尽 */
 // isDivisible(9, 3) -> true
 const isDivisible = (dividend, divisor) => {
   return dividend % divisor === 0;
 }

 /* 转义特殊字符 */
 // escapeRegExp('(test)') -> \(test\)
 const escapeRegExp = str => {
   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 }

 /* 奇(odd)偶(Even)数 */
 // isEven(8) -> 8
 const isEven = num => {
   return Math.abs(num) % 2 === 0;
 }

 /*! 阶乘 */
 // factorial(6) -> 720
 const factorial = n => {
   return n <= 1 ? 1 : n * factorial(n - 1);
 }

 /*! 斐波那契数组 */
 // fibonacci(5) -> [0, 1, 1, 2, 3]
 const fibonacci = n => {
   return Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i-1] + acc[i-2] : i), []);
 }

 /*! 过滤数组中的非唯一值 */
 // unique([1, 2, 2, 3, 4, 4, 5]) -> [1, 3, 5]
 const unique = arr => {
   return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
 }

 /*! 扁平化数组 */
 // flatten([1, 2, [3, [4, 5]], 6]) -> [ 1, 2, 3, [ 4, 5 ], 6 ]
 const flatten = arr => {
   return arr.reduce((a, v) => a.concat(v), []);
 }

 /*! 获取数组中最大值 */
 // arrayMax([10, 2, 3]) -> 10
 const arrayMax = arr => {
   return Math.max(...arr);
 }

 /*! 获取数组中最小值 */
 // arrayMin([10, 2, 3]) -> 2
 const arrayMin = arr => {
  return Math.min(...arr);
}

/*! 最大公约数 */
// gcd(8, 36) -> 4
const gcd = (x, y) => {
  return !y ? x : gcd(y, x % y);
}

/*! 首元素 */
// head([1, 3, 2]) -> 1
const head = arr => arr[0];

/*! 范围数值数组(左闭右开) */
// arrayRange(9, 3) -> [ 3, 4, 5, 6, 7, 8 ]
const arrayRange = (end, start = 0) => {
  return Array.apply(null, Array(end-start)).map((v, i) => i + start);
}

/*! 使用指定值初始化数组 */
// initializeArray(5, 2) -> [ 2, 2, 2, 2, 2 ]
const initializeArray = (n, value = 0) => {
  return Array(n).fill(value);
}

/*! 取数组最后一值 */ 
// last([1, 2, 3]) -> 3
const last = arr => arr.slice(-1)[0];

/*! 测量方法使用的时间 */
// 待测试
const timeTaken = (func, ...args) => {
  var t0 = performance.now(), r = func(...args);
  console.log(performance.now() - t0);
  return r;
}

/*! 键值对转化为Object */
// objectFromPairs([['a', 1], ['b', 1]]) -> { a: 1, b: 1 }
const objectFromPairs = arr => {
  return arr.reduce((a, v) => (a[v[0]] = v[1], a), {})
}

/*! 管 */
// pipe(x => x.toUpperCase(), x => x.toLowerCase())('Test') -> test
const pipe = (...funcs) => arg => {
  return funcs.reduce((acc, func) => func(acc), arg);
}

/*! 子集 */
// powerset([1, 2]) -> [ [], [ 1 ], [ 2 ], [ 2, 1 ] ]
const powerset = arr => {
  return arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
} 

/*! 指定范围内的随机整数 */
// randomIntegerInRange(3, 7) -> 7
const randomIntegerInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*! 指定范围内的随机数 */
// randomInRange(3, 7) -> 4.68445424024879
const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

/*! 随机排列数组 */
// randomizeOrder([1, 3, 5, 11, 4]) -> [ 11, 3, 1, 5, 4 ]
const randomizeOrder = arr => {
  return arr.sort((a, b) => Math.random() >=0.5 ? -1 : 1);
}

/*! 重定向 */ 
const redirect = (url, asLink = true) => {
  return asLink ? window.location.href = url : window.location.replace(url);
}

/*! 翻转字符串 */
// reverseString('foobar') -> raboof
const reverseString = str => [...str].reverse().join('');

/*!  RGB => Hex */
const rgbToHex = (r, g, b) => {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}

/*! 不同数组的交集 */
// similarity([1, 2, 3], [1, 2, 4]) -> [ 1, 2 ]
const similarity = (arr, values) => {
  return arr.filter(v => values.includes(v));
}

/*! 字符串字母排序 */
// sortCharactersInString('cabbage') -> aabbceg
const sortCharactersInString = str => {
  return str.split('').sort((a, b) => a.localeCompare(b)).join('');
}

/*! 数组和 */
const sum = arr => arr.reduce((acc, val) => acc + val, 0);

/*! 交换数值swap */
// [x, y] = [y, x];

/*! 去重 */
// uniqueValues([1, 2, 2, 3, 3, 4, 4, 5]) -> [ 1, 2, 3, 4, 5 ]
const uniqueValues = arr => {
  return [...new Set(arr)];
}

/*! URL参数 */
const getUrlParameters = url => {
  return url.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
}

/*! UUID */
// crypto is not defined
const uuid = _ => {
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/*! 有效的数字 */
// validateNumber('10') -> true
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

/*! 默认值 */
// valueOrDefault(NaN, 30) -> 30
const valueOrDefault = (value, d) => value || d;
