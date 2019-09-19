import React, { Component } from 'react';
import './PopularSearch.css'


class PopularSearch extends Component {

    render() {
        const popularKeywords = this.props.data;
        return (
            <div className="popularSearch">
                {popularKeywords.map((item) => {
                    return (
                        <span className="popularSearch__item" key={item.id} onClick={this.onClick.bind(this,item)} >
                            {item.keyword}
                        </span>
                    )
                })}
            </div>
        )

    }
    onClick(item) {
        this.props.onClick(item);
    }

}

export default PopularSearch;
