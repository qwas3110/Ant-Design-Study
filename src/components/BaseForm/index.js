import React from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd';
import Utils from '../../utils/utils';



const FormItem = Form.Item;
const Option = Select.Option;



class FilterForm extends React.Component {


  //查询提交
  handleFilterSubmit = ()=>{
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  };

  //重置
  reset = ()=>{
    this.props.form.resetFields();
  }

  //用于初始化表单
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;

    // 外部传入需要生成的表单项
    const formList = this.props.formList;

    // 我们最后要返回的，默认为空数组
    const formItemList = [];

    // formList 做一个遍历
    if (formList && formList.length>0){
      formList.forEach((item,i)=>{
        let label = item.label;
        // field form中 每个Item对应的值 如： 用户名 -> userName -> 为field
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;

        // type 为 form表单中插入的组件 如果 SELECT INPUT 等...
        if (item.type == '城市') {

          const city = <FormItem label="城市" key={field}>
            {
              getFieldDecorator('city',{
                initialValue:'0'
              })(
                <Select
                  style={{width:80}}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList([{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }, { id: '3', name: '天津' }, { id: '4', name: '杭州' }])}
                </Select>
              )
            }
          </FormItem>;
          formItemList.push(city)
        }else if (item.type == '时间查询'){
          const begin_time = <FormItem label="订单时间" key={field}>
            {
              getFieldDecorator('begin_time')(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
              )
            }
          </FormItem>;
          formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key={field}>
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </FormItem>;
          formItemList.push(end_time)
        }else if(item.type == 'INPUT'){
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field],{
                initialValue: initialValue
              })(
                <Input type="text" style={{ width: width }} placeholder={placeholder} />
              )
            }
          </FormItem>;
          formItemList.push(INPUT)
        } else if (item.type == 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Select
                  style={{ width: width }}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>;
          formItemList.push(SELECT)
        } else if (item.type == 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field], {
                valuePropName: 'checked',
                initialValue: initialValue //true | false
              })(
                <Checkbox>
                  {label}
                </Checkbox>
              )
            }
          </FormItem>;
          formItemList.push(CHECKBOX)
        } else if (item.type == 'DATE') {
          const Date = <FormItem label={label} key={field}>
            {
              getFieldDecorator([field])(
                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </FormItem>;
          formItemList.push(Date)
        }
      })
    }
    return formItemList;


  };


  render() {


    return (
      <Form layout="inline">
        { this.initFormList() }
        <FormItem>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}




export default Form.create({})(FilterForm);
