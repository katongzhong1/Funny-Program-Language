/*
 * @Author: wusz 
 * @Date: 2017-12-05 13:59:46 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-06 17:10:06
 */

const {ccclass, property} = cc._decorator;
import Card from "../items/card";

@ccclass
export default class PlayerManager extends cc.Component {

    ///=============================================================================
    /// @name Property 属性
    ///=============================================================================

    /*! */
    @property
    chiPengCards: Array<Array<Card>> = [];
    
    /*! 牌组 */
    @property
    wangCards: Array<Card> = [];

    /*! wan牌组 */
    @property
    cards: Array<Card> = [];

    /*! 王牌 */
    @property
    king: Card;

    ///=============================================================================
    /// @name Export 对外 
    ///=============================================================================

    /*! 返回手牌 */
    getHandCard() {
        return [].concat(this.wangCards, this.cards);
    }

    /*! 加入一张牌, 移除一张牌 */
    getNewHandCard(deleCard: Card, addCard: Card) {
        if (this.isKing(deleCard)) this.wangCards.pop();
        else this.cards.splice(this.cards.indexOf(deleCard));

        if (this.isKing(addCard)) this.wangCards.push(addCard);
        else this.cards.push(addCard);
        
        this.sortCards(this.cards);

        return [].concat(this.wangCards, this.cards);
    }

    /*! 返回操作类型(吃\碰\杠) */


    ///=============================================================================
    /// @name Constructor 构造函数 
    ///=============================================================================
    
    /*! 构造函数 */
    constructor(arr: Array<Card>, king: Card) {
        super();
        this.king = king;
        this.findKingAndSortCards(arr);
    }

    ///=============================================================================
    /// @name Initialize 初始化
    ///=============================================================================

    /*! 排序牌组 */
    findKingAndSortCards(arr: Array<Card>) {
        var i = arr.length;
        while (i--) {
            var card = arr[i];
            if (this.isKing(card)) {
                this.wangCards.push(card);
            } else {
                this.cards.push(card);
            }
        }
        this.sortCards(this.cards);
    }

    /*! 排序 */
    protected sortCards(arr: Array<Card>) {
        arr.sort((a, b) => (a.num + a.type*10) - (b.num + b.type*10));
    }

    isKing(card: Card) {
        return card.type == this.king.type && card.num == this.king.num;
    }

    ///=============================================================================
    /// @name Function 功能性
    ///=============================================================================
}