import React from "react";
import {Card, Table} from "antd";
import axiso from './../../axios/index';




class BasicTable extends React.Component {

  state = {
    dataSource2: []
  };


  componentDidMount() {
    const dataSource = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Lily',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '3',
        userName: 'Alex',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '4',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '5',
        userName: 'Nash',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '6',
        userName: 'Kobe',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '7',
        userName: 'Russell',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      },
      {
        id: '8',
        userName: 'Ming',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市湖里区软件园二期',
        time: '09:00'
      }
    ];
    this.setState({
      dataSource
    })
    this.request();

  }

  //动态获取mock数据
  request = () => {
    axiso.ajax({
      url: '/table/list',
      data: {
        params: {
          page:1
        }
      }
    }).then(res => {
      if (res.code == '0') {
        this.setState({
          dataSource2: res.result.list
        })
      }
    })
  };


  render() {
    const columns = [
      {
        title:'id',
        key:'id',
        dataIndex:'id'
      },
      {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex'
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest'
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        dataIndex: 'time'
      }
    ];

    console.log(this.state.dataSource2);
    return (
      <div>

        <Card title="基础表格">

          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />

        </Card>

        <Card title="动态渲染表格" style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

      </div>
    );
  }
}


export default BasicTable;
