/*
 * @Author: wusz 
 * @Date: 2017-12-05 11:08:02 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-05 14:33:19
 */

const {ccclass, property} = cc._decorator;

enum CardType {Wan = 1, Suo, Tuo}

@ccclass
export default class Card extends cc.Component {
    /*! 数字大小 */
    @property
    num: number = 1;

    /*! 数字类型 */
    @property
    type: CardType = 1;

    /*! 初始化 */
    constructor(num: number, type: number) {
        super();
        this.num = num;
        this.type = type;
    }
}