/*
 * @Author: wusz 
 * @Date: 2017-11-16 17:02:03 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-11-17 12:02:42
 */

import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import propTypes from 'prop-types';

import style from './index.less';

// import Guide from '../components/guide';        

import * as Const from '../unit/const';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        }
    }
    
    componentWillMount() {
        window.addEventListener('resize', this.resize.bind(this), true)
    }
    
    resize() {
        this.setState({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        })
    }
    
    render() {
        console.log('----', Const);
        let filling = 0;
        const size = (() => {
          const w = this.state.w;
          const h = this.state.h;
          const ratio = h / w;
          let scale;
          let css = {};
          if (ratio < 1.5) {
            scale = h / 960;
          } else {
            scale = w / 640;
            filling = (h - (960 * scale)) / scale / 3;
            css = {
              paddingTop: Math.floor(filling) + 42,
              paddingBottom: Math.floor(filling),
              marginTop: Math.floor(-480 - (filling * 1.5)),
            };
          }
        //   css[transform] = `scale(${scale})`;
          return css;
        })();

        return (
            <div 
                className={style.app}
                style={size}
            >
                
            </div>
        );
    }
}

export default App;