import React, { Component } from 'react';
import './Discount.css';
import { Link } from "react-router-dom";

class Discount extends Component {

    render() {
        const data = this.props.data;
        return (
            <div className="discount">
                <div className="discount__header">
                    <a>
                        <span className="discount__title">超值特惠</span>
                        <span className="discount__more">更多优惠</span>
                        <span className="discount__arrow"></span>
                    </a>
                </div>
                <div className="discount__content">
                    {data.map((item, index) => {
                        return (
                            <Link to={`/detail/${item.id}`} key={item.id} className="discount__item">
                                <div className="discount__itemPic">
                                    <img src={item.picture} width="100%" height="100%"/>
                                </div>
                                <div className="discount__itemTitle">{item.product}</div>
                                <div className="discount__itemPriceWrapper">
                                    <ins className="discount__itemCurrentPrice">{item.currentPrice}</ins>
                                    <del className="discount__itemOldPrice">{item.oldPrice}</del>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Discount;
