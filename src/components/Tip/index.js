import React, { Component } from 'react';
import './index.css';

class Tip extends Component {
    render() {
        const { message, onClick } = this.props;
        return (
            <div className="tip">
                <div className="tip__alert">
                    <div className="tip__content">{message}</div>
                    <div className="tip__btns">
                        <a className="tip__btn" onClick={onClick}>确定</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tip;
