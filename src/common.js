import React from 'react'
import { Row, Col } from 'antd';
import Header from './components/Header'
import "./styles/common.less";

// 这里用于放置 通用页面 放置地方

export default class Common extends React.Component {

  render() {
    return (
      <div>
        <Row className="simple-page">
          {/*类似小导航*/}
          <Header menuType="second" />
        </Row>
        <Row className="content">
          {this.props.children}
        </Row>
      </div>
    );
  }
}
