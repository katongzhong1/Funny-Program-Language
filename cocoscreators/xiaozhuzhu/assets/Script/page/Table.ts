/*
 * @Author: wusz 
 * @Date: 2017-12-06 10:27:44 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-07 18:34:12
 */

const {ccclass, property} = cc._decorator;
import Card from "../items/card";
import CardManager from "../manager/CardManager";
import PlayerManager from "../manager/PlayerManager";

cc.Class({
    extends: cc.Component,
    
    properties: {
        /*! 我的牌组资源文件 */
        myAtlas: cc.SpriteAtlas,
        /*! 下家牌组资源文件 */
        rightAtlas: cc.SpriteAtlas,
        /*! 对家牌组资源文件 */
        topAtlas: cc.SpriteAtlas,
        /*! 上家牌组资源文件 */
        leftAtlas: cc.SpriteAtlas,
        /*! 空牌组资源文件 */
        emptyAtlas: cc.SpriteAtlas,

        /*! */
        cardM: CardManager,
        /*! */
        myPM: PlayerManager,
        /*! 拿牌 */
        card: Card,
        /*! 拿牌节点 */
        cardNode: cc.Node,
        
        /*! 我的手牌nodes */
        myNodes: Array,
        myCards: Array,
        canHandle: Boolean,

        /*! */
        ting: cc.Node,
        
        idx: Number
    },

    onLoad() {
        this.myNodes = [];
        this.ting.active = false;
        this.idx = 0;
        // 初始化代码
        this.initialCard();
        // 
        this.initialHolderNode();
        // 拿牌
        this.takeCard(this.cardM.getCard(), 0);
    },

    ///=============================================================================
    /// @name Initial 拿牌
    ///=============================================================================

    initialHolderNode() {
        let position = this.cardNode.getPosition();
        this.cardNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.idx==0 && this.canHandle) {
                this.idx = event.getID();
            }
        }, this);
        //我添加点击事件
        this.cardNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (this.idx==event.getID() && this.canHandle) {
                let preL = event.getLocation();
                this.cardNode.setPosition(position.x, preL.y);
            }
        }, this);
        this.cardNode.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (this.idx==event.getID() && this.canHandle) {
                let loc = event.getLocation();
                this.cardNode.setPosition(position);
                this.cardNode.active = !(loc.y-position.y > 100);
                this.idx = 0;

                this.takeCard(this.cardM.getCard(), 0);
            }   
        }, this);
        this.cardNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            if (this.idx==event.getID() && this.canHandle) {
                let loc = event.getLocation();
                this.cardNode.setPosition(position);
                this.cardNode.active = !(loc.y-position.y > 100);
                this.idx = 0;

                this.takeCard(this.cardM.getCard(), 0);
            } 
        }, this);
    },


    /*! 拿牌更新UI */
    takeCard(card:Card, index: number) {
        this.card = card;
        if (index == 0) {
            this.myTakeCard(card);
        }
        // 判断是否听牌
        this.ting.active = this.myPM.isHuAction(card);
    },

    /*! 我拿牌更新UI和触发可进行事件 */
    myTakeCard(card: Card) {
        // 更新UI
        this.canHandle = true;
        this.cardNode.active = true;
        let item = this.cardNode.getComponent(cc.Sprite);
        item.spriteFrame = this.getSpriteFrame(card, 0);
        // 
    },

    /*! 更新我的手牌 */
    myNodesUI(index: number, addCard: Card) {
        var deleCard = this.myCards[index];
        this.myCards = this.myPM.getNewHandCard(deleCard, addCard);
        for (let i=0, len=this.myCards.length; i<len; i++) {
            var node = this.myNodes[i];
            var card = this.myCards[i];
            node.getComponent(cc.Sprite).spriteFrame = this.getSpriteFrame(card, 0);
        }
        this.cardNode.active = false;
        this.canHandle = false;
        
        this.takeCard(this.cardM.getCard(), 0);
    },

    ///=============================================================================
    /// @name Initial 初始化
    ///=============================================================================

    /*! 初始化牌组 */
    initialCard() {
        this.cardM = new CardManager();
        var list = this.cardM.licensing();
        var i = list.length;
        while (i--) {
            var playerM = new PlayerManager(list[i], this.cardM.king);
            if (i==0) this.myPM = playerM;
            let cards = playerM.getHandCard();
            if (i==0) this.myCards = cards;
            this.addCardNode(playerM.getHandCard(), i);   
        }
    },

    /*! 添加子节点 */
    addCardNode(arr: Array<Card>, index: number) {
        let n = arr.length, i=0;
        while (i<n) {
            let num = i;
            let card = arr[i];
            let newNode = new cc.Node('sprite ' + i + index * 10);
            this.getPosition(newNode, i, index);
            let position = newNode.getPosition();
            let item = newNode.addComponent(cc.Sprite);
            item.spriteFrame = this.getSpriteFrame(card, index);
            if (index == 0) {
                this.myNodes.push(newNode);
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    if (this.idx==0 && this.canHandle) {
                        this.idx = event.getID();
                    }
                }, this);
                //我添加点击事件
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    if (this.idx==event.getID() && this.canHandle) {
                        let preL = event.getLocation();
                        newNode.setPosition(position.x, preL.y);
                    }
                }, this);
                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {
                    if (this.idx==event.getID() && this.canHandle) {
                        let loc = event.getLocation();
                        if (loc.y-position.y > 200) {
                            this.myNodesUI(num, this.card);
                        } 
                        newNode.setPosition(position);
                        this.idx = 0;
                    }   
                }, this);
                newNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                    if (this.idx==event.getID() && this.canHandle) {
                        let loc = event.getLocation();
                        if (loc.y-position.y > 200) {
                            this.myNodesUI(num, this.card);                            
                        } 
                        newNode.setPosition(position);
                        this.idx = 0;
                    } 
                }, this);
            }
            this.node.addChild(newNode); 
            i++;
        }
    },

    /*! 计算位置 */
    getPosition(node: cc.Node, n: number, index: number) {
        if (index == 0)  return node.setPosition(150+73*n, 100);
        else if (index == 1)  return node.setPosition(1100, 230 + 30*n);
        else if (index == 2)  return node.setPosition(900-38*n, 550);
        return node.setPosition(180, 230 + 30*n);
    },

    /*! 得到图片资源 */
    getSpriteFrame(card: Card, index: number) {
        if (index == 0) {
            var type = (card.type == 0) ? "wan" : (card.type == 1 ? "suo" : "tong");
            var sprite = this.myAtlas.getSpriteFrame("M_" + type + "_" +card.num);
            return sprite;
        } else if (index == 1) {
            return this.emptyAtlas.getSpriteFrame("e_mj_right");
        } else if (index == 2) {
            return this.emptyAtlas.getSpriteFrame("e_mj_up");
        } else if (index == 3) {
            return this.emptyAtlas.getSpriteFrame("e_mj_left");
        }
    }
});