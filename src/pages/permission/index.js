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


  // 权限设置
  handlePermission = ()=>{
    let item = this.state.selectedItem; // 通过它能获取我们当前选中数据的对象
    if (!item){  //通过该对象来判断当前有没有选择这条数据
      Modal.info({
        text:'请选择一个角色'
      })
      return;
    }
    this.setState({
      isPermVisible:true,
      detailInfo:item, // 当前角色信息
      menuInfo: item.menus
    })
  }

  handlePermEditSubmit = ()=>{
    let data = this.permForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios.ajax({
      url:'/permission/edit',
      data:{
        params:{
          ...data
        }
      }
    }).then((res)=>{
      if(res){
        this.setState({
          isPermVisible:false
        })
        axios.requestList(this, '/role/list', {});
      }
    })
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
          <Button type={"primary"} onClick={this.handleRole}>创建角色</Button>
          <Button type={"primary"} style={{marginLeft:10,marginRight:10}} onClick={this.handlePermission}>设置权限</Button>
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

        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={()=>{
            this.setState({
              isPermVisible:false  //关闭弹框
            })
          }}
        >
          <PermEditForm
            wrappedComponentRef={(inst) => this.permForm = inst}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo: checkedKeys
              })
            }}
          />
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


class PermEditForm extends React.Component{

  onCheck = (checkedKeys)=>{
    this.props.patchMenuInfo(checkedKeys)
  }

  renderTreeNodes = (data)=>{  // 建立一个递归 ， data为 menuConfig
    return data.map((item)=>{ // 记得要整个return 这样在引用该方法丢入JSX中才能正常解析
      if(item.children){ // 如果还有子节点，要继续递归
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)} // 递归的方式在渲染出来
        </TreeNode>
      }else{
        return <TreeNode {...item}/> // 如果没有直接渲染出来
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name}/>
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status',{
              initialValue:'1'
            })(
              <Select>
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys)=>{ // 把你当前选中的节点都传递出来
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          {/*TreeNode 为根节点*/}
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}
PermEditForm = Form.create({})(PermEditForm);
