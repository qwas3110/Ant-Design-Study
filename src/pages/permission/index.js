import React from 'react'
import { Card, Button, Form, Select, Modal, Input, Tree, Transfer } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'
const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;





export default class PermissionUser extends React.Component {

  state = {};

  //在render之前执行
  componentWillMount(){
    axios.requestList(this,'/role/list',{});
  }


  render() {
    const columns = [
      {
        title:'角色ID',
        dataIndex:'id'
      }, {
        title: '角色名称',
        dataIndex: 'role_name'
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateDate
      }, {
        title: '使用状态',
        dataIndex: 'status',
        render(status){
          return status == 1?'启用':'停用'
        }
      }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      }, {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ];
    return (
      <div>
        <Card>
          <Button type={"primary"}>创建角色</Button>
          <Button type={"primary"} style={{marginLeft:10,marginRight:10}} >设置权限</Button>
          <Button type={"primary"}>用户授权</Button>

        </Card>

        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)} //选择后触发方法 绑定this。将当前作用域传递过去
            selectedRowKeys={this.state.selectedRowKeys} //
            dataSource={this.state.list}
            columns={columns}
          />
        </div>



      </div>
    );
  }
}
