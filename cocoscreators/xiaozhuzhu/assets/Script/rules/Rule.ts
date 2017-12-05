/*
 * @Author: wusz 
 * @Date: 2017-12-05 14:57:15 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-05 18:07:12
 */

const {ccclass, property} = cc._decorator;
import Card from "../items/card";



@ccclass
export default class Rule extends cc.Component {

        /*! 对子数 */
        @property
        duiCount: number;
        
        /*! 顺子数 */
        @property
        shunCount: number;      
    
        /*! 刻子数 */
        @property
        keCount: number; 
}