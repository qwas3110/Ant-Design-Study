import React from "react";
import {Card, Button, Radio,DatePicker} from "antd";
import moment from 'moment';
import "./ui.less";


const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];



export default class Buttons extends React.Component {

    state = {
        loading:true,
        size: 'default'
    };

    handleCloseLoading=()=>{
        this.setState({
            loading:false
        });
    }

    handleChange = (e)=>{
        this.setState({
            size:e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title={"基础按钮"} className="card-wrap">
                    <Button type="primary">Ant Design</Button>
                    <Button>Ant Design</Button>
                    <Button type="dashed">Ant Design</Button>
                    <Button type="danger">Ant Design</Button>
                    <Button disabled>Ant Design</Button>
                </Card>

                <Card title={"图形按钮"} className="card-wrap">
                    <Button icon={"plus"}>创建</Button>
                    <Button icon={"edit"}>编辑</Button>
                    <Button icon={"delete"}>删除</Button>
                    <Button shape="circle" icon="search"/>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button icon={"download"} type={"primary"}>下载</Button>
                </Card>

                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}/>
                    <Button loading={this.state.loading} >点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}/>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>

                <Card title="按钮组" style={{marginBottom:10}}>
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>

                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Ant Design</Button>
                    <Button size={this.state.size}>Ant Design</Button>
                    <Button type="dashed" size={this.state.size}>Ant Design</Button>
                    <Button type="danger" size={this.state.size}>Ant Design</Button>
                </Card>


                <Card>
                  <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />

                </Card>
            </div>
        );
    }
}
