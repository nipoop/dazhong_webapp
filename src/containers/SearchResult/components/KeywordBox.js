import React, { Component } from "react";
import { Link } from "react-router-dom";
import './KeywordBox.css'

class KeywordBox extends Component {
  render() {
    const { text } = this.props;
    console.log('text', text)
    return (
      <div className="keywordBox">
        <Link to="/search" className="keywordBox__text">
          {text.keyword}
        </Link>
      </div>
    );
  }
}

export default KeywordBox;
