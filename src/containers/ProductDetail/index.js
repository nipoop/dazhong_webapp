import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview.js';
import ShopInfo from './components/ShopInfo.js';
import Detail from './components/Detail.js';
import Remark from './components/Remark.js';
import BuyButton from './components/BuyButton.js';
import Header from '../../components/Header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as detailActions, getProduct, getRelatedShop } from '../../redux/modules/detail.js';



class ProductDetail extends Component {


    render() {
        const { product, relatedShop } = this.props;
        return (
            <div>
                <Header title="团购详情" onBack={this.onBack}/>
                {product && <ProductOverview data={product} />}
                {relatedShop && (
                  <ShopInfo data={relatedShop} total={product.shopIds.length} />
                )}
                {product && (
                  <div>
                    <Detail data={product} />
                    <Remark data={product} />
                    <BuyButton productId={product.id} />
                  </div>
                )}
            </div>
        )
    }

    onBack = () => {
        console.log('this props', this.props)
        this.props.history.goBack()
    }

    componentDidMount() {
        const { product } = this.props;
        console.log('product', product)
        console.log('props', this.props)
        if (!product) {
            const productId = this.props.match.params.id;
            this.props.detailActions.loadProductDetail(productId);
        } else if (!this.props.relatedShop) {
            this.props.detailActions.loadRelatedShop(product.nearestShop);
        }
    }
    componentDidUpdate(preProps) {
      // 第一次获取到产品详情时，需要继续获取关联的店铺信息
      if (!preProps.product && this.props.product) {
        this.props.detailActions.loadRelatedShop(this.props.product.nearestShop);
      }
    }


}

const mapStateToProps = (state, props) => {
    const productId = props.match.params.id;
    return {
        product: getProduct(state, productId),
        relatedShop: getRelatedShop(state, productId)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        detailActions: bindActionCreators(detailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
