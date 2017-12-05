/*
 * @Author: wusz 
 * @Date: 2017-12-05 13:59:46 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-05 14:53:08
 */

const {ccclass, property} = cc._decorator;
import Card from "../items/card";

@ccclass
export default class PlayerManager extends cc.Component {

    ///=============================================================================
    /// @name Property 属性
    ///=============================================================================
    
    /*! 牌组 */
    @property
    wangCards: Array<Card> = [];

    /*! wan牌组 */
    @property
    wanCards: Array<Card> = [];

    /*! suo牌组 */
    @property
    suoCards: Array<Card> = [];

    /*! tong牌组 */
    @property
    tongCards: Array<Card> = [];

    /*! 王牌 */
    @property
    king: Card;

    ///=============================================================================
    /// @name Export 对外 
    ///=============================================================================

    /*! 返回操作类型(吃\碰\杠) */


    ///=============================================================================
    /// @name Constructor 构造函数 
    ///=============================================================================
    
    /*! 构造函数 */
    constructor(arr: Array<Card>, king: Card) {
        super();
        this.king = king;
        this.sortCards(arr);
    }

    ///=============================================================================
    /// @name Initialize 初始化
    ///=============================================================================

    /*! 排序牌组 */
    sortCards(arr: Array<Card>) {
        var i = arr.length;
        while (i--) {
            var card = arr[i];
            // 找到王牌
            if (card.type == this.king.type && card.num == this.king.num) {
                this.wangCards.push(card);
                continue;
            }
            // 分组wan\suo\tong
            switch (card.type) {
                case 0:
                    this.wanCards.push(card);
                    break;
                case 1:
                    this.suoCards.push(card);
                    break;
                case 2:
                    this.tongCards.push(card);
                    break;
            }
        }
        this.sortArrCards();
    }

    /*! 排序wan\suo\tong */
    sortArrCards() {
        this.wanCards.sort((a, b) => a.num - b.num);
        this.suoCards.sort((a, b) => a.num - b.num);
        this.tongCards.sort((a, b) => a.num - b.num);        
    }

    ///=============================================================================
    /// @name Function 功能性
    ///=============================================================================

    
}