/*
 * @Author: wusz 
 * @Date: 2017-12-05 11:25:05 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-06 16:27:39
 */

const {ccclass, property} = cc._decorator;
import Card from "../items/card";

@ccclass
export default class CardManager extends cc.Component {

    ///=============================================================================
    /// @name Property 属性
    ///=============================================================================
    
    /*! 牌数 */
    @property
    total: number = 108;

    /*! 牌组 */
    @property
    remain: Array<Card> = [];

    /*! 王牌 */
    @property
    king: Card;

    /*! 地牌 */
    @property
    ting: Card;

    ///=============================================================================
    /// @name Constructor 构造函数 
    ///=============================================================================

    /*! 初始化 */
    constructor() {
        super();
        // 初始化牌组
        this.remain = this.setInitialCards(this.total);
        // 设置王地牌
        this.setKingTingCard();
    }

    ///=============================================================================
    /// @name Export 对外
    ///=============================================================================

    /*! 发牌 */
    public licensing() {
        var arr = new Array();
        arr.push(this.remain.splice(this.remain.length-13));
        arr.push(this.remain.splice(this.remain.length-13));
        arr.push(this.remain.splice(this.remain.length-13));
        arr.push(this.remain.splice(this.remain.length-13));
        return arr;
    }

    /*! 拿牌 */
    public getCard() {
        return this.remain.pop()
    }

    /*! 剩余牌数 */
    public remainCardNum() {
        return this.remain.length;
    }

    /*! 开杠 如果牌数不够,则取最新的3张 */
    public gangCards() {
        var num = Math.floor(Math.random()*12);
        var begin = Math.min(num*2, this.remain.length-4);
        return this.remain.slice(begin, begin+3);
    }

    ///=============================================================================
    /// @name Initialize 初始化
    ///=============================================================================
    
    /*! 初始化牌组 */ 
    protected setInitialCards(total: number) {
        var cards = new Array();
        while(total--) {
            var card = new Card(total%9+1, Math.floor((total-1)/36));
            cards[total] = card;
        }
        return this.shuffle(cards);
    }

    /*! 设置王、地牌 */
    public setKingTingCard() {
        var kingNum = Math.floor(Math.random()*12);
        this.king = this.remain[kingNum];
        var tingNum = this.king.num - 1;
        if (tingNum == 0) tingNum = 9;
        this.ting = new Card(tingNum, this.king.type);
    }

    ///=============================================================================
    /// @name Function 功能性
    ///=============================================================================

    /*! 洗牌算法 ES6 时间复杂度为O(n) */ 
    protected shuffle(arr: Array<any>) {
        let n = arr.length, random;
        while(0!=n) {
            random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
            [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
        }
        return arr;
    }

    /*! 排序 */
    protected sortCards(arr: Array<Card>) {
        arr.sort((a, b) => (a.num + a.type*10) - (b.num + b.type*10));
        return arr;
    }
}