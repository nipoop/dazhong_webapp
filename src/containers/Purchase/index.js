import React, { Component } from 'react';
import './index.css';
import Header from '../../components/Header';
import Tip from '../../components/Tip';
import PurchaseForm from './components/PurchaseForm.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as purchaseActions, getProduct, getShowTip, getQuantity } from '../../redux/modules/purchase.js';
import { actions as detailActions } from '../../redux/modules/detail.js';

class Purchase extends Component {

    render() {
        return (
            <div className="purchase">
                <Header title="下单" onBack={this.handleBack}/>
                <PurchaseForm
                    quantity={this.props.quantity}
                    onCounterDec={this.handleCounterDec}
                    onCounterInc={this.handleCounterInc}
                    showTip={this.props.showTip}
                    onSetQuantity={this.handleSetQuantity}
                    onSubmit={this.handleSubmit}
                />
                {this.props.showTip ? <Tip message="购买成功" onClick={this.handleTipClick}/> : null}
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }
    handleTipClick = () => {
        this.props.purchaseActions.hideTip()
        this.props.history.goBack()
    }
    handleCounterDec = () => {
        const { quantity } = this.props;
        this.props.purchaseActions.setOrderQuantity(quantity - 1)
    }
    handleCounterInc = () => {
        const { quantity } = this.props;
        this.props.purchaseActions.setOrderQuantity(quantity + 1)
    }
    handleSetQuantity = () => {
        const { quantity } = this.props;
        this.props.purchaseActions.setOrderQuantity(quantity)
    }
    handleSubmit = () => {
        const productId = this.props.match.params.id;
        console.log('productId', productId)
        this.props.purchaseActions.submitOrder(productId)
    }
    componentDidMount = () => {
        if (!this.props.product) {
            const productId = this.props.match.params.id;
            this.props.detailActions.loadProductDetail(productId)
        }
    }
    componentWillUnmount = () => {
        this.props.purchaseActions.setOrderQuantity(1)
    }

}

const mapStateToProps = (state, props) => {
    const productId = props.match.params.id;
    console.log('showTip', getShowTip(state))
    return {
        quantity: getQuantity(state),
        showTip: getShowTip(state),
        product: getProduct(state, productId)
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        purchaseActions: bindActionCreators(purchaseActions, dispatch),
        detailActions: bindActionCreators(detailActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
