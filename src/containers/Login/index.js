import React, { Component } from 'react';
import LoginHeader from './components/LoginHeader.js';
import LoginForm from './components/LoginForm.js';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as loginActions, getUsername, getPassword, isLogin } from '../../redux/modules/login.js';

class Login extends Component {

    render() {
        const { username, password, login } = this.props;
        if (login) {
            return <Redirect to='/user' />
        }
        return (
            <div className="login">
                <LoginHeader />
                <LoginForm
                    username={username}
                    password={password}
                    onChange={this.handleChange}
                    onSubmit={this.handleSumbit}
                />
            </div>
        )
    }

    handleChange = (e) => {
        if (e.target.name === 'username') {
            this.props.loginActions.setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            this.props.loginActions.setPassword(e.target.value);
        }
    }

    handleSumbit = () => {
        this.props.loginActions.login();
    }
}

const mapStateToProps = (state, props) => {
    return {
        username: getUsername(state),
        password: getPassword(state),
        login: isLogin(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
