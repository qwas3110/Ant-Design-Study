import React, {Fragment}  from "react";
import { Row, Col } from 'antd';
import "./styles/common.less";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";

class Admin extends React.Component {

    render() {
        return (
            <Fragment>
                <Row className="container">
                    <Col span={3} className="nav-left">
                        <NavLeft/>
                    </Col>
                    <Col span={21} className="main">
                        <Header/>
                        <Row className="content">
                            {this.props.children}
                        </Row>
                        <Footer/>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Admin;