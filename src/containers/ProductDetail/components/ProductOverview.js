import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductOverview.css';

class ProductOverview extends Component {

    render() {
        const { picture, shop, description, currentPrice, oldPrice, id } = this.props.data;
        return (
            <div className="productOverview">
                <div className="productOverview__header">
                    <div className="productOverview__imgContainer">
                        <img className="productOverview__img" src={picture} alt={shop} />
                    </div>
                    <div className="productOverview__baseInfo">
                        <div className="productOverview__title">{shop}</div>
                        <div className="productOverview__content">{description}</div>
                    </div>
                </div>
                <div className="productOverview__purchase">
                    <span className="productOverview__symbol">￥</span>
                    <span className="productOverview__price">{currentPrice}</span>
                    <span className="productOverview__price--old">{`￥${oldPrice}`}</span>
                    <Link to={`/purchase/${id}`} className="productOverview__btn" >购买</Link>
                </div>
                <ul className="productOverview__remark">
                    <li className="productOverview__remarkItem">
                        <i className="productOverview__sign2"></i>
                        <span className="productOverview__desc">过期可退</span>
                    </li>
                    <li className="productOverview__remarkItem">
                        <i className="productOverview__sign2"></i>
                        <span className="productOverview__desc">过期自动作废</span>
                    </li>
                </ul>
            </div>
        )
    }


}

export default ProductOverview;
