import React, { Component } from 'react';
import './LikeItem.css';
import { Link } from "react-router-dom";


class LikeItem extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            id,
            shop,
            tag,
            picture,
            product,
            currentPrice,
            oldPrice,
            saleDesc
        } = this.props.data;
        return (
            <Link to={`/detail/${id}`} className="likeItem">
                <div className="likeItem__picContainer">
                    <div className="likeItem__picTag">{tag}</div>
                    <img className="likeItem__pic" src={picture}/>
                </div>
                <div className="likeItem__content">
                    <div className="likeItem__shop">{shop}</div>
                    <div className="likeItem__product">{product}</div>
                    <div className="likeItem__detail">
                        <div className="likeItem__price">
                            <div className="likeItem__currentPrice">{currentPrice}</div>
                            <div className="likeItem__oldPrice">{oldPrice}</div>
                        </div>
                        <div className="likeItem__sale">{saleDesc}</div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default LikeItem;
