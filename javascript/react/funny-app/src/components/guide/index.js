/*
 * @Author: wusz 
 * @Date: 2017-11-16 18:19:17 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-11-17 11:41:07
 */

/*
 * @问题:
 * 
 *
 */

import React from 'react';
import { isMobile } from '../../unit';
import Const from '../../unit/const';
import { i18n, lan, transform } from '../../unit/const';
import style from './index.less';

class Guide extends React.Component {
    constructor() {
        super();
        console.log('-----Const', Const);
        this.state = {
            isMobile: isMobile(),
        };
    }

    shouldComponentUpdate() {
        return false;
    };

    render() {
        if (this.state.isMobile) {
            return (
                null
            );
        }
        console.log(Const);
        return (
            <div style={{ display: this.state.isMobile ? 'none' : 'block' }}>
                <div className={`${style.guide} ${style.right}`}>
                    <div className={style.up}>
                        <em style={{ [transform]: 'translate(0,-3px) scale(1,2)' }} />
                    </div>
                    <div className={style.left}>
                        <em style={{ [transform]: 'translate(-7px,3px) rotate(-90deg) scale(1,2)' }} />
                    </div>
                    <div className={style.down}>
                        <em style={{ [transform]: 'translate(0,9px) rotate(180deg) scale(1,2)' }} /></div>
                    <div className={style.right}>
                        <em style={{ [transform]: 'translate(7px,3px)rotate(90deg) scale(1,2)' }} />
                    </div>
                </div>
                <div className={`${style.guide} ${style.left}`}>
                    <p>
                        <a href="https://github.com/chvin/react-tetris" rel="noopener noreferrer" target="_blank" title={i18n.linkTitle[lan]}>{`${i18n.github[lan]}:`}</a><br />
                        <iframe
                            src="https://ghbtns.com/github-btn.html?user=chvin&repo=react-tetris&type=star&count=true"
                            frameBorder="0"
                            scrolling="0"
                            width="170px"
                            height="20px"
                            style={{ [transform]: 'scale(1.68)', [`${transform}Origin`]: 'center left' }}
                        />
                        <br />
                        <iframe
                            src="https://ghbtns.com/github-btn.html?user=chvin&repo=react-tetris&type=fork&count=true"
                            frameBorder="0"
                            scrolling="0"
                            width="170px"
                            height="20px"
                            style={{ [transform]: 'scale(1.68)', [`${transform}Origin`]: 'center left' }}
                        />
                    </p>
                    <div className={style.space}>SPACE</div>
                </div>
                <div className={`${style.guide} ${style.qr}`}>
                    <img
                        src={`//game.weixin.qq.com/cgi-bin/comm/qrcode?s=10&m=1&d=${window.location.href}`}
                        alt={i18n.QRCode[lan]}
                        title={i18n.QRNotice[lan]}
                    />
                </div>
            </div>
        );
    }
}

export default Guide;