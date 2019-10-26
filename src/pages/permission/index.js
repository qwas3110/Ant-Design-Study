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

  // 打开创建角色弹框
  handleRole=()=>{
    this.setState({
      isRoleVisible:true
    })
  };
  // 角色提交
  handleRoleSubmit=()=>{
    let data = this.roleForm.props.form.getFieldsValue(); // 获取表单值
    axios.ajax({
      url:'role/create',
      data:{
        params:data
      }
    }).then((res)=>{
      if(res.code ==0){
        this.setState({
          isRoleVisible:false // 关闭弹框
        })
        this.roleForm.props.form.resetFields(); // 重置表单
        axios.requestList(this, '/role/list', {}); // 重新接口 渲染最新值
      }
    })
  };


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
          <Button type={"primary"} onClick={this.handleRole}>创建角色</Button>
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

        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields(); // 重置form表单
            this.setState({
              isRoleVisible:false
            })
          }}
        >
          <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}></RoleForm>
        </Modal>



      </div>
    );
  }
}


class RoleForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('role_name')(
              <Input type="text" placeholder="请输入角色名称" />
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('state')(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}
RoleForm = Form.create({})(RoleForm);
