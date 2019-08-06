import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview.js';
import ShopInfo from './components/ShopInfo.js';
import Detail from './components/Detail.js';
import Remark from './components/Remark.js';
import BuyButton from './components/BuyButton.js';
import Header from '../../components/Header'

class ProductDetail extends Component {

    render() {
        return (
            <div>
                <Header title="团购详情" onBack={this.onBack}/>
                <ProductOverview />
                <ShopInfo />
                <Detail />
                <Remark />
                <BuyButton />
            </div>
        )
    }
    onBack() {
        
    }
}


export default ProductDetail;
