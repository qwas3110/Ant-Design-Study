import React from "react";
import "./ui.less";
import {Card, Button, Spin, Icon, Alert} from "antd";


class Loadings extends React.Component  {

    render() {
        const icon = <Icon  type="loading" style={{fontSize:24}}/>
        const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="Ant Design UI 框架学习"
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="Ant Design UI 框架学习"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="Ant Design UI 框架学习"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="Ant Design UI 框架学习"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}

export default Loadings;


