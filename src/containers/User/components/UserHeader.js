import React, { Component } from 'react';
import './UserHeader.css';

class UserHeader extends Component {

    render() {
        return (
            <div className="userHeader">
                <div className="userHeader__back" onClick={this.handleClickBack}>首页</div>
                <div className="userHeader__list">
                    <span className="userHeader__item userHeader__item--selected">订单</span>
                    <span className="userHeader__item">抵用券</span>
                </div>
                <div className="userHeader__right" onClick={this.handleClickLogout}>注销</div>
            </div>
        )
    }

    handleClickBack = () => {
        this.props.onBack()
    }
    handleClickLogout = () => {
        this.props.onLogout()
    }
}

export default UserHeader;
