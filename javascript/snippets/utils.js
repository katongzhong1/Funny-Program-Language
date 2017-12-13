/*
 * @Author: wusz 
 * @Date: 2017-12-13 17:35:26 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-13 18:47:44
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
