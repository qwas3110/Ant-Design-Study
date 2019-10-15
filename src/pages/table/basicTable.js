import React from "react";
import {Card, Table,Modal} from "antd";
import axiso from './../../axios/index';




class BasicTable extends React.Component {

  state = {
    dataSource2: []
  };


  componentDidMount() {
    const data = [
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
    data.map((item,index)=>{
      item.key = index;
    });
    this.setState({
      dataSource:data
    });
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

        res.result.list.map((item, index) => {
          item.key = index;
        })

        this.setState({
          dataSource2: res.result.list
        })
      }
    })
  };

  onRowClick = (record,index)=>{
    let selectKey = [index];
    Modal.info({
      title:'信息',
      content:`用户名：${record.userName},用户爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys:selectKey,
      selectedItem: record
    })
  }


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
        dataIndex: 'sex',
        render(sex){
          return sex ==1 ?'男':'女'
        }
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        render(state){
          let config  = {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子',
            '4':'百度FE',
            '5':'创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          }
          return config[abc];
        }
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
    const selectedRowKeys = this.state.selectedRowKeys;
    //该参数指定单选或者多选
    //同时需要绑定 selectedRowKeys
    const rowSelection = {
      type:'radio',
      selectedRowKeys
    };

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
        <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        {/* onRow 接受一个回调函数*/}

        <Card title="Mock-单选" style={{ margin: '10px 0' }}>
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record,index) => {
              return {
                onClick:()=>{
                  this.onRowClick(record,index);
                }
              };
            }}
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
