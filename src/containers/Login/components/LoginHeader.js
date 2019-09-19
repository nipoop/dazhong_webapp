import React, { Component } from 'react';
import './LoginHeader.css';

class LoginHeader extends Component {

    render() {
        return (
            <div className="loginHeader">
                <a className="loginHeader__back"></a>
                <div className="loginHeader__title">账号密码登录</div>
            </div>
        )
    }
}

export default LoginHeader;
