import React, { Component } from 'react';
import './PurchaseForm.css';

class PurchaseForm extends Component {

    render() {
        const { showTip, quantity, onCounterDec, onCounterInc, onSetQuantity, onSubmit } = this.props;
        return (
            <div className="purchaseForm">
                <div className="purchaseForm__wrapper">
                    <div className="purchaseForm__row">
                        <div className="purchaseForm__rowLabel">数量</div>
                        <div className="purchaseForm__rowValue">
                            <span className="purchaseForm__counter--dec" onClick={onCounterDec}>-</span>
                            <input className="purchaseForm__quantity" value={quantity} type='number' onChange={onSetQuantity}/>
                            <span className="purchaseForm__counter--inc" onClick={onCounterInc}>+</span>
                        </div>
                    </div>
                    <div className="purchaseForm__row">
                        <div className="purchaseForm__rowLabel">小计</div>
                        <div className="purchaseForm__rowValue">{}</div>
                    </div>
                    <div className="purchaseForm__row">
                        <div className="purchaseForm__rowLabel">手机号码</div>
                        <div className="purchaseForm__rowValue">{}</div>
                    </div>
                </div>
                <div className="purchaseForm__remark">
                    <div className="purchaseForm__remarkItem">
                        <i className="purchaseForm__sign" />
                        <span className="purchaseForm__desc">支持随时退</span>
                    </div>
                    <div className="purchaseForm__remarkItem">
                        <i className="purchaseForm__sign" />
                        <span className="purchaseForm__desc">支持过期退</span>
                    </div>
                </div>
                <a className="purchaseForm__submit" onClick={onSubmit}>提交订单</a>
            </div>
        )
    }
}

export default PurchaseForm;
