import React, { Component } from 'react';
import ErrorToast from '../../components/ErrorToast';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getError, actions as appActions } from '../../redux/modules/app.js';
import Home from '../Home';
import ProductDetail from '../ProductDetail';
import './index.css';

class App extends Component {
    render() {
        const {
            error,
            appActions: {clearError}
        } = this.props;
        return (
                <div className="APP">
                    <Router>
                        <Switch>
                            <Route path='/detail/:id' component={ProductDetail} />
                            <Route path='/' component={Home} />
                        </Switch>
                    </Router>
                    {error ? <ErrorToast msg={error} clearError={clearError} /> : null}
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
