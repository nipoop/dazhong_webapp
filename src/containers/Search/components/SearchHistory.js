import React, { Component } from 'react';
import './SearchHistory.css';

class SearchHistory extends Component {

    render() {
        const { data } = this.props;
        return (
            <div className="searchHistory">
                <div className="searchHistory__header">搜索历史</div>
                <ul className="searchHistory__list">
                    {data.map((item, index) => {
                        return (
                            <li className="searchHistory__item" key={index} onClick={this.onClick.bind(this, item)} >{item.keyword}</li>
                        )
                    })}
                </ul>
                <div className="searchHistory__clear" onClick={this.onClear}>清空搜索记录</div>
            </div>
        )
    }

    onClick = (item) => {
        this.props.onClick(item);
    }
    onClear = () => {
        this.props.onClear();
    }
}
export default SearchHistory;
