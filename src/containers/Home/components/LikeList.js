import React, { Component } from 'react';
import LikeItem from './LikeItem.js';
import Loading from '../../../components/Loading';
import throttle from '../../../utils/throttle.js';
import './LikeList.css';


class Likelist extends Component {
    constructor(props) {
        super(props);

        // this.throttleFetchLikes = throttle(this.props.fetchLikes);
        this.myRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        const { data, pageCount } = this.props;
        return (
            <div className="likeList" ref={this.myRef}>
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {data.map((item, index) => {
                        return <LikeItem key={index} data={item} />
                    })}
                </div>
                <div className="">
                    {pageCount < 3 ? <Loading /> : (<div className="likeList__viewAll">查看更多</div>)}
                </div>
            </div>
        );
    }

    componentDidMount() {
        // console.log('componentDidMount');
        if (this.props.pageCount !== 0) {
            return
        }
        document.addEventListener('touchmove', this.handleScroll);
        this.props.fetchLikes();
    }

    componentDidUpdate() {
        if (this.props.pageCount >= 3) {
            document.removeEventListener('touchmove', this.handleScroll);
        };
    }
    componentWillUnmount() {
        // console.log('componentWillUnmount');
        if (this.props.loadTimes < 3) {
            console.log('get in unmount')
            document.removeEventListener('touchmove', this.handleScroll);
        };
    }

    throttleFetchLikes = throttle(this.props.fetchLikes);

    handleScroll() {
        console.log('get in handleScroll');
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const likeListTop = this.myRef.current.offsetTop;
        console.log(this.myRef)
        console.log(this.myRef.current)
        const likeListHeight = this.myRef.current.offsetHeight;
        if (scrollTop >= likeListTop + likeListHeight - clientHeight - 10 && this.props.pageCount < 3) {
            this.throttleFetchLikes()
        }
    }

}

export default Likelist;
