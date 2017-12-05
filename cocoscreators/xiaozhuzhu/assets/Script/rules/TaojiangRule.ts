/*
 * @Author: wusz 
 * @Date: 2017-12-05 14:56:24 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-05 18:41:08
 */

import Rule from "./rule";
import Card from "../items/Card";
const {ccclass} = cc._decorator;

enum RuleType {Peng=0, Chi, Hu, Gang}

@ccclass
export default class TaojiangRule extends Rule {
    
    ///=============================================================================
    /// @name Export 对外 
    ///=============================================================================

    /*! 是否可胡牌 第一步判断 */
    private isHuAction(arr: Array<number>, kingCount: number) {
        // 如果只有两张牌
        if ((arr.length + kingCount) == 2) {
            if (kingCount > 0) return true;
            return arr[0] + arr[1];
        }
        var length = arr.length;
        var i = 0;
        while (i<length) {
            var value = arr[i];
            // 判断是否能做将牌
            let pattern = value % 10;
            if (pattern==2 || pattern==5 || pattern==8) {
                let count = arr.filter((a) => a==value).length;
                // 避免重复运算
                i += count-1;
                if (count >= 2) {
                    var temp = arr.slice();
                    // 移除重复的两张牌
                    temp.splice(temp.indexOf(value));
                    temp.splice(temp.indexOf(value));
                    if (this.huAction(temp, kingCount)) return true;
                } 
                if (count == 1 && kingCount >= 1) {
                    var temp = arr.slice();
                    // 移除1张牌
                    temp.splice(temp.indexOf(value));    
                    if (this.huAction(temp, kingCount-1)) return true;
                }
                if (kingCount >=2) {
                    var temp = arr.slice();    
                    if (this.huAction(temp, kingCount-2)) return true;
                }
            }
            i++;
            
        }
        // 七对
        if (this.duiCount == 7) return true;
        // 对对胡
        if (this.duiCount)
        return false;
    }

    /*! 是否可胡牌 第二步判断 */
    private huAction(arr: Array<number>, kingCount: number) {
        // 如果余牌为0则可胡牌
        if (arr.length == 0) return true;
        // 判断前3是否相等
        if (arr[0] == arr[1] && arr[0] == arr[1]) {
            return this.huAction(arr.slice(3));
        }
        // 判断是否组成顺子
        var sufIndex = arr.indexOf(arr[0]+1);
        var ssufIndex = arr.indexOf(arr[0]+2);
        if (sufIndex && ssufIndex) {
            arr.splice(sufIndex, 1)
            arr.splice(ssufIndex, 1)
            return this.huAction(arr);
        }
        return false;
    }

    /*! 是否能吃、碰 */
    checkActions(arr: Array<Card>, card: Card) {
        var pengNum = 0, i = arr.length;
        var ffro, fro, aft, aaft = 0;
        while (i--) {
            var temp = arr[i];
            // 用于判断是否可吃, 可碰
            if (temp.num == card.num-2) ffro++;
            else if (temp.num == card.num-1) fro++;
            else if (temp.num == card.num) pengNum++;
            else if (temp.num == card.num+1) aft++;
            else if (temp.num == card.num+2) aaft++;
        }
        var actions = new Array();
        // 判断是否能碰
        if (pengNum >= 2) actions.push(0);
        // 判断是否能吃
        if ( (ffro && fro) || (fro && aft) || (aft && aaft)) actions.push(1);
        return actions;
    }
    
    /*! 是否能吃 */
    checkChiAction(arr: Array<Card>, card: Card) {
        return
    }
}