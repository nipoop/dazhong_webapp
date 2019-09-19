import React, { Component } from 'react';
import "./Detail.css"

class Detail extends Component {
  render() {
      const {
          detail: { category, products, remark },
          currentPrice,
          oldPrice
      } = this.props.data;
    return (
      <div className="detail">
        <div className="detail__header">
          <span>团购详情</span>
          <i className="detail__headerIcon"></i>
        </div>
        <table cellPadding="0" cellSpacing="0" className="detail__table">
          <tbody>
            <tr className="detail__row">
              <th colSpan="3" className="detail__category">
                {category}
              </th>
            </tr>
            <tr className="detail__row">
              <td>{products[0].name}</td>
              <td className="detail__td--alignRight">
              {products[0].quantity}
              </td>
              <td className="detail__td--alignRight">
              {products[0].price}
              </td>
            </tr>
            <tr className="detail__row">
              <td/>
              <td className="detail__td--price">
                最高价值
                <br/>
                <strong className="detail__td--priceNew">
                  团购价
                </strong>
              </td>
              <td className="detail__td--price">
                {oldPrice}
                <br/>
                <strong className="detail__td--priceNew">
                  {currentPrice}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detail__remark">
          {remark}
        </div>
        <div className="detail__more">
          <span>更多图文详情</span>
          <span className="detail__notice">(建议Wifi环境下打卡，土豪请随意)</span>
          <i className="detail__arrow"/>
        </div>
      </div>
    );
  }
}

export default Detail;
