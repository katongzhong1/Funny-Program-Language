/*
 * @Author: wusz 
 * @Date: 2017-12-18 18:12:35 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-18 18:22:44
 */

 import { Conversions } from './impl/conversions'

 const INVALID = 'Invalid DateTime',
    INVALID_INPUT = 'invalid input',
    UNSUPPORTED_ZONE = 'unsupported zone',
    UNPARSABLE = 'unparsable';


    
function possiblyCachedWeekData(dt) {
    if (dt.weekData === null) {
        dt.weekData = Conversions.gregorianToWeek(dt.c);
    }
    return dt.weekData;
}