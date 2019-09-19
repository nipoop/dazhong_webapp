import React, { Component } from 'react';
import OrderItem from '../components/OrderItem.js';
import Confirm from '../../../components/Confirm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    actions as userActions,
    getIsDeleting,
    getCurrentTab,
    getCommentingOrderId,
    getStars,
    getComment
} from '../../../redux/modules/user.js';
import './UserMain.css';

const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"];

class UserMain extends Component {
    render() {
        const { data, currentTab, isDeleting } = this.props;
        return (
            <div>
                <div className="userMain__menu">
                    {tabTitles.map((item, index) => {
                        return (
                            <div className="userMain__tab" key={index} onClick={this.handleClickTab.bind(this, index)}>
                                <span className={
                                    currentTab === index ? "userMain__title userMain__title--active" : "userMain__title"
                                }>
                                    {item}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="userMain__content">
                    {data && data.length > 0 ? this.renderOrderList(data) : this.renderEmpty()}
                </div>
                {isDeleting ? this.renderConfirmDialog() : null}
            </div>
        );
    }

    renderConfirmDialog = () => {
        const {
            hideDeleteDialog,
            removeOrders,
        } = this.props.userActions;
        return (
            <Confirm
                content={`确定删除订单吗`}
                cancelText={`取消`}
                confirmText={`确定`}
                onCancel={hideDeleteDialog}
                onConfirm={removeOrders}
            />
        )
    }

    handleClickTab = (index) => {
        this.props.userActions.setCurrentTab(index)
    }

    renderOrderList = data => {
        const { commentingOrderId, comment, stars } = this.props;
        const {
            userActions: {
                showDeleteDialog,
                showCommentArea,
                hideCommentArea,
                setComment,
                setStars,
                submitComment,
            }
        } = this.props;
        return data.map((item, index) => {
            return (
                <OrderItem
                    key={item.id}
                    data={item}
                    isCommenting={item.id === commentingOrderId}
                    comment={comment}
                    stars={stars}
                    onRemove={showDeleteDialog.bind(this, item.id)}
                    onComment={showCommentArea.bind(this, item.id)}
                    onCommentChange={setComment}
                    onStarsChange={setStars}
                    onSubmitComment={submitComment}
                    onCancelComment={hideCommentArea}
                />
            )
        })
    }
    renderEmpty = () => {
        return (
            <div className="userMain__empty">
              <div className="userMain__emptyIcon"/>
              <div className="userMain__emptyText1">您还没有相关订单</div>
              <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentTab: getCurrentTab(state),
        isDeleting: getIsDeleting(state),
        commentingOrderId: getCommentingOrderId(state),
        comment: getComment(state),
        stars: getStars(state)
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserMain);
