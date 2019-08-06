import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview.js';
import ShopInfo from './components/ShopInfo.js';

class ProductDetail extends Component {

    render() {
        return (
            <div>
                <ProductOverview />
                <ShopInfo />
            </div>
        )
    }
}

export default ProductDetail;
