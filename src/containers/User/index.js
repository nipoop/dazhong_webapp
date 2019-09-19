import React, { Component } from 'react';
import UserHeader from './components/UserHeader.js';
import UserMain from './containers/UserMain.js';
import { actions as userActions, getCurrentTab, getOrders } from '../../redux/modules/user.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as loginActions } from '../../redux/modules/login.js';

class User extends Component {

    render() {
        const { orders, currentTab } = this.props;
        return (
            <div>
                <UserHeader onBack={this.handleBack} onLogout={this.handleLogout}/>
                <UserMain data={orders} />
            </div>
        )
    }

    handleSetCurrentTab = (index) => {
        this.props.userActions.setCurrentTab(index)
    }
    componentDidMount() {
        this.props.userActions.loadOrders()
    }
    handleBack = () => {
        this.props.history.push('/')
    }
    handleLogout = () => {
        this.props.loginActions.logout()
    }
}

const mapStateToProps = (state, props) => {
    return {
        orders: getOrders(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
