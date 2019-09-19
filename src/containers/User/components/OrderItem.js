import React, { Component } from 'react';
import './OrderItem.css';

class OrderItem extends Component {

    render() {
        console.log('isCommenting', this.props.isCommenting)
        const {
            data,
            onRemove,
            onComment,
            isCommenting
        } = this.props;
        return (
            <div className="orderItem">
                <div className="orderItem__title">
                    <span>{data.title}</span>
                </div>
                <div className="orderItem__main">
                    <div className="orderItem__imgWrapper">
                        <div className="orderItem__tag">{data.statusText}</div>
                        <img alt={data.title} src={data.orderPicUrl} className="orderItem__img"/>
                    </div>
                    <div className="orderItem__content">
                        <div className="orderItem__line">{data.text[0]}</div>
                        <div className="orderItem__line">{data.text[1]}</div>
                    </div>
                </div>
                <div className="orderItem__bottom">
                    <div className="orderItem__type">{data.channel}</div>
                    <div>
                        {data.type === 1 && !data.commentId ? <div className="orderItem__btn" onClick={onComment}>评价</div> : null}
                        <div className="orderItem__btn" onClick={onRemove}>删除</div>
                    </div>
                </div>
                {isCommenting ? this.renderEditArea() : null}
            </div>
        )
    }

    renderEditArea = () => {
        const {
            comment,
            onCancelComment,
            onSubmitComment
        } = this.props;
        return (
            <div className="orderItem__commentContainer">
                <textarea
                    className="orderItem__comment"
                    value={comment}
                    onChange={this.handleCommentChange}
                />
                {this.renderStar()}
                <button
                    className="orderItem__commentBtn"
                    onClick={onSubmitComment}
                >
                    提交
                </button>
                <button
                    className="orderItem__commentBtn"
                    onClick={onCancelComment}
                >
                    删除
                </button>
            </div>
        )
    }
    renderStar = () => {
        const { stars, onStarsChange } = this.props;
        return (
            <div>
                {[1, 2, 3, 4, 5].map(item => {
                    const lightClass = stars >= item ? "orderItem__star--light" : "";
                    return (
                        <span
                            className={"orderItem__star" + lightClass}
                            key={item}
                            onClick={this.handleStarsChange.bind(this, item)}
                        >
                            ★
                        </span>
                    )
                })}
            </div>
        )
    }
    handleCommentChange = (e) => {
        this.props.onCommentChange(e.target.value)
    }
    handleStarsChange = (stars) => {
        this.props.onStarsChange(stars)
    }
}
export default OrderItem;
