/*
 * @Author: wusz 
 * @Date: 2017-12-06 10:27:44 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-06 18:34:06
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
        /*! */
        card: Card,
    },

    onLoad() {
        // 初始化代码
        this.initialCard();
        // 拿牌
        this.takeCard(this.cardM.getCard(), 0);
    }

    ///=============================================================================
    /// @name Initial 拿牌
    ///=============================================================================

    /*! 拿牌更新UI */
    takeCard(card:Card, index: number) {
        this.card = card;
        if (index == 0) {
            this.myTakeCard(card);
        }
    }

    /*! 我拿牌更新UI和触发可进行事件 */
    myTakeCard(card: Card) {
        // 更新UI
        var newNode = new cc.Node('sprite 1');
        newNode.setPosition(150+73*13+10, 100);
        var item = newNode.addComponent(cc.Sprite);
        item.spriteFrame = this.getSpriteFrame(card, 0);
        this.node.addChild(newNode); 
        // 
        
    }

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
            this.addCardNode(playerM.getHandCard(), i);   
        }
    }

    /*! 添加子节点 */
    addCardNode(arr: Array<Card>, index: number) {
        var n = arr.length;
        while (n--) {
            let card = arr[n];
            let newNode = new cc.Node('sprite ' + n + index * 10);
            this.getPosition(newNode, n, index);
            let position = newNode.getPosition();
            let item = newNode.addComponent(cc.Sprite);
            item.spriteFrame = this.getSpriteFrame(card, index);
            var idx = 0;
            if (index == 0) {
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    if (idx==0) {
                        idx = event.getID;
                    }
                }, newNode);
                //我添加点击事件
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    if (idx==event.getID) {
                        let preL = event.getLocation();
                        newNode.setPosition(position.x, preL.y);
                    }
                }, newNode);
                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {
                    if (idx==event.getID) {
                        let loc = event.getLocation();
                        if (loc.y-position.y > 200) {
                            // newNode.setPosition(position);
                            // let action = cc.fadeOut;
                            // newNode.runAction(action);
                        } else {
                            newNode.setPosition(position);
                        }
                        idx = 0;
                    }   
                }, newNode);
                newNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                    if (idx==event.getID) {
                        let loc = event.getLocation();
                        if (loc.y-position.y > 200) {
                            // newNode.setPosition(position);
                            // let action = cc.fadeOut;
                            // newNode.runAction(action);
                        } else {
                            newNode.setPosition(position);
                        }
                        idx = 0;
                    } 
                }, newNode);
            }
            this.node.addChild(newNode); 
        }
    }

    /*! 计算位置 */
    getPosition(node: cc.Node, n: number, index: number) {
        if (index == 0)  return node.setPosition(150+73*n, 100);
        else if (index == 1)  return node.setPosition(1100, 230 + 30*n);
        else if (index == 2)  return node.setPosition(900-38*n, 550);
        return node.setPosition(180, 230 + 30*n);
    }

    /*! 得到图片资源 */
    getSpriteFrame(card: Card, index: number) {
        if (index == 0) {
            var type = (card.type == 0) ? "wan" : (card.type == 1 ? "suo" : "tong");
            var sprite = this.myAtlas.getSpriteFrame("M_" + type + "_" +card.num);
            return sprite;
        } else if (index == 1) {
            var sprite = this.emptyAtlas.getSpriteFrame("e_mj_right");
            return sprite;
        } else if (index == 2) {
            var sprite = this.emptyAtlas.getSpriteFrame("e_mj_up");
            return sprite;
        } else if (index == 3) {
            var sprite = this.emptyAtlas.getSpriteFrame("e_mj_left");
            return sprite;
        }
    }
});