import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Category from './components/Category.js';
import Headline from './components/Headline.js';
import Discount from './components/Discount.js';
import LikeList from './components/LikeList.js';
import HomeHeader from './components/HomeHeader.js';
import Banner from './components/Banner.js';
import Activity from './components/Activity.js';
import Footer from '../../components/Footer'
import {actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes } from '../../redux/modules/home.js';

class Home extends Component {
    render() {
        const { likes, discounts, pageCount } = this.props;
        return (
            <div>
                <HomeHeader />
                <Banner />
                <Category />
                <Headline />
                <Activity />
                <Discount data={discounts} />
                <LikeList data={likes} pageCount={pageCount} fetchLikes={this.fetchLikes}/>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        this.props.homeActions.loadDiscounts();
    }


    fetchLikes = () => {
        this.props.homeActions.loadLikes();
    }
}




//定义mapStateToProps(通过selector)和mapDispatchToProps
const mapStateToProps = (state, props) => {
    return {
        likes: getLikes(state),
        discounts: getDiscounts(state),
        pageCount: getPageCountOfLikes(state)
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
