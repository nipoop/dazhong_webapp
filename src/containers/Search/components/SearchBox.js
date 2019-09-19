import React, { Component } from 'react';
import './SearchBox.css'


class SearchBox extends Component {

    render() {
        return (
            <div className="searchBox">
                <div className="searchBox__container">
                    <input className="searchBox__text" onChange={this.onChange} value={this.props.data}></input>
                    <span className="searchBox__clear" onClick={this.onClear}></span>
                    <span className="searchBox__cancel" onClick={this.onCancel}>取消</span>
                </div>
                {this.props.data.length > 0 ? this.renderSuggestList() : null}
            </div>
        )
    }

    renderSuggestList() {
        const { relatedKeywords } = this.props;
        return (
            <ul className="searchBox__list" >
                {relatedKeywords.map(item => {
                    return (
                        <li className="searchBox__item" key={item.id} onClick={this.onClick.bind(this, item)}>
                            <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                            <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
                        </li>
                    )
                })}
            </ul>
        )
    }

    onChange = (e) => {
        this.props.onChange(e.target.value);
    }
    onClear = () => {
        this.props.onClear();
    }
    onClick = (item) => {
        this.props.onClickItem(item);
    }

    onCancel = () => {
        this.props.onCancel();
    }
}
export default SearchBox;
