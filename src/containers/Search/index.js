import React, { Component } from 'react';
import SearchBox from './components/SearchBox.js';
import PopularSearch from './components/PopularSearch.js';
import SearchHistory from './components/SearchHistory.js';
import { actions as searchActions, getInputText, getPopularKeywords, getRelatedKeywords, getHistoryKeywords } from '../../redux/modules/search.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Search extends Component {

    render() {
        const {inputText, popularKeywords, relatedKeywords, historyKeywords, searchActions} = this.props;
        return (
            <div>
                <SearchBox
                    data={inputText} relatedKeywords={relatedKeywords}
                    onClear={this.onClearInput}
                    onChange={this.onChangeInput}
                    onClickItem={this.onClickItem}
                    onCancel={this.onCancel}

                />
                <PopularSearch data={popularKeywords} onClick={this.onClickItem} />
                <SearchHistory data={historyKeywords} onClear={this.onClearHistory} onClick={this.onClickItem}/>
            </div>
        )
    }

    componentDidMount = () => {
        const { loadPopularKeywords } = this.props.searchActions;
        loadPopularKeywords();
    }

    onCancel = () => {
        this.onClearInput();
        this.props.history.goBack();
    }

    onClickItem = (item) => {
        this.props.searchActions.setInputText(item.keyword);
        this.props.searchActions.addHistoryKeyword(item.id);
        this.props.searchActions.loadRelatedShops(item.id);
        this.props.history.push('./search_result');
    }

    onClearInput = () => {
        this.props.searchActions.clearInputText();
    }

    onChangeInput = (text) => {
        this.props.searchActions.setInputText(text);
        this.props.searchActions.loadRelatedKeywords(text);
    }

    onClearHistory = () => {
        this.props.searchActions.clearHistoryKeywords();
    }
    componentWillUnmount() {
      const { clearInputText } = this.props.searchActions;
      clearInputText();
    }

}


const mapStateToProps = (state, props) => {
    return {
        inputText: getInputText(state),
        popularKeywords: getPopularKeywords(state),
        relatedKeywords: getRelatedKeywords(state),
        historyKeywords: getHistoryKeywords(state),
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
