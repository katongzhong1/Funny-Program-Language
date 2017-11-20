/*
 * @Author: wusz 
 * @Date: 2017-11-16 16:52:38 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-11-16 16:56:56
 */

 import {createStore} from 'redux';
 import rootReducer from '../reducers';

 const store = createStore(
        rootReducer,
        window.devToolsExtension && window.devToolsExtension()
    );

export default store;